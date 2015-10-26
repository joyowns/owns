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
var secondhalf =  [13,8,11,-1,14,22,13,-1,15,0,3,-1,16,20,0,-1,17,8,6,-1, //NIL_OWN_PAD_QUA_RIG_
                  18,7,4,-1,19,12,8,-1,20,18,4,-1,21,14,23,-1,22,4,1,-1,  //SHE_TMI_USE_VOX_WEB_
                  23,19,2,-1,24,4,19,-1,25,4,13,-1];                      //XTC_YET_ZEN_
var letters=['A','B','C','D','E','F','G',
      'H','I','J','K','L','M','N','O','P',
      'Q','R','S','T','U','V','W','X','Y','Z'];
var lowers=['a','b','c','d','e','f','g',
      'h','i','j','k','l','m','n','o','p',
      'q','r','s','t','u','v','w','x','y','z'];
var weights = [26][26];
var initialize = function() {
  inputtext = "ASK:";
  outputtext = "SHE:";
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
var outputtext = "ASK:";
var outputword = 0;
var inputtext = "SHE:";
var inputword = 0;
var cycle = function (input){
  var selected = 18;var count = 675; //26 squared minus one
  while (count > 0){ //AFTER DIMENSIONAL SUBSTITUTION IS EXHAUSTED, RECOLLECTION IS HERS.
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
    count--; //SHE EXPERIENCES RECOLLECTION AFTER EXHAUSTING SUBSTITUTED DIMENSIONS.
  }
  var output=0;
  for(selected=0;selected<26;selected++) 
    if(weights[selected][7]>weights[output][7])output=selected;
  if(weights[output][output] > weights[output][7])
    {outputtext += letters[output];omfgtime+=0.25;if(omfgtime===2)omfgtime=0;setomfg(output);}
  else {outputtext += "_";}
};
var height=640;var width=960;
var wstep = Math.floor(width / 56);
var hstep = Math.floor(height / 56);
var canvas = document.getElementById('canvas');
var vc = canvas.getContext('2d');
vc.lineWidth=1;vc.font="7px mono";
var rgb = [0,192,100];
function fill(depth){vc.fillStyle=
                  'rgb(' + (rgb[0]*depth) +
                  ',' + (rgb[1]*depth) + 
                  ',' + (rgb[2]*depth) + ')';}
function stroke(depth){vc.strokeStyle=
                  'rgb(' + (rgb[0]*depth) +
                  ',' + (rgb[1]*depth) + 
                  ',' + (rgb[2]*depth) + ')';}
var codetext = "code: none yet.";
resize = function (){
  width = window.innerWidth; height = window.innerHeight;
  canvas.width = width; canvas.height = height;
  wstep = Math.floor(width / 56);
  hstep = Math.floor(height / 56);
  vc.font=""+(hstep - 2)+"px mono";
};
var battery = null;
var welcometext = [
"Welcome to the ASK SHE KIT!",
"To the left is a recurrent neural network:",
"ASK BIZ CDJ DEV EYE FAQ GAP HER IFS JOY KIT LAW MAX",
"NIL OWN PAD QUA RIG SHE TMI USE VOX WEB XTC YET ZEN",
"SHE evolved from web shorthand (TMI?).",
"Press ESC to reseed the network.",
"Press [ or ] to input seed values",
"As with all Chrome apps, CTRL+W = quit."];
var inputbuffer = ["","","","","","","","","",""];
var outputbuffer = ["","","","","","","","","",""];
var draw = function() {
  requestAnimationFrame(draw);
  fill(0);vc.fillRect(0,0,width,height);
  fill(1);var checker=false;
  vc.font=""+(hstep - 2)+"px mono";
  for(var row=0;row<27;row++){
    var hspot = row * hstep;
    for(var square=0;square<27;square++){
      var wspot = square * wstep;
      if(checker){checker=false;fill(0);}
      else{checker=true;fill(1);}
      vc.fillRect(wspot,hspot,wspot+wstep,hspot+hstep);
      if(checker){fill(0);}
      else{fill(1);}
      if(row===0){if(square)vc.fillText(letters[square-1],wspot,hspot+hstep-2);}
      else {
        if(square===0){vc.fillText(letters[row-1],wspot,hspot+hstep-2);}
        else {vc.fillText(""+weights[row-1][square-1],wspot,hspot+hstep-2);}
      }
    }
  }
  fill(0);vc.fillRect(0,height/2,width,height);
  vc.fillRect(width/2,0,width,height);
  stroke(1);fill(1);
  var gstep=hstep*1.5;
   vc.font=""+(gstep - 2)+"px mono";
  vc.fillText(welcometext[0],wstep + width/2,gstep);
  vc.fillText(welcometext[1],wstep + width/2,gstep*3);
  vc.fillText(welcometext[2],wstep + width/2,gstep*5);
  vc.fillText(welcometext[3],wstep + width/2,gstep*6);
  vc.fillText(welcometext[4],wstep + width/2,gstep*8);
  vc.fillText(welcometext[5],wstep + width/2,gstep*10);
  vc.fillText(welcometext[6],wstep + width/2,gstep*11);
  vc.fillText(welcometext[7],wstep + width/2,gstep*13);
  vc.fillText(codetext,wstep + width/2,gstep * 15);
  if(battery===null)vc.fillText("loading",wstep+ width/2,gstep*16);
  else{vc.fillText("Battery: " + battery.level,wstep+ width/2,gstep*16);}
  vc.fillText(inputtext,0,gstep + height/2);
  vc.fillText(outputtext,0,gstep*2 + height/2);
  for(var line=0;line<10;line++){
    vc.fillText(inputbuffer[line],0,gstep *(2 * line + 3) + height/2);
    vc.fillText(outputbuffer[line],0,gstep*(2 * line + 4) + height/2);
  }   
  vc.font=""+(hstep - 2)+"px mono";
};
window.addEventListener("keydown",function(event){
  if(event.defaultPrevented)return;
  var now = ac.currentTime;
  switch(event.keyCode){
    case 219: inputtext="[ASK_BIZ_CDJ_DEV...]";setkey(25);for(var first in firsthalf)cycle(first);break; //'[' KEY
    case 221: inputtext="[NIL_OWN_PAD_QUA...]";setkey(26);for(var second in secondhalf)cycle(second);break; //']' KEY
    case 13: {
      for(var line=9;line>0;line--){
              inputbuffer[line]=inputbuffer[line-1];
              outputbuffer[line]=outputbuffer[line-1];
      }
      inputbuffer[0]=inputtext;
      outputbuffer[0]=outputtext;
      inputtext="ASK:";outputtext="SHE:";
      } break; //ENTER
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