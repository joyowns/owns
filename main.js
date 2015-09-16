//VIDEO ONLY SECTION
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
  while ((count<676)){ //UNTIL RECOLLECTION IS HERS.
    var next=0;//SHE SELECTS THE HEAVIEST RETURN PATH.
    for(var check=0;check<26;check++){ //FOR EACH NEXT PATH:
      if(weights[check][selected]/2 > weights[selected][check]) //CHECK PATH FOR HEAVY RETURN.
        weights[selected][check]*=2; //LOAD PATHS TO HEAVY RETURNS.
      else weights[selected][check]/=2; //UNLOAD PATHS TO SLIGHT RETURNS.
      if(weights[check][selected] > weights[next][selected])next=check; //NEXT PATH IS HEAVIEST RETURN.
    } //AFTER ALL PATHS ARE CHECKED,
    if(input>=0)weights[selected][input] += 1; //SHE STORES OBSERVATION.
    selected = next; //SHE FOLLOWS THE PATH WITH THE HEAVIEST RETURN.
    count++; //SHE WILL GUESS IF EXHAUSTED.
  }
  var output=0;
  for(selected=0;selected<26;selected++) 
    if(weights[selected][7]>weights[output][7])output=selected;
  if(weights[output][output] > weights[output][7])
    outputtext += letters[output];
  else outputtext += "_";
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

  
};
  
window.addEventListener("keydown",function(event){
  if(event.defaultPrevented)return;
  switch(event.keyCode){
    case 13: inputtext="Input: ";outputtext="Output: ";break; //ENTER
    case 27: initialize();break;//ESCAPE
    case 32: inputtext+="_";cycle(-1);break;//SPACEBAR
    case 65: inputtext+="A";cycle(0);break;
    case 66: inputtext+="B";cycle(1);break;
    case 67: inputtext+="C";cycle(2);break;
    case 68: inputtext+="D";cycle(3);break;
    case 69: inputtext+="E";cycle(4);break;
    case 70: inputtext+="F";cycle(5);break;
    case 71: inputtext+="G";cycle(6);break;
    case 72: inputtext+="H";cycle(7);break;
    case 73: inputtext+="I";cycle(8);break;
    case 74: inputtext+="J";cycle(9);break;
    case 75: inputtext+="K";cycle(10);break;
    case 76: inputtext+="L";cycle(11);break;
    case 77: inputtext+="M";cycle(12);break;
    case 78: inputtext+="N";cycle(13);break;
    case 79: inputtext+="O";cycle(14);break;
    case 80: inputtext+="P";cycle(15);break;
    case 81: inputtext+="Q";cycle(16);break;
    case 82: inputtext+="R";cycle(17);break;
    case 83: inputtext+="S";cycle(18);break;
    case 84: inputtext+="T";cycle(19);break;
    case 85: inputtext+="U";cycle(20);break;
    case 86: inputtext+="V";cycle(21);break;
    case 87: inputtext+="W";cycle(22);break;
    case 88: inputtext+="X";cycle(23);break;
    case 89: inputtext+="Y";cycle(24);break;
    case 90: inputtext+="Z";cycle(25);break;
    default: {
      codetext = "code: " + event.keyCode;
      break;
    }
  }
});
window.addEventListener("resize",resize);

window.onload = function () {initialize();draw();};
