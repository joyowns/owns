var height=320;var width=480;
/*chrome.app.window.minWidth=width;
chrome.app.window.minHeight=height;
chrome.app.window.maxWidth=width;
chrome.app.window.maxHeight=height;*/
var canvas = document.getElementById('canvas');
var vc = canvas.getContext('2d');
var ac = new window.AudioContext();
var sr = ac.samplerate;
var tempo=140;
var steptime = 15 / tempo;
var stretch = tempo / 140;
var transpose = 1;
var factor = Math.pow(2,1/12);
var pulseinterval;
function settempo(x){
  window.clearInterval(pulseinterval);
  tempo=x;steptime=15/tempo;
  stretch=tempo/140;
  pulseinterval=window.setInterval(PULSE,steptime*1000);
}
var pulse = 0;
var alt=false;
vc.lineWidth=1;vc.font="20px moono";
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
var keyval = 0;
var selected = upper;
DECK.prototype.draw = function() {
  if(selected===this){FPULSE();SBLACK();}
  else{FBLACK();SBLUE();}
  vc.fillRect(0,this.offset,width,this.offset+100);
  if(selected===this){FBLACK();SBLACK();}
  else{FBLUE();SBLUE();}
  vc.strokeText(this.title,20,this.offset+25);
  vc.strokeText("#/b " + transpose,
                20,this.offset+50);
  vc.strokeText("<--> " + stretch,
                20,this.offset+70);
  //vc.strokeText("key:"+keyval,360,this.offset+50);
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
  step.playbackRate.value=transpose;
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
  if(alt)transpose/=factor;
  else transpose*=factor;
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
var DROPIT = function(){
  selected.position=600;
};
window.addEventListener("keydown",function(event){
  if(event.defaultPrevented)return;
  if(event.keyCode==9){selected=upper;upper.position=0;}
  if(event.keyCode==16){selected=middle;middle.position=0;}
  if(event.keyCode==17){selected=lower;lower.position=0;}
  if(event.keyCode==18)alt=true;
  if(event.keyCode==66)STRETCH();//b for beat
  if(event.keyCode==78)PITCH();//n for note
  if(event.keyCode==79)selected.open();
  if(event.keyCode==80)DROPIT();
  keyval = event.KeyCode;
  console.log(event.keyCode + " down, ");
  });
window.addEventListener("keyup",function(event){
  if(event.defaultPrevented)return;
  if(event.keyCode==18)alt=false;
  //console.log(event.keyCode + " up, ");
  });
window.onload = DRAW;
pulseinterval = window.setInterval(PULSE,steptime*1000);