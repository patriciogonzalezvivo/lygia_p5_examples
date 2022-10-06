/**
 * Edge Detection
 * 
 * Change the default shader to apply a simple, custom edge detection filter.
 * 
 * Press the mouse to switch between the custom and default shader.
 */

PShader shdr;  
PImage img_danny;
PImage img_blueNoise;

void setup() {
  size(512, 512, P2D);
  
  // Assets
  img_danny = loadImage("danny.png");
  img_blueNoise = loadImage("noise_blue.png");
  
  // Examples
  //shdr = loadRecursiveShader("animation_easing.frag");
  //shdr = loadRecursiveShader("color_dither.frag");
  //shdr = loadRecursiveShader("draw_digits.frag");
  shdr = loadRecursiveShader("filter_bilateralBlur2D.frag");
  //shdr = loadRecursiveShader("filter_edge2D.frag");
}

void draw() {
  shader(shdr);
  
  // Uniforms
  shdr.set("u_noiseTex", img_blueNoise);
  shdr.set("u_resolution", float(width), float(height));
  shdr.set("u_mouse", float(mouseX), float(mouseY));
  shdr.set("u_time", millis() / 1000.0);
  
  image(img_danny, 0, 0, 512, 512);
}
