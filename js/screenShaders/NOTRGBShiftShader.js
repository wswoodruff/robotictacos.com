
const NOTRGBShiftShader = {

	name: 'RGBShiftShader',

	uniforms: {

		'tDiffuse': { value: null },
		'amount': { value: 0.005 },
		'aspectRatio': { value: 1.0 },
		'resolution': { value: {x:0.,y:0.} },
		'u_time': { value: 0 },
    

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  
  // main thing to tweak
	fragmentShader: /* glsl */`

  #define PI 3.14159265359
  #define TWO_PI 6.28318530718
  
  varying vec2 vUv;
  uniform vec2 resolution;
  uniform float aspectRatio;
  uniform float u_time;
uniform sampler2D tDiffuse;


vec3 ring(vec2 pos, float radius, float width){
  float d1 = length(pos) / radius;
  vec3 color2 = vec3(1.0-smoothstep(.4,0.402,d1));
  
  float d2 = length(pos) / (radius - width);
  vec3 color3 = vec3(1.0-smoothstep(.4,0.402,d2));
  
  return color2 - color3;
}


// Reference to
// http://thndl.com/square-shaped-shaders.html

vec3 shape(int pointsN, vec2 st, float size){
      // Number of sides of your shape
  int N = pointsN;
  
  size = clamp(size, 0.01, 10.);

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);

  // Shaping function that modulate the distance
  float d = cos(floor(0.500+a/r)*r-a)*length(st) / size;

  vec3 color = vec3(1.0-smoothstep(.4,.405,d));
  // color = vec3(d);
    return color;
}

vec3 outlineShape(int pointsN, vec2 st, float radius, float width){
    vec3 color1 = shape(pointsN, st, radius);
    vec3 color2 = shape(pointsN, st, radius-width);
    return color1 - color2;
}


float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

  void main() {
    
    vec2 st = vUv.xy;
    
    st = st *2.-1.;
    // Remap the space to -1. to 1.
    
    st.x *= aspectRatio;
    // to fix the aspect ratio like in the book of shaders
    // ex: vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // different method, and goes after any remapping
    
    
    
    vec2 pos = vec2(0.0,0.0) - st;

    
    float d = length(pos) / 1.824;

    vec3 color = vec3(1.0-smoothstep(.4,0.41,d));
    
    vec4 cg = texture2D(tDiffuse, vUv);
    
    // gl_FragColor = vec4( vec3(st.x, st.y, 0.0), 1.0);
    //gl_FragColor = vec4( vec3(pos.x, pos.y, 0.0), 1.0);
    // gl_FragColor = vec4( vec3(pos.x, pos.y, 0.0), 1.0);
    
    // gl_FragColor *= vec4( color, 1.0);
    
    gl_FragColor = vec4( cg.rgb, 1.0);
    // add mask effect!!
    
    float db = length(pos) / 1.724;
    vec3 colorB = vec3(1.0-smoothstep(.4,0.402,db));
    color = 1.0-color*0.2;
    color *= vec3( colorB);
    // 
    gl_FragColor *= vec4( 1.0-color*0.2, 1.0);
    // gl_FragColor *= vec4( color, 1.0);
    

    // circle2
    // float d2 = length(pos) / 1.624;
    // vec3 color2 = vec3(1.0-smoothstep(.4,0.402,d2));
    // 
    // float d3 = length(pos) / 1.54;
    // vec3 color3 = vec3(1.0-smoothstep(.4,0.402,d3));
    // 
    // color2 = color2 - color3;
    
    vec3 color2 = ring(pos, 1.9, 0.05);
    
    // gl_FragColor += vec4( color2, 1.0);
    
    vec3 color3 = ring(pos, 2.2, 0.02);
    // gl_FragColor += vec4( color3, 1.0);
    
    vec3 color4 = ring(pos, 2.8, 0.01);
    // gl_FragColor += vec4( color4, 1.0);

    // float sw = cos(u_time*2.)*2.+1.4;
    float sw = map( cos(u_time *4.0), -1.0,1.0,1.9,3.0  );
    vec3 color5 = ring(pos, sw, 0.01);
    gl_FragColor += vec4( color5, 1.0);


    float sw2 = map( cos(u_time*6.0+2.0), -1.0,1.0,1.4,3.0  );
    vec3 color6 = ring(pos, sw2, 0.01);
    gl_FragColor += vec4( color6, 1.0);
    
    
    vec2 pos2 = pos;
    pos2.y *= -1.;
    	// gl_FragColor.rgb += outlineShape(3, pos2, 1.160, 0.02);
    
    // gl_FragColor.rgb += outlineShape(3, pos2, 1.060, 0.02);
    
    
    for (int i = 1; i < 5; i++) {
      // gl_FragColor.rgb += outlineShape(3, pos2, 1.060-(float(i)*0.2), 0.02);
      // gl_FragColor.rgb += outlineShape(3, pos2, sin(1.060-(float(i)*0.2)), 0.02);
      gl_FragColor.rgb += outlineShape(3, pos2, sin(2.060-(float(i)*0.2*u_time)), 0.02);
      gl_FragColor.rgb += outlineShape(3, pos2, sin(2.060-(float(i)*0.2*u_time))*9., 0.02);
      // gl_FragColor.r = float(i);
    }
    
  }`

};

export { NOTRGBShiftShader };
