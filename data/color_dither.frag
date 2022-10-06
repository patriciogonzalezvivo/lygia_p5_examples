#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform vec2    texOffset;

uniform sampler2D u_noiseTex;
uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

// Uncomment the type of noise you want (only one at a time)
// #define DITHER_FNC ditherShift
// #define DITHER_FNC ditherVlachos
#define DITHER_FNC ditherBlueNoise
// #define DITHER_FNC ditherInterleavedGradientNoise
// #define DITHER_FNC ditherTriangleNoise
// #define DITHER_ANIMATED
// #define DITHER_CHROMA
#define TIME_SECS u_time
#define BLUENOISE_TEXTURE u_noiseTex
#include "lygia/color/dither.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    // compress
    const float c0 = 32.0;    
    vec2 its = mix( vec2(0.0), vec2(1.0) / c0, st );
    color.rgb += mix(vec3(its.x), vec3(its.xy, 0.0), step(1.0+cos(u_time * 0.1), st.y + st.x) );

    color.rgb = dither(color.rgb);

    // compress
    color.rgb = floor( color.rgb * 255.0 ) / 255.0;
    color.rgb *= c0;
    
    gl_FragColor = color;
}
