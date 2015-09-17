var ac = new window.AudioContext();
var keys = [];
var stepfactor = Math.pow(2,1/12);
var notevals = [55 / (stepfactor*stepfactor),55,55*stepfactor,55*stepfactor*stepfactor*stepfactor,
55*Math.pow(stepfactor,5),55*Math.pow(stepfactor,6),55*Math.pow(stepfactor,8)];
for(var omgduh=7;omgduh<=21;omgduh+=7)
  for(var whocares=0;whocares<7;whocares++)
    notevals[omgduh+whocares]=notevals[omgduh+whocares-7]*2;
var setkey = function(keyval){
  keys[keyval] = ac.createOscillator();
  keys[keyval].frequency.value = notevals[keyval];
  keys[keyval].type = "square";
  keys[keyval+28] = ac.createGain();
  keys[keyval+28].gain.setValueAtTime(1,ac.currentTime);
  keys[keyval+28].gain.linearRampToValueAtTime(0,ac.currentTime+0.25);
  keys[keyval+28].connect(ac.destination);
  keys[keyval].connect(keys[keyval+28]);
  keys[keyval].start();keys[keyval].stop(ac.currentTime+0.25);
};
var omfgtime = 0;
var omfg = [];//_,a,b,c,d, e, f, g, h, i, j, k, l, m,n,o, p, q, r, s,t, u, v,w, x,y, z
var omfgvals = [0,8,5,3,10,17,11,12,13,22,14,15,16,7,6,23,24,15,18,9,19,21,4,16,2,20,1];
var setomfg = function(keyval){
  omfgval = omfgvals[keyval+1];
  omfg[omfgval] = ac.createOscillator();
  omfg[omfgval].frequency.value = 2 * notevals[omfgval];
  omfg[omfgval].type = "square";
  omfg[omfgval+28] = ac.createGain();
  omfg[omfgval+28].gain.setValueAtTime(1,ac.currentTime+omfgtime);
  omfg[omfgval+28].gain.linearRampToValueAtTime(0,ac.currentTime+1+omfgtime);
  omfg[omfgval+28].connect(ac.destination);
  omfg[omfgval].connect(omfg[omfgval+28]);
  omfg[omfgval].start(ac.currentTime+omfgtime);omfg[omfgval].stop(ac.currentTime+1+omfgtime);
};
var firsthalf = [0,18,10,-1,1,8,25,-1,2,3,9,-1,3,4,21,-1,4,24,4,-1,  //ASK_BIZ_CDJ_DEV_EYE_
                5,0,16,-1,6,0,15,-1,7,4,17,-1,8,5,18,-1,9,14,24,-1, //FAQ_GAP_HER_IFS_JOY_
                10,8,19,-1,11,0,22,-1,12,0,23,-1];                  //KIT_LAW_MAX_
var secondhalf =  [13,8,11,-1,14,22,13,-1,15,0,3,-1,16,20,0,-1,17,8,6,-1,
                  18,7,4,-1,19,12,8,-1,20,18,4,-1,21,14,23,-1,22,4,1,-1,
                  23,19,2,-1,24,4,19,-1,25,4,13,-1];
var letters=['A','B','C','D','E','F','G',
      'H','I','J','K','L','M','N','O','P',
      'Q','R','S','T','U','V','W','X','Y','Z'];
var weights = [26][26];
var initialize = function() {
  inputtext = "Input: ";
  outputtext = "Output: ";
  weights = [
  //A   B   C   D   E   F   G   H   I   J   K   L   M   N   O   P   Q   R   S   T   U   V   W   X   Y   Z
  [4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//A
  [0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0],//B
  [0.5,0.5,4.0,2.0,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//C
  [0.5,0.5,0.5,4.0,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5],//D
  [0.5,0.5,0.5,0.5,5.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5],//E
  [2.0,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//F
  [2.0,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//G
  [0.5,0.5,0.5,0.5,2.0,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//H
  [0.5,0.5,0.5,0.5,0.5,2.0,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//I
  [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5],//J
  [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5],//K
  [2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5],//L
  [2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5],//M
  [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,0.5,1.0,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//N
  [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5],//O
  [2.0,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//P
  [1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5],//Q
  [0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//R
  [0.5,0.5,0.5,0.5,1.0,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5],//S
  [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5,0.5,0.5,0.5],//T
  [0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,4.0,0.5,0.5,0.5,0.5,0.5],//U
  [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,1.0,0.5,0.5],//V
  [0.5,1.0,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0,0.5,0.5,0.5],//W
  [0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5,4.0,0.5,0.5],//X
  [0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,4.0,0.5],//Y
  [0.5,0.5,0.5,0.5,2.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,1.0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,4.0]];//Z
};
var outputtext = "Output: ";
var inputtext = "Input: ";
var cycle = function (input){
  var selected = 18;var count = 0;
  while ((count<676)){ //AFTER DIMENSIONAL SUBSTITUTION IS EXHAUSTED, RECOLLECTION IS HERS.
    var next=0;//SHE SELECTS THE HEAVIEST RETURN PATH.
    for(var check=0;check<26;check++){ //SHE CHECKS EACH EXIT:
      if(weights[check][selected]/2 > weights[selected][check]){ //WHEN RETURN IS HEAVIER THAN EXIT,
        if(weights[check][selected]*2 != weights[check][selected]*4)//WHEN LOADING IS NONDESTRUCTIVE,
          weights[selected][check]*=2;} //LOAD EXITS TO HEAVY RETURNS.
      else if(weights[selected][check]/2)weights[selected][check]/=2; //NONDESTRUCTIVELY UNLOAD LIGHT RETURNS.
      if(weights[check][selected] > weights[next][selected])next=check; //NEXT PATH IS HEAVIEST RETURN.
    } //AFTER ALL PATHS ARE CHECKED,
    if(input>=0)weights[selected][input] += 1; //SHE STORES OBSERVATION AS PROXIMITY.
    else if(weights[selected][input]>=1)weights[selected][input]-=1; //SHE STORES TIME AS SPACE.
    selected = next; //SHE FOLLOWS THE PATH WITH THE HEAVIEST RETURN.
    count++; //SHE EXPERIENCES RECOLLECTION AFTER EXHAUSTING SUBSTITUTED DIMENSIONS.
  }
  var output=0;
  for(selected=0;selected<26;selected++) 
    if(weights[selected][7]>weights[output][7])output=selected;
  if(weights[output][output] > weights[output][7])
    {outputtext += letters[output];omfgtime+=0.25;if(omfgtime===2)omfgtime=0;setomfg(output);}
  else {outputtext += "_";}
};
var height=640;var width=960;
var wstep = Math.floor(width / 27);
var hstep = Math.floor(height / 28);
var canvas = document.getElementById('canvas');
var vc = canvas.getContext('2d');
vc.lineWidth=1;vc.font="13px mono";
function fill(depth){vc.fillStyle=
                  'rgb(' + (100*depth) +
                  ',' + (100*depth) + 
                  ',' + (192*depth) + ')';}
function stroke(depth){vc.strokeStyle=
                  'rgb(' + (100*depth) +
                  ',' + (100*depth) + 
                  ',' + (192*depth) + ')';}
var codetext = "code: none yet.";
resize = function (){
  width = window.innerWidth; height = window.innerHeight;
  canvas.width = width; canvas.height = height;
  wstep = Math.floor(width / 27);
  hstep = Math.floor(height / 29);
  vc.font=""+(hstep-2)+"px mono";
};
var battery = null;
var draw = function() {
  requestAnimationFrame(draw);
  fill(0);vc.fillRect(0,0,width,height);
  fill(1);var checker=false;
  for(var row=0;row<27;row++){
    var hspot = row * hstep;
    for(var square=0;square<27;square++){
      var wspot = square * wstep;
      if(checker){checker=false;fill(0);stroke(1);}
      else{checker=true;fill(1);stroke(0);}
      vc.fillRect(wspot,hspot,wspot+wstep,hspot+hstep);
      if(row===0){if(square)vc.strokeText(letters[square-1],wspot,hspot+hstep-2);}
      else {
        if(square===0){vc.strokeText(letters[row-1],wspot,hspot+hstep-2);}
        else {vc.strokeText(""+weights[row-1][square-1],wspot,hspot+hstep-2);}
      }
    }
  }
  fill(0);vc.fillRect(0,height-(hstep*2),width,height);
  stroke(1);
  vc.strokeText(codetext,0,height-(hstep/2));
  vc.strokeText(inputtext,0,height-(hstep*1.5));
  vc.strokeText(outputtext,width/2,height-(hstep*1.5));
  if(battery===null)vc.strokeText("loading",width/2,height-hstep/2);
  else{vc.strokeText("Battery: " + battery.level,width/2,height-hstep/2);}
};
window.addEventListener("keydown",function(event){
  if(event.defaultPrevented)return;
  var now = ac.currentTime;
  switch(event.keyCode){
    case 219: inputtext="Input:FIRST.";setkey(25);for(var first in firsthalf)cycle(first);break; //'[' KEY
    case 221: inputtext="Input:SECOND.";setkey(26);for(var second in secondhalf)cycle(second);break; //']' KEY
    case 13: inputtext="Input: ";outputtext="Output: ";break; //ENTER
    case 27: initialize();break;//ESCAPE
    case 32: inputtext+="_";setkey(0);cycle(-1);break;//SPACEBAR
    case 65: inputtext+="A";setkey(8);cycle(0);break;
    case 66: inputtext+="B";setkey(5);cycle(1);break;
    case 67: inputtext+="C";setkey(3);cycle(2);break;
    case 68: inputtext+="D";setkey(10);cycle(3);break;
    case 69: inputtext+="E";setkey(17);cycle(4);break;
    case 70: inputtext+="F";setkey(11);cycle(5);break;
    case 71: inputtext+="G";setkey(12);cycle(6);break;
    case 72: inputtext+="H";setkey(13);cycle(7);break;
    case 73: inputtext+="I";setkey(22);cycle(8);break;
    case 74: inputtext+="J";setkey(14);cycle(9);break;
    case 75: inputtext+="K";setkey(15);cycle(10);break;
    case 76: inputtext+="L";setkey(16);cycle(11);break;
    case 77: inputtext+="M";setkey(7);cycle(12);break;
    case 78: inputtext+="N";setkey(6);cycle(13);break;
    case 79: inputtext+="O";setkey(23);cycle(14);break;
    case 80: inputtext+="P";setkey(24);cycle(15);break;
    case 81: inputtext+="Q";setkey(15);cycle(16);break;
    case 82: inputtext+="R";setkey(18);cycle(17);break;
    case 83: inputtext+="S";setkey(9);cycle(18);break;
    case 84: inputtext+="T";setkey(19);cycle(19);break;
    case 85: inputtext+="U";setkey(21);cycle(20);break;
    case 86: inputtext+="V";setkey(4);cycle(21);break;
    case 87: inputtext+="W";setkey(16);cycle(22);break;
    case 88: inputtext+="X";setkey(2);cycle(23);break;
    case 89: inputtext+="Y";setkey(20);cycle(24);break;
    case 90: inputtext+="Z";setkey(1);cycle(25);break;
    default: codetext = "code: " + event.keyCode;break;}});
window.addEventListener("resize",resize);
window.onload = function () {initialize();resize();draw();window.navigator.getBattery().then(function(wtf){battery=wtf;});};