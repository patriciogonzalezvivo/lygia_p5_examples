
#ifdef GL_ES
precision mediump float;
#endif

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#define RESOLUTION                  u_resolution
#define RAYMARCH_SAMPLES            60
#define RAYMARCH_RENDER_FNC(RO, RD) raymarchVolume(RO, RD)
vec4 raymarchVolume( in vec3 ro, in vec3 rd );

#include "lygia/math/saturate.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/generative/fbm.glsl"
#include "lygia/sdf/boxFrameSDF.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/lighting/raymarch/volume.glsl"
#include "lygia/color/space/linear2gamma.glsl"

vec4 raymarchMap(in vec3 pos) {
    vec4 res = vec4(1.);
    vec3 p = pos.xzy;
    
    res.a = boxFrameSDF(pos, vec3(1.0), 0.1);
    res.a *= (fbm(pos * 2.0) * 0.5 + 0.5);
    res.a *= 2.0;

    return saturate(res);  
}

void main() {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_resolution);

    vec2 mo = u_mouse * pixel;
    float time = 32.0 + u_time * 1.5;
    vec3 cam = vec3( 4.5*cos(0.1*time + 7.0*mo.x), 2.2, 4.5*sin(0.1*time + 7.0*mo.x) ) * 10.;
    
    color = raymarch(cam, uv).rgb;
    color = linear2gamma(color);

    gl_FragColor = vec4( color, 1.0 );
}