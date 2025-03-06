// // License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
// #extension GL_OES_standard_derivatives : enable

// varying vec3 vertex;

// void main() {
//   // Pick a coordinate to visualize in a grid
//   float coord = vertex.y;

//   // Compute anti-aliased world-space grid lines
//   float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);

//   // Just visualize the grid lines directly
//   float color = 1.0 - min(line, 1.0);

//   // Apply gamma correction
//   color = pow(color, 1.0 / 2.2);
//   gl_FragColor = vec4(vec3(color), 1.0);
// }

// https://jsfiddle.net/prisoner849/5bk9tvjd/
// https://discourse.threejs.org/t/wireframe-of-quads/17924/10
 // http://madebyevan.com/shaders/grid/

in vec3 vertex; // 'varying' changes to 'in' in GLSL3
out vec4 fragColor;

in vec2 vUv;
uniform float time;

in vec3 pos;

void main() {
    // float coord = pos.y;
    // float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    // float _color = 1.0 - min(line, 1.0);
    // _color = pow(_color, 1.0 / 2.2);


        // float isWire = 1.0;
        // float segU = 24.0;
        // float segV = 24.0;
        // vec3 wireColor = vec3(0.5);
        // float wireWidthFactor = 2.0;

        // vec2 coord = vUv * vec2(segU, segV);

        // vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        // float line = min(grid.x, grid.y) / wireWidthFactor;
        // line = 1.0 - min(line, 1.0);
        
        // if (isWire > 0.5 && line < 0.5) discard;
        
        // if (isWire > 0.5) fragColor = vec4(0);
        // fragColor = mix(fragColor, vec4(wireColor, 1.0), line);
      


// float isWire = 1.0;
float segU = 24.0;
float segV = 24.0;
vec3 wireColor = vec3(1.0); // White wire color
vec3 baseColor = vec3(0.0); // Black base color
float wireWidthFactor = 2.0;
float baseAlpha = 0.8;

vec2 coord = vUv * vec2(segU, segV);
vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
float line = min(grid.x, grid.y) / wireWidthFactor;
line = 1.0 - min(line, 1.0);

// Start with base color
vec3 mixColor = baseColor;

// Blend wire color based on the line intensity
mixColor = mix(baseColor, wireColor, line);
    float alpha = mix(baseAlpha, 1.0, line); // Wires fully opaque

// if (isWire > 0.5) {
// }

// fragColor = vec4(mixColor, 1.0);
fragColor = vec4(mixColor, alpha);



    // vec3 color = vec3(sin(vUv.x * 10.0 + time), cos(vUv.y * 10.0 + time), sin(time)); 
    // fragColor = vec4(vec3(_color), 1.0);

}