var cnv;
var yoff = 0;
var offset = 10;
var diff = 90;
var offVal = -100;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('bg-animation');
  fill('#beb1f2d9');
  noStroke();
  frameRate(30);
  // console.log(game);
}

function draw() {
  clear();
  beginShape();
  curveVertex(-offset, height + offset);
  curveVertex(-offset, height + offset);
  var xoff = 0;
  for (let i = -offset * 10; i <= width + offset * 10; i += offset * 5) {
    // var diffVal = map(diff, 100, -100, -height/2, height/2);
    // height/2 + diffVal + noise (min, max)
    // diff => diffVal
    //  0   => 0 
    //  +100 => height/2 
    let y = height / 2 - 60 + noise(xoff, yoff) * 100 - 50;
    curveVertex(i, y);
    xoff += map(diff, 0, 90, 0.5, 0.06);
  }
  curveVertex(width + offset, height + offset * 2);
  curveVertex(width + offset, height + offset * 2);
  endShape(CLOSE);
  yoff += map(diff, 0, 90, 0.015, 0.003);
  // console.log(game.difference());
}

function setOffVal(diff, isLower) {
  return isLower ? -diff : diff;
}