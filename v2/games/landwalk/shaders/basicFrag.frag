// // License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
// varying vec2 vUv;
// uniform float time;
// void main() {
//     vec3 color = vec3(sin(vUv.x * 10.0 + time), cos(vUv.y * 10.0 + time), sin(time)); 
//     gl_FragColor = vec4(color, 1.0);
// }

in vec3 vertex; // 'varying' changes to 'in' in GLSL3
out vec4 fragColor;

in vec2 vUv;
uniform float time;

void main() {
    vec3 color = vec3(sin(vUv.x * 10.0 + time), cos(vUv.y * 10.0 + time), sin(time)); 
    fragColor = vec4(vec3(color), 1.0);

}