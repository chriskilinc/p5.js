const points = [];
const limit = 666;
let mult = 0.01;
let ANGLEMODE;
let changeAngleMode = false;
let elipseSize = 1;

let r1;
let r2;
let g1;
let g2;
let b1;
let b2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  random(0, 1) > 0.5 ? ANGLEMODE = RADIANS : ANGLEMODE = DEGREES;
  angleMode(ANGLEMODE);
  noiseDetail(1);

  let density = 75;
  let space = width / density;

  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < innerHeight; y += space) {
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }

  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);

  mult = random(0.002, 0.01);

}

function draw() {
  noStroke();
  // ANGLEMODE == DEGREES ? ANGLEMODE = RADIANS : ANGLEMODE = DEGREES;
  changeAngleMode ? angleMode(ANGLEMODE) : null;
  console.log(ANGLEMODE)

  let max = points.length;
  for (let i = 0; i < max; i++) {

    let r = map(points[i].x, 0, width, r1, r2);
    let g = map(points[i].y, 0, height, g1, g2);
    let b = map(points[i].x, 0, width, b1, b2);
    let alpha = map(dist(width / 2, height / 2, points[i].x, points[i].y), 0, limit, limit * 2, 0);

    fill(r, g, b, alpha);

    let angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);
    points[i].add(createVector(cos(angle), sin(angle)));

    if (dist(width / 2, height / 2, points[i].x, points[i].y) < limit)
      ellipse(points[i].x, points[i].y, elipseSize);
  }
}

function keyPressed(e) {
  console.log(e)
  if (e.code == "Enter") {
    saveCanvas("flowfield", "png");
  }
}

function mousePressed() {
  changeAngleMode = true;
  ANGLEMODE == DEGREES ? ANGLEMODE = RADIANS : ANGLEMODE = DEGREES;
  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);

  mult = random(0.002, 0.01);
}

// CREDITS
// https://www.youtube.com/watch?v=1-QXuR-XX_s