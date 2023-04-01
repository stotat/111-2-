let points = [[3,3],[5,-1],[6,-2],[8,0],[10,4],[12,8],[13,12],[13,16],[15,15],[19,15],[22,15],[24,15],[26,16],[25,14],[23,10],[22,6],[19,5],[17,3],[16,1],[15,-3],[15,-7],[13,-8],[11,-10],[9,-12],[8,-14],[7,-18],[5,-16],[1,-14],[0,-14],[-4,-15],[-6,-17],[-8,-15],[-10,-13],[-11,-12],[-12,-12],[-13,-12],[-14,-13],[-17,-15],[-18,-15],[-22,-13],[-24,-12],[-25,-12],[-27,-13],[-25,-11],[-23,-8],[-21,-5],[-19,0],[-15,-2],[-12,-4],[-10,-5],[-7,-6],[-4,-6],[-1,-6],[-1,-3],[-2,1],[0,-1],[1,0],[2,0],[3,1],[3,3]];
let scaleAmount = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      points[i][j] = points[i][j] * 20;
    }
  }
  // canvas.mouseWheel(handleMouseWheel);
}

function draw() {
  background(255);
  translate(width/2, height/2);
  scale(scaleAmount, -scaleAmount); // 根据缩放比例缩放画布
  noFill();
  strokeWeight(5);
  
  // 定义渐变的起止颜色
  let startColor = color(0, 0, 0); // 黑色
  let endColor = color(255, 0, 0); // 红色
  
  // 用 beginShape() 和 endShape() 包含绘制形状的顶点
  for (let i = 5; i >= 1; i--) {
    let size = (i+0.3) * 20;
    strokeWeight(5);
    beginShape();
    for (let j = 0; j < points.length-1; j++) {
      // 计算每条线段的中间颜色
      let midColor = lerpColor(startColor, endColor, j/(points.length-2));
      stroke(midColor);
      let x1 = points[j][0] * size/100;
      let y1 = points[j][1] * size/100;
      let x2 = points[j+1][0] * size/100;
      let y2 = points[j+1][1] * size/100;
      line(x1, y1, x2, y2);
    }
    // 连接最后一点和第一点
    let midColor = lerpColor(startColor, endColor, (points.length-1)/(points.length-2));
    stroke(midColor);
    let x1 = points[points.length-1][0] * size/100;
    let y1 = points[points.length-1][1] * size/100;
    let x2 = points[0][0] * size/100;
    let y2 = points[0][1] * size/100;
    line(x1, y1, x2, y2);
    endShape(CLOSE);
  }
  // 加入文字
push()
scale(1,-1)
textSize(50);
textAlign(CENTER, CENTER);
fill(0);
noStroke();
text("蝙蝠", 0, -200);
pop()
}

function handleMouseWheel(event) {
  // 根据鼠标滚轮的delta属性来调整缩放比例
  let delta = event.deltaY > 0 ? 0.1 : -0.1;
  scaleAmount += delta;
  // 限制缩放比例的范围
  scaleAmount = constrain(scaleAmount, 0.1, 5);
  // 阻止默认的滚动事件
  return false;
}