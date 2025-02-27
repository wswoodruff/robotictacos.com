// default w = 4 to get a value 1 at max y
// must be a square thing
// otherwise w is height scalar
// x\ \left(1-x\right)w


/*

function fff4(x,w=4) {
return x * (1-x) * w;
}

len = 10;
b = 1;
w = 4;
for (var i = 0; i < len+1; i++) {
  // console.log(i/len, b);
  // console.log("i", i/len);
  // let v = fff3(i/len, b);
  let v = fff4(i/len, w);
  // v = v**0.5
  console.log( v );
}
*/
// need a bell curve that goes 0 to 1 to 0
export function bellCurve1(x,w=4) {
  return x * (1-x) * w;
}
