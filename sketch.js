var canvas, radius, mod_slider, mult_slider, color_picker_bg, color_picker, alpha_slider;

var DEFAULT_MULTIPLIER = 1807;
var DEFAULT_MODULUS = 9374;
var DEFAULT_BG_COLOR = '#C01C28';
var DEFAULT_LINE_COLOR = '#ffffff';
var DEFAULT_TRANSPARENCY = 220;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  radius = min(width, height - 260) / 2.1;
  textSize(min(width, height) / 40);
  textFont('Georgia');
  mult_slider = createSlider(0, 10000, DEFAULT_MULTIPLIER);
  mult_slider.position(20, 60);
  mult_slider.style('width', str(width / 2 - 30) + 'px');
  mod_slider = createSlider(0, 10000, DEFAULT_MODULUS);
  mod_slider.position(width / 2 + 10, 60);
  mod_slider.style('width', str(width / 2 - 30) + 'px');
  color_picker_bg = createColorPicker(DEFAULT_BG_COLOR);
  color_picker_bg.position(20, height - 110);
  color_picker_bg.style('width', str(width / 3 - 80 / 3) + 'px');
  color_picker = createColorPicker(DEFAULT_LINE_COLOR);
  color_picker.position(40 + width / 3 - 80 / 3, height - 110);
  color_picker.style('width', str(width / 3 - 80 / 3) + 'px');
  alpha_slider = createSlider(0, 255, DEFAULT_TRANSPARENCY);
  alpha_slider.position(60 + 2 * width / 3 - 160 / 3, height - 110);
  alpha_slider.style('width', str(width / 3 - 80 / 3) + 'px');  
}

function draw() {
  background(color_picker_bg.color());
  noStroke();
  fill(255);
  rect(0, height - 160, width, 160);
  rect(0, 0, width, 100);
  fill(55);
  rect(0, height - 60, width, 60);
  fill(0);  
  textAlign(CENTER);
  text('MULTIPLIER = ' + mult_slider.value(), 20 + (width - 60) / 4, 40);
  text('MODULUS = ' + mod_slider.value(), width - 20 - (width - 60) / 4, 40);
  text('Background Color', 20 + (width - (4 * 20)) / 6, height - 130);
  text('Line Color', width / 2, height - 130);
  text('Line Transparency', width - 20 - (width - (4 * 20)) / 6, height - 130);
  fill(255);
  text('Save', width / 2, height - 25);
  let color = color_picker.color();
  color.setAlpha(255 - alpha_slider.value());
  stroke(color);
  noFill();
  let center = createVector(width / 2, height / 2 - 30);
  lines(mult_slider.value(), mod_slider.value(), radius, center, canvas);
  circle(width / 2, height / 2 - 30, radius * 2);
  color_picker.hide();
  color_picker.show();
}

function download () {
  let size = prompt(
    'Give the wanted imagesize in pixels.\n' +
    'Note that this will take very long if your input is large.\n' +
    'Default is 2000.',
    2000
  );
  if (size == '') {
    size = 2000;
  } else {
    size = int(size);
  }
  let g = createGraphics(size, size);
  g.background(color_picker_bg.color());
  let color = color_picker.color();
  color.setAlpha(255 - alpha_slider.value());
  g.stroke(color);
  g.noFill();
  let radius = min(g.width, g.height) / 2.2;
  let center = createVector(g.width / 2, g.height / 2);
  lines(mult_slider.value(), mod_slider.value(), radius, center, g);
  g.circle(center.x, center.y, radius * 2);
  saveCanvas(
    g,
    'multiplier-' + mult_slider.value() + '_modulus-' + mod_slider.value(),
    'png'
  );
}

function lines(mult, mod, r, center, canvas) {
  for (i = 0; i < mod; i++) {
    let j = (i * mult) % mod;
    canvas.line(
      center.x + r * sin(TWO_PI * i / mod),
      center.y - r * cos(TWO_PI * i / mod),
      center.x + r * sin(TWO_PI * j / mod),
      center.y - r * cos(TWO_PI * j / mod)
    );
  }
}

function mouseClicked() {
  if (mouseY > height - 60 && mouseY < height && mouseX > 0 && mouseX < width) {
    download();
  }
}
