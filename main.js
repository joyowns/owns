var height=320;var width=480;
chrome.app.window.minWidth=width;
chrome.app.window.minHeight=height;
chrome.app.window.maxWidth=width;
chrome.app.window.maxHeight=height;
var canvas = document.getElementById('canvas');
var vc = canvas.getContext('2d');
var ac = new window.AudioContext();
var sr = ac.samplerate;
var tempo=120;
var steptime = 15 / tempo;
var stretch = tempo / 140;
var factor = Math.pow(2,1/12);
function settempo(x){
  tempo=x;steptime=15/tempo;
  stretch=tempo/140;
}
var pulse = 0;
var alt=false;
vc.lineWidth=1;vc.font="20px mono";
function FBLACK(){vc.fillStyle='rgb(0,0,0)';}
function SBLACK(){vc.strokeStyle='rgb(0,0,0)';}
function SBLUE(){vc.strokeStyle='rgb(100,100,192)';}
function FBLUE(){vc.fillStyle='rgb(100,100,192)';}
function FPULSE(){
  vc.fillStyle='rgb('+
                33*pulse+','+
                33*pulse+','+
                (100+pulse*32) + ')';}

var DECK = function (offset) {
  this.offset = offset;this.play=false;
  this.transpose = 1;
  this.buffer = null;this.file = null;
  this.selected = false;this.ready=false;
  this.title = "no track loaded";
  this.position = 0;this.duration = 0;
};
var upper = new DECK(0);
var middle = new DECK(105);
var lower = new DECK(215);

var selected = upper;
DECK.prototype.draw = function() {
  if(selected===this){FPULSE();SBLACK();}
  else{FBLACK();SBLUE();}
  vc.fillRect(0,this.offset,width,this.offset+100);
  if(selected===this){FBLACK();SBLACK();}
  else{FBLUE();SBLUE();}
  vc.strokeText(this.title,20,this.offset+25);
  vc.strokeText("#/b " + this.transpose,
                20,this.offset+50);
  vc.strokeText("<--> " + stretch,
                20,this.offset+70);
};
DECK.prototype.playstep = function(now){
  var step = ac.createBufferSource();
  var gain = ac.createGain();
  var buffertime=this.position*stretch;
  gain.gain.setValueAtTime(0.0001,now);
  gain.gain.linearRampToValueAtTime(1.0,
              now+steptime);
  gain.gain.linearRampToValueAtTime(0.0001,
              now+steptime*2);
  step.buffer=this.buffer;
  step.loop=true;
  step.loopStart=buffertime+steptime;
  step.loopEnd=buffertime+2*steptime;
  step.connect(gain);gain.connect(ac.destination);
  step.playbackRate.value=this.transpose;
  step.start(now,
            buffertime,
            steptime*2);
  this.position+=steptime*stretch;
};
DECK.prototype.open = function(){
  var local = this;
  chrome.fileSystem.chooseEntry({
      type: 'openFile',
      accepts:[{mimeTypes:['audio/*']}],
      acceptsAllTypes:false},
      function(entry){
        local.title="loading...";
        entry.file(
          function(file){
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend=function(){
              var audiodata=reader.result;
              ac.decodeAudioData(audiodata,
                function(buffer){
                  local.title=entry.name;
                  local.buffer=buffer;
                  local.play=true;
                  local.transpose=1;
                  local.position=0;
                  local.duration=(buffer.length)/sr;
                  pulse=3;
                },
                function(e){console.log(e);});
            };
          });
      });
};
var PULSE = function(){
  var now=ac.currentTime;
  if(upper.play)upper.playstep(now);
  if(middle.play)middle.playstep(now);
  if(lower.play)lower.playstep(now);
  pulse--;if(pulse<0)pulse=3;
};
var PITCH = function(){
  if(alt)selected.transpose/=factor;
  else selected.transpose*=factor;
};
var NUDGE = function(){
  if(alt)selected.position-=steptime*selected.stretch;
  else selected.position+=steptime*selected.stretch;
  if(selected.position<0)selected.position=0;
};
var STRETCH = function(){
  if(alt)settempo(tempo-1);
  else settempo(tempo+1);
};
var DRAW = function(){
  requestAnimationFrame(DRAW);
  FBLACK();vc.fillRect(0,0,width,height);
  upper.draw();middle.draw();lower.draw();
};

window.addEventListener("keydown",function(event){
  if(event.defaultPrevented)return;
  if(event.keyCode==9)selected=upper;
  if(event.keyCode==16)selected=middle;
  if(event.keyCode==17)selected=lower;
  if(event.keyCode==18)alt=true;
  if(event.keyCode==66)STRETCH();//b for beat
  if(event.keyCode==78)PITCH();//n for note
  if(event.keyCode==86)NUDGE();//v for vendetta
  if(event.keyCode==79)selected.open();
  console.log(event.keyCode + " down, ");
  });
window.addEventListener("keyup",function(event){
  if(event.defaultPrevented)return;
  if(event.keyCode==18)alt=false;
  //console.log(event.keyCode + " up, ");
  });
window.onload = DRAW;
window.setInterval(PULSE,steptime*1000);