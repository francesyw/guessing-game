var cnv;
var yoff = 0;
var offset = 10;
const DIFF = 90;
var diff = DIFF;
var offVal;

function setup() {
  cnv = createCanvas(displayWidth, windowHeight);
  cnv.id('bg-animation');
  fill('#beb1f2d9');
  noStroke();
  frameRate(30);
  offVal = setOffVal(-DIFF);
}

function draw() {
  clear();
  beginShape();
  curveVertex(-offset, height + offset);
  curveVertex(-offset, height + offset);
  var xoff = 0;
  for (let i = -offset * 10; i <= width + offset * 10; i += offset * 5) {
    let y = height * 0.4 + offVal + noise(xoff, yoff) * 90 - 45;
    curveVertex(i, y);
    xoff += map(diff, 0, 90, 0.5, 0.06);
  }
  curveVertex(width + offset, height + offset * 2);
  curveVertex(width + offset, height + offset * 2);
  endShape(CLOSE);
  yoff += map(diff, 0, 90, 0.015, 0.003);
  // console.log(game.difference());
}

function setOffVal(d) {
  return map(d, 100, -100, -height*0.5, height*0.53);
}