// out vec2 vUv;
// void main() {
//      vUv = uv; // Pass UV coordinates to fragment shader
//      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }

precision highp float;

// in vec3 position;
// in vec2 uv;

out vec2 vUv;
out vec3 pos; // Pass Y-coordinate to the fragment shader


// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;

void main() {
    vUv = uv; // Pass UV coordinates to fragment shader
	pos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
