import vertexShaderSource from "./vertex.vert";
import fragmentShaderSource from "./fragment.frag";

function main() {
  var canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  var program = window.webglUtils.createProgramFromSources(gl, [
    vertexShaderSource,
    fragmentShaderSource,
  ]);

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  setGeometry(gl);

  gl.enableVertexAttribArray(positionAttributeLocation);
  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  );

  drawScene(gl);

  function drawScene(gl: WebGL2RenderingContext) {
    var translation = [200, 150];
    var angleInRadians = 0;
    var scale = [1, 1];
    window.webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    var offset = 0;
    var count = 3;
    gl.drawArrays(gl.TRIANGLES, offset, count);
  }
}

// Fill the buffer with the values that define a triangle.
function setGeometry(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, 0, 1]),
    gl.STATIC_DRAW,
  );
}

main();
