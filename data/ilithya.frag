////////////////////////////////////////
// Moire Groove 🫠
// @ilithya_rocks
// https://www.ilithya.rocks/
////////////////////////////////////////

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#include "lygia/space/ratio.glsl"
#include "lygia/generative/snoise.glsl"
#include "lygia/sdf/circleSDF.glsl"

void main(void) {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = ratio(uv, u_resolution);

    float t = u_time;

    vec3 color = vec3(0.0);

    uv.x = snoise(uv + t * 0.1);

    float freq = 25.0;

    float trippyCircles = circleSDF(
        fract(uv * freq),
        vec2(0.5) 
    ) * 0.5;
    trippyCircles = step(trippyCircles, 0.3);
    // Uncomment following line and comment line above for another look ✨
    // trippyCircles = step(0.275, trippyCircles);

    color += trippyCircles;

    // GRADIENT
    vec3 c1 = vec3(1.0, 0.0, 0.7);
    vec3 c2 = vec3(1.0, 0.5, 0.0);
    vec3 gradMix = mix(c1, c2, uv.y);
    color *= gradMix;

    gl_FragColor = vec4(color, 1.0);
}