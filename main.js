var letters=['A','B','C','D','E','F','G',
      'H','I','J','K','L','M','N','O','P',
      'Q','R','S','T','U','V','W','X','Y','Z'];
var lowers=['a','b','c','d','e','f','g',
      'h','i','j','k','l','m','n','o','p',
      'q','r','s','t','u','v','w','x','y','z'];
var weights = [26][26];
var outputtext = "";
var inputtext = "ASK:";
var initialize = function() {
  inputtext = "ASK:";
  outputtext = "";
  outputbuffer = ["","","","","","","","","","",
                    "","","","","","","","","","",
                    "","","","","","","","","","",
                    "","","","","","","","","",""];
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
    {outputtext += letters[output];}
  else {outputtext += "_";}
};
var height=640;var width=960;
var wstep = Math.floor(width / 56);
var hstep = Math.floor(height / 56);
var canvas = document.getElementById('canvas');
var vc = canvas.getContext('2d');
vc.lineWidth=1;vc.font="7px mono";
var rgb = [255,255,0];
function fill(depth){vc.fillStyle=
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
"STEP 1: TYPE QUERY IN ENGLISH",
"STEP 2: HIT ENTER FOR RESPONSE IN A.S.K.",
"STEP 3: PRESS = TO RESET OR CTRL+W TO QUIT",
" ",
"      COMPLETE DICTIONARY OF A.S.K.      ",
" ",
"ASK: SHE KIT. BIZ: IFS ZEN. CDJ: DEV JOY.",
"DEV: EYE VOX. EYE: YET EYE. FAQ: ASK QUA.",
"GAP: ASK PAD. HER: EYE RIG. IFS: FAQ SHE.",
"JOY: OWN YET. KIT: IFS TMI. LAW: ASK WEB.",
"MAX: ASK XTC. NIL: IFS LAW. OWN: WEB NIL.",
"PAD: ASK DEV. QUA: USE ASK. RIG: IFS GAP.",
"SHE: HER EYE. TMI: MAX IFS. USE: SHE EYE.",
"VOX: OWN XTC. WEB: EYE BIZ. XTC: TMI CDJ.",
"      YET: EYE TMI. ZEN: EYE NIL."];
var outputbuffer = ["","","","","","","","","","",
                    "","","","","","","","","","",
                    "","","","","","","","","","",
                    "","","","","","","","","",""];
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
      vc.fillRect(wspot,hspot,wstep,hstep);
      if(checker){fill(0);}
      else{fill(1);}
      if(row===0){if(square)vc.fillText(letters[square-1],wspot,hspot+hstep-2);}
      else {
        if(square===0){vc.fillText(letters[row-1],wspot,hspot+hstep-2);}
        else {vc.fillText(""+weights[row-1][square-1],wspot,hspot+hstep-2);}
      }
    }
  }
  fill(0);vc.fillRect(0,height/2,width,height/2);
  vc.fillRect(width/2 - wstep*2.1,0,width/2 + wstep*2.1,height/2);
  fill(1);
  var gstep=hstep*1.5;
   vc.font=""+(gstep - 2)+"px mono";
  vc.fillText(welcometext[0],wstep + width/2,gstep);
  vc.fillText(welcometext[1],wstep + width/2,gstep*2);
  vc.fillText(welcometext[2],wstep + width/2,gstep*3);
  vc.fillText(welcometext[3],wstep + width/2,gstep*4);
  vc.fillText(welcometext[4],wstep + width/2,gstep*5);
  vc.fillText(welcometext[5],wstep + width/2,gstep*6);
  vc.fillText(welcometext[6],wstep + width/2,gstep*7);
  vc.fillText(welcometext[7],wstep + width/2,gstep*8);
  vc.fillText(welcometext[8],wstep + width/2,gstep*9);
  vc.fillText(welcometext[9],wstep + width/2,gstep*10);
  vc.fillText(welcometext[10],wstep + width/2,gstep*11);
  vc.fillText(welcometext[11],wstep + width/2,gstep*12);
  vc.fillText(welcometext[12],wstep + width/2,gstep*13);
  vc.fillText(welcometext[13],wstep + width/2,gstep*14);
  vc.fillText(welcometext[14],wstep + width/2,gstep*15);
  if(battery===null)vc.fillText("loading",wstep+ width/2,gstep*17);
  else{vc.fillText("Battery: " + battery.level,wstep+ width/2,gstep*17);}
  vc.fillText(inputtext,0,gstep + height/2);
  //vc.fillText(outputtext,0,gstep*2 + height/2);
  vc.font=""+(hstep - 1)+"px mono";
  for(var line=0;line<20;line++){
    vc.fillText(outputbuffer[line],0,hstep*(line + 4) + height/2);
  }   
  for(var nextline=20;nextline<40;nextline++){
    vc.fillText(outputbuffer[nextline],width/2,hstep*(nextline-16)+height/2);
  }
  vc.font=""+(hstep - 2)+"px mono";
};
window.addEventListener("keydown",function(event){
  if(event.defaultPrevented)return;
  switch(event.keyCode){
    case 13: {
      var outputcreator = 'ASK_BIZ_CDJ_DEV_EYE_FAQ_GAP_HER_IFS_JOY_KIT_LAW_MAX_NIL_OWN_PAD_QUA_RIG_SHE_TMI_USE_VOX_WEB_XTC_YET_ZEN';
      for(var out in outputcreator){
        switch(outputcreator[out]){
          case '_':cycle(-1);break;
          case 'A':cycle(0);break;case 'B':cycle(1);break;
          case 'C':cycle(2);break;case 'D':cycle(3);break;
          case 'E':cycle(4);break;case 'F':cycle(5);break;
          case 'G':cycle(6);break;case 'H':cycle(7);break;
          case 'I':cycle(8);break;case 'J':cycle(9);break;
          case 'K':cycle(10);break;case 'L':cycle(11);break;
          case 'M':cycle(12);break;case 'N':cycle(13);break;
          case 'O':cycle(14);break;case 'P':cycle(15);break;
          case 'Q':cycle(16);break;case 'R':cycle(17);break;
          case 'S':cycle(18);break;case 'T':cycle(19);break;
          case 'U':cycle(20);break;case 'V':cycle(21);break;
          case 'W':cycle(22);break;case 'X':cycle(23);break;
          case 'Y':cycle(24);break;case 'Z':cycle(25);break;
        }
      }
      var outputsource = outputtext;
      outputtext = "";
      var gap = " ";
      var outputwords = ['ASK','BIZ','CDJ','DEV','EYE','FAQ','GAP','HER','IFS','JOY','KIT','LAW','MAX',
                      'NIL','OWN','PAD','QUA','RIG','SHE','TMI','USE','VOX','WEB','XTC','YET','ZEN'];
      for(var word in outputwords){
        if(outputsource.includes(outputwords[word])){
          outputtext+=outputwords[word]+gap;
          if(gap==" ")gap=". ";
          else gap=" ";
        }
      }
      if(gap==". "){outputtext=outputtext.trim();outputtext+="!";}
      for(var line=39;line>1;line--){
              outputbuffer[line]=outputbuffer[line-2];
      }
      outputbuffer[0]=inputtext;
      outputbuffer[1]=outputtext;
      inputtext="";outputtext="";
      } break; //ENTER
    case 187: initialize();break;//EQUALS
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
    default: break;}});
window.addEventListener("resize",resize);
window.onload = function () {initialize();resize();draw();window.navigator.getBattery().then(function(wtf){battery=wtf;});};