/**
 * Edge Detection
 * 
 * Change the default shader to apply a simple, custom edge detection filter.
 * 
 * Press the mouse to switch between the custom and default shader.
 */

PShader shader;  
PImage img;

void setup() {
  size(512, 512, P2D);
  img = loadImage("danny.png");      
  shader = loadRecursiveShader("filter_edge2D.frag");
}

void draw() {
  shader(shader);
  image(img, 0, 0, 512, 512);
}
