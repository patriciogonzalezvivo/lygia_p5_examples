#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform vec2 texOffset;

varying vec4 vertColor;
varying vec4 vertTexCoord;

#define EDGE_SAMPLER_FNC(POS_UV) texture2D(tex, clamp(POS_UV, vec2(0.02), vec2(0.98))).r
#include "lygia/filter/edge.glsl"
#include "lygia/draw/digits.glsl"
#include "lygia/math/saturate.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 st = vertTexCoord.st;
    vec2 pixel = texOffset;

    float ix = floor(st.x * 5.0);
    float radius = max(0.1, ix * 0.5);

    if (st.y < 0.5)
        color.rgb += edgePrewitt(texture, st, pixel * radius);
    else
        color.rgb += edgeSobel(texture, st, pixel * radius);

    color.rgb -= step(st.y, 0.05) * 0.5;
    color.rgb = saturate(color.rgb);
    color.rgb += digits(st - vec2(ix/5.0 + 0.01, 0.01), radius);
    color.rgb -= step(.98, fract(st.x * 5.0));

    gl_FragColor = color;
}
