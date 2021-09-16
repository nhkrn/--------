
var QX = 0;
var QY = 0;
var QM = 0;
var QN = 0;
var time = 0;
let E = [];

class Electron{
  constructor(){
    this.q = QM;
    this.x = QX;
    this.y = QY;
    this.vx = 0;
    this.vy = 0;
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
      let x = px + 3*sqrt(abs(E[k].q))*cos(i*pi*2/abs(E[k].q));
      let y = py+ 3*sqrt(abs(E[k].q))*sin(i*pi*2/(abs(E[k].q)));
      for(let j = 0;j < 500;j ++){
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
        let b = (time/5)%10;
        if(j%10==b && E[k].q > 0)circle(x,y,6);
        if(j%10==9-b && E[k].q < 0)circle(x,y,6);
        px = x;
        py = y;
        x += a*cos(sita);
        y += a*sin(sita);
        for(let s = 0;s < QN;s ++){
          if(dist(x,y,E[s].x,E[s].y) < 3*sqrt(abs(E[k].q)))j = 701;
        }
      }
    }
   
  }
    for(let k = 0;k < QN;k ++){
      fill(250,0,100+150*E[k].q/abs(E[k].q));
      circle(E[k].x,E[k].y,6*sqrt(abs(E[k].q)));
    }
    fill(256)
    rect(0,0,200,40)
  }
}

class Move{
  draw(){
    let A = [];
    let B = [];
    for(let i = 0;i < QN;i ++){
      let ax = 0;
      let ay = 0;
      for(let j = 0;j < QN;j ++){
        if(i == j)continue;
        let d = dist(E[i].x,E[i].y,E[j].x,E[j].y);
        if(d < 20 && E[i].q*E[j].q < 0)d = 20;
          ax += 20*E[j].q*(E[i].x-E[j].x)/(d*d*d);
          ay += 20*E[j].q*(E[i].y-E[j].y)/(d*d*d);
      }
      console.log(ay)
      A.push(E[i].q*ax);
      B.push(E[i].q*ay);
    }
    for(let i = 0;i < QN;i ++){
      E[i].vx = E[i].vx+A[i]*10/abs(E[i].q);
      E[i].vy = E[i].vy+B[i]*10/abs(E[i].q);
      E[i].y += E[i].vy;
      E[i].x += E[i].vx;
    }
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
  line(135,10,135,30);
  line(150,10,150,30);
  line(135,10,150,10);
  line(135,30,150,30);
  line(135,15,150,25);
  line(170,10,170,30);
  line(170,10,190,20);
  line(190,20,170,30);
  time ++;
  depict = new Depict;
  if(time % 15 == 0){
    depict.draw();
  }
}


function mouseClicked(){
  QX = mouseX;
  QY = mouseY;
  if(QX< 200 && QY < 40){
    if(QX <= 40)QM += 5;
    if(QX > 40 && QX < 80)QM -= 5;
    if(QX > 80 && QX < 120)setup();
    if(QX >= 120 && QX < 160)QM = 0;
    if(QX >= 160 && QX < 200){
      move = new Move;
      move.draw();
    }
    console.log(QM)
  }else{
    electron = new Electron;
  E.push(electron);
  QN ++;
  }
}
