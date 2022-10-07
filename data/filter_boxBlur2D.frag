
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

#define BOXBLUR_2D
#define BOXBLUR_SAMPLER_FNC(POS_UV) texture2D(tex, clamp(POS_UV, vec2(0.01), vec2(0.99)))
#include "lygia/filter/boxBlur.glsl"

#include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = texOffset;
    vec2 st = vertTexCoord.st;

    float ix = floor(st.x * 5.0);
    float kernel_size = max(1.0, ix * 4.0);

    color += boxBlur(texture, st, pixel, int(kernel_size)).rgb;

    color += digits(st - vec2(ix/5.0 + 0.01, 0.01), kernel_size, 0.0);
    color -= step(.99, fract(st.x * 5.0));

    gl_FragColor = vec4(color,1.0);
}
