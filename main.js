var height=320;var width=480;
chrome.app.window.minWidth=width;
chrome.app.window.minHeight=height;
chrome.app.window.maxWidth=width;
chrome.app.window.maxHeight=height;
var canvas = document.getElementById('canvas');
var vc = canvas.getContext('2d');
var ac = new window.AudioContext();
var sr = ac.samplerate;
vc.lineWidth=1;vc.font="8px monospace";
function FBLACK(){vc.fillStyle='rgb(0,0,0)';}
function FBLUE(){vc.fillStyle='rgb(100,100,192)';}
function SBLACK(){vc.strokeStyle='rgb(0,0,0)';}
function SBLUE(){vc.strokeStyle='rgb(100,100,192)';}

var DECK = function (offset) {
  this.offset = offset;
  this.source = null;this.file = null;
  this.selected = false;this.ready=false;
  this.title = "no track loaded";
  this.position = 0;this.duration = 0;
  console.log('deck created.');
};
DECK.prototype.draw = function() {
  if(selected===this){FBLUE();SBLACK();}
  else{FBLACK();SBLUE();}
  vc.fillRect(0,this.offset,width,this.offset+100);
  vc.strokeText(this.title,10,this.offset+10);
  vc.strokeText(this.duration,10,this.offset+20);
  vc.strokeText(this.position,10,this.offset+30);
};
DECK.prototype.open = function(){
  var local = this;
  chrome.fileSystem.chooseEntry({
      type: 'openFile',
      accepts:[{mimeTypes:['audio/*']}],
      acceptsAllTypes:false},
      function(entry){
        local.title=entry.name;
        console.log(local.title);
        entry.file(
          function(file){
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend=function(){
              var audiodata=reader.result;
              ac.decodeAudioData(audiodata,
                function(buffer){
                  local.source=ac.createBufferSource();
                  local.source.buffer=buffer;
                  local.source.connect(ac.destination);
                  local.source.loop=true;
                  local.source.start(0);
                },function(e){console.log(e);});
            };
          });
      });
};

var upper = new DECK(5);
var middle = new DECK(110);
var lower = new DECK(215);
var selected = upper;

var SHIFT = function(){
  if(selected===upper){selected=lower;return;}
  if(selected===middle){selected=upper;return;}
  if(selected===lower){selected=middle;return;}
};
var CTRL = function(){
  if(selected===upper){selected=middle;return;}
  if(selected===middle){selected=lower;return;}
  if(selected===lower){selected=upper;return;}
};

var DRAW = function(){
  requestAnimationFrame(DRAW);
  FBLACK();vc.fillRect(0,0,height,width);
  upper.draw();middle.draw();lower.draw();
};  

window.addEventListener("keydown",function(event){
  if(event.defaultPrevented)return;
  if(event.keyCode==16)SHIFT();
  if(event.keyCode==17)CTRL();
  if(event.keyCode==79)selected.open();
  console.log(event.keyCode + " down, ");});
window.addEventListener("keyup",function(event){
  if(event.defaultPrevented)return;
  console.log(event.keyCode + " up, ");});
window.onload = DRAW;