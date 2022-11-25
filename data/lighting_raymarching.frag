#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#define RESOLUTION          u_resolution
#define RAYMARCH_SAMPLES    100
#define RAYMARCH_MULTISAMPLE 4
#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

// #include "lygia/lighting/atmosphere.glsl"
// #define RAYMARCH_BACKGROUND atmosphere(normal, normalize(u_light))
// #define RAYMARCH_AMBIENT atmosphere(normal, normalize(u_light))
#include "lygia/sdf.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/color/space/linear2gamma.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

vec4 raymarchMap( in vec3 pos ) {
    vec4 res = vec4(1.0);

    float check = checkBoard(pos.xz, vec2(1.0));
    res = opUnion( res, vec4( vec3( 0.5 + check * 0.5), planeSDF(pos) ) );

    res = opUnion( res, vec4( 1.0, 1.0, 1.0, sphereSDF(    pos-vec3( 0.0, 0.60, 0.0), 0.5 ) ) );
    res = opUnion( res, vec4( 0.0, 1.0, 1.0, boxSDF(       pos-vec3( 2.0, 0.5, 0.0), vec3(0.4) ) ) );
    res = opUnion( res, vec4( 0.3, 0.3, 1.0, torusSDF(     pos-vec3( 0.0, 0.5, 2.0), vec2(0.4,0.1) ) ) );
    res = opUnion( res, vec4( 0.3, 0.1, 0.3, capsuleSDF(   pos,vec3(-2.3, 0.4,-0.2), vec3(-1.6,0.75,0.2), 0.2 ) ) );
    res = opUnion( res, vec4( 0.5, 0.3, 0.4, triPrismSDF(  pos-vec3(-2.0, 0.50,-2.0), vec2(0.5,0.1) ) ) );
    res = opUnion( res, vec4( 0.2, 0.2, 0.8, cylinderSDF(  pos-vec3( 2.0, 0.50,-2.0), vec2(0.2,0.4) ) ) );
    res = opUnion( res, vec4( 0.7, 0.5, 0.2, coneSDF(      pos-vec3( 0.0, 0.75,-2.0), vec3(0.8,0.6,0.6) ) ) );
    res = opUnion( res, vec4( 0.4, 0.2, 0.9, hexPrismSDF(  pos-vec3(-2.0, 0.60, 2.0), vec2(0.5,0.1) ) ) );
    res = opUnion( res, vec4( 0.1, 0.3, 0.6, pyramidSDF(   pos-vec3( 2.0, 0.10, 2.0), 1.0 ) ) );
        
    return res;
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