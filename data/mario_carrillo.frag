// Example by Mario Carrillo ( @marioecg )

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

uniform vec2 u_resolution;

#include "lygia/math/const.glsl"
#include "lygia/math/map.glsl"
#include "lygia/space/cart2polar.glsl"
#include "lygia/color/palette.glsl"
#include "lygia/generative/random.glsl"

void main(void) {
    // Coords
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y; // origin in center and account for aspect ratio
    st = 0.5 - abs(st); // mirror coordinates
    vec2 puv = cart2polar(st); // polar coords
    puv.x /= TWO_PI + 0.5; // remap angular component from [-PI, PI] to [0, 1] (https://www.youtube.com/watch?v=r1UOB8NVE8I&t=238s)

    // Time and static noise
    float t = u_time * 0.75;
    float grain = random(st);

    // Ids
    vec2 repeat = vec2(1.0, 40.0);
    vec2 id = floor(puv * repeat);

    // Gradient
    float x = map(
        cos(id.y * -0.25 + cos(puv.x * TWO_PI + id.y * 0.5) + t),
        -1.0,
        1.0,
        0.0,
        1.0
    );
    vec3 brightness = vec3(0.59, 0.56, 0.71);
    vec3 contrast = vec3(0.94, 0.5, 0.5);
    vec3 oscillation = vec3(1.7, 1.91, 2.16);
    vec3 phase = vec3(0.03, 0.02, 0.05);
    vec3 color = palette(x + TWO_PI * 0.56, brightness, contrast, oscillation, phase);

    color += grain * 0.25;
    
    gl_FragColor = vec4(color, 1.0);
}