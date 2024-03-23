#version 300 es
in vec2 a_position;

out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = vec4((vec3(a_position, 1)).xy, 0, 1);

  // Convert from clipspace to colorspace.
  // Clipspace goes -1.0 to +1.0
  // Colorspace goes from 0.0 to 1.0
  v_color = gl_Position * 0.5 + 0.5;
}