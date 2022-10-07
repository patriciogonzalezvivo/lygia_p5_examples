import java.io.File;
import java.nio.file.Path;

void loadSource(String current_folder, String filename, ArrayList<String> source) {
  File file = new File(current_folder,filename);
  String url = file.getPath().substring(1);
  String[] lines = loadStrings(url); 
  
  for (int i = 0; i < lines.length; i++) {
    String line = lines[i];
    String line_trim = line.trim();
    if (line_trim.startsWith("#include")){
      String include_file = line_trim.substring("#include".length()).replace("\"", "").trim();
      File f = new File(current_folder,include_file);
      loadSource(f.getParent(), f.getName(), source);
    } else {
      source.add(line + System.getProperty("line.separator") );
    }
  }
}



PShader loadRecursiveShader(String fragFilename) {
  ArrayList<String> src = new ArrayList<String>();
  loadSource("", fragFilename, src);
  String[] fragSource = new String[src.size()];
  src.toArray(fragSource);
  
  String[] vertSource = {
    "",
    "uniform mat4 transformMatrix;",
    "uniform mat4 texMatrix;",
    "",
    "attribute vec4 position;",
    "attribute vec4 color;",
    "attribute vec2 texCoord;",
    "",
    "varying vec4 vertColor;",
    "varying vec4 vertTexCoord;",
    "",
    "void main() {",
    "  gl_Position = transformMatrix * position;",
    "  vertColor = color;",
    "  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);",  
    "}"
  };
  
  //PShader shader = new PShader();
  //shader.setType(5);
  //shader.setFragmentShader(fragSource);
  //shader.setVertexShader(vertSource);
  return new PShader(this, vertSource, fragSource);
}
