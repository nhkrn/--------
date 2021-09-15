var QX = 0;
var QY = 0;
var QM = 0;
var QN = 0;
let E = [];

class Electron{
  constructor(){
    this.q = QM;
    this.x = QX;
    this.y = QY;
  }
}

class Depict{
  draw(){
  let pi = PI;
  let a = 5;
  background(255);

  for(let k = 0;k < QN;k ++){
    for(let i = 0;i < abs(E[k].q);i ++){
      let px = E[k].x;
      let py = E[k].y;
      let x = px + 15*cos(i*pi*2/abs(E[k].q));
      let y = py+ 15*sin(i*pi*2/(abs(E[k].q)));
      for(let j = 0;j < 700;j ++){
        let ax = 0;
        let ay = 0;
        for(let s = 0;s < QN;s ++){
          let d = dist(x,y,E[s].x,E[s].y);
          ax += E[s].q*(x-E[s].x)/(d*d*d);
          ay += E[s].q*(y-E[s].y)/(d*d*d);
        }
        let sita = atan(ay/ax);
        if(dist(x,y,px,py)> dist(x+a*cos(sita),y+a*sin(sita),px,py)){
          a = -a;
        }
        line(x,y,x+a*cos(sita),y+a*sin(sita));
        px = x;
        py = y;
        x += a*cos(sita);
        y += a*sin(sita);
        for(let s = 0;s < QN;s ++){
          if(dist(x,y,E[s].x,E[s].y) < 15)j = 61;
        }
      }
    }
   
  }
    for(let k = 0;k < QN;k ++){
      fill(250,0,100+150*E[k].q/abs(E[k].q));
      circle(E[k].x,E[k].y,3*sqrt(abs(E[k].q)));
    }
    fill(256)
    rect(0,0,120,40)
  }
}

function setup() {
  E = [];
  QM = 0;
  QN = 0;
  createCanvas(1000, 1000);
  depict = new Depict;
}


function draw() {
  line(10,20,30,20);
  line(20,10,20,30);
  line(50,20,70,20);
  line(90,10,110,30);
  line(90,30,110,10);
}


function mouseClicked(){
  QX = mouseX;
  QY = mouseY;
  if(QX< 120 && QY < 40){
    if(QX <= 40)QM += 5;
    if(QX > 40 && QX < 80)QM -= 5;
    if(QX > 80)setup();
    console.log(QM)
  }else{
    electron = new Electron;
  E.push(electron);
  QN ++;
  depict.draw();
  }
}