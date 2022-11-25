#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

varying vec4 vertTexCoord;

#include "lygia/space/fisheye2xyz.glsl"
#include "lygia/lighting/atmosphere.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = vertTexCoord.xy;
    vec2 mouse = u_mouse * pixel;

    if (mouse.x <= 0.0 && mouse.y <= 0.0)
        mouse = vec2(fract(0.5+u_time*0.5), 0.6);
        
    vec3 eye_dir = fisheye2xyz(st);
    vec3 sun_dir = fisheye2xyz(mouse);
    
    color = atmosphere(eye_dir, sun_dir);

    gl_FragColor = vec4(color, 1.0);
}
