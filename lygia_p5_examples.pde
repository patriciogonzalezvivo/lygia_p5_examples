/**
 * Edge Detection
 * 
 * Change the default shader to apply a simple, custom edge detection filter.
 * 
 * Press the mouse to switch between the custom and default shader.
 */

PShader shdr;  
PImage img_danny;
PImage img_sprite;
PImage img_blueNoise;
PImage img_env;

void setup() {
  size(512, 512, P2D);
  
  // Assets
  img_danny = loadImage("imgs/danny.png");
  img_sprite = loadImage("imgs/sprite_megaman.png");
  img_blueNoise = loadImage("imgs/noise_blue.png");
  img_env = loadImage("imgs/arches.jpg");
  
  // Examples
  //shdr = loadRecursiveShader("animation_easing.frag");
  //shdr = loadRecursiveShader("animation_sprite.frag");
  //shdr = loadRecursiveShader("color_dither.frag");
  //shdr = loadRecursiveShader("draw_digits.frag");
  //shdr = loadRecursiveShader("filter_bilateralBlur2D.frag");
  //shdr = loadRecursiveShader("filter_boxBlur2D.frag");
  //shdr = loadRecursiveShader("filter_gaussianBlur2D.frag");
  //shdr = loadRecursiveShader("filter_noiseBlur2D.frag");
  //shdr = loadRecursiveShader("filter_radialBlur2D.frag");
  //shdr = loadRecursiveShader("filter_sharpen2D.frag");
  //shdr = loadRecursiveShader("filter_edge2D.frag");
  //shdr = loadRecursiveShader("filter_median2D.frag");
  //shdr = loadRecursiveShader("filter_laplacian2D.frag");
  //shdr = loadRecursiveShader("filter_kuwahara2D.frag");
  //shdr = loadRecursiveShader("generative_random.frag");
  //shdr = loadRecursiveShader("generative_cnoise.frag");
  //shdr = loadRecursiveShader("generative_snoise.frag");
  //shdr = loadRecursiveShader("generative_pnoise.frag");
  //shdr = loadRecursiveShader("generative_noised.frag");
  //shdr = loadRecursiveShader("generative_curl.frag");
  //shdr = loadRecursiveShader("generative_fbm.frag");
  //shdr = loadRecursiveShader("generative_voronoi.frag");
  //shdr = loadRecursiveShader("generative_voronoise.frag");
  //shdr = loadRecursiveShader("generative_worley.frag");
  //shdr = loadRecursiveShader("lighting_atmosphere.frag");
  //shdr = loadRecursiveShader("lighting_raymarching.frag");
  //shdr = loadRecursiveShader("lighting_raymarching_glass.frag");
  //shdr = loadRecursiveShader("lighting_raymarching_pbr.frag");
  shdr = loadRecursiveShader("lighting_raymarching_volume.frag");
  
  // Artist contributions
  //shdr = loadRecursiveShader("guido_schmidt.frag");
  //shdr = loadRecursiveShader("ilithya.frag");
  //shdr = loadRecursiveShader("mario_carrillo.frag");
}

void draw() {
  shader(shdr);
  
  // Uniforms
  shdr.set("u_noiseTex", img_blueNoise);
  shdr.set("u_spriteTex", img_sprite);
  shdr.set("u_envTex", img_env);
  shdr.set("u_resolution", float(width), float(height));
  shdr.set("u_mouse", float(mouseX), float(mouseY));
  shdr.set("u_time", millis() / 1000.0);
  
  image(img_danny, 0, 0, 512, 512);
}
