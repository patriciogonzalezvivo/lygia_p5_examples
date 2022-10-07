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

#include "lygia/filter/sharpen.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = texOffset;
    vec2 st = vertTexCoord.st;

    float radius = fract(st.x * 3.0) * 5.0;

    if (st.x < .33)
        color = sharpenAdaptive(texture, st, pixel * max(1.0, radius)).rgb;

    else if (st.x < .66)
        color = sharpenContrastAdaptive(texture, st, pixel * max(1.0, radius)).rgb;

    else 
        color = sharpenFast(texture, st, pixel).rgb;

        
    color -= step(.95, fract(radius) ) * 0.1;
    color -= step(.98, fract(st.x * 3.0));

    gl_FragColor = vec4(color,1.0);
}
