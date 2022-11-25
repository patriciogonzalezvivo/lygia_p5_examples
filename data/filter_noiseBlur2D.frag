#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D   texture;
uniform vec2        texOffset;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec4        vertColor;
varying vec4        vertTexCoord;

#include "lygia/sample/clamp2edge.glsl"
#define NOISEBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/noiseBlur.glsl"

#include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = texOffset;
    vec2 st = vertTexCoord.st;

    float ix = floor(st.x * 5.0);
    float radius = max(1.0, ix * 4.0);

    color += noiseBlur(texture, st, pixel, radius).rgb;

    color += digits(st - vec2(ix/5.0 + 0.01, 0.01), radius, 0.0);
    color -= step(.99, fract(st.x * 5.0));

    gl_FragColor = vec4(color,1.0);
}
