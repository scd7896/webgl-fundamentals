#version 300 es

in vec4 a_position;

void main() {

  // 버퍼에서 받아온 a_position 그대로 좌표로 출력
  gl_Position = a_position;
}