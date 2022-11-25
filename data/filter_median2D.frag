#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D   texture;
uniform vec2        texOffset;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec4        vertColor;
varying vec4        vertTexCoord;

#include "lygia/sample/clamp2edge.glsl"
#define MEDIAN_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/median.glsl"

#include "lygia/draw/digits.glsl"
#include "lygia/draw/stroke.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = texOffset;
    vec2 st = vertTexCoord.st;

    float radius = fract(st.x * 2.0) * 4.0;

    color = mix( median3(texture, st, pixel * max(1., floor(radius))).rgb,
                 median5(texture, st, pixel * max(1., floor(radius))).rgb, 
                 step(.5, st.x));

    color += digits(st - vec2(0.01 + 0.5 * step(.5, st.x), 0.01), mix(3., 5., step(.5, st.x)), 0.0);
    color -= stroke(st.x, .5, pixel.x * 2.0);

     color -= step(1.0 - pixel.x * 5., fract(radius)) * 0.1;

    gl_FragColor = vec4(color,1.0);
}
