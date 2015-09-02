
var OM = function () {
  var anomaly; //ideal form
  var identity = [//instruments with patterns
                  [ //instrument 0
                    [//pattern 0
                      [71,0,3],[83,3,3],[71,6,3],[78,9,3],[71,10,2],[71,12,2],[78,14,2],
                      [86,16,2],[90,19,2],[83,22,2],[79,24,2],[74,27,2],[86,30,2],
                      [90,32,2],[91,34,2],[83,36,2],[74,39,2],[78,42,2],[83,44,2],[86,46,2],
                      [81,48,2],[76,50,2],[85,52,2],[88,55,2],[93,58,2],[81,60,2],[76,62,2],
                    ]
                  ],
                  [//instrument 1
                    [//pattern 0
                      [83,0,4],[90,4,2],[78,6,3],[74,9,3],[83,12,4],
                      [90,16,3],[86,19,3],[83,21,1],[90,22,2],[78,24,2],[74,26,2],[83,28,4],
                      [88,32,2],[86,34,1],[85,35,1],[83,37,1],[90,38,2],[86,40,4],[88,44,1],[86,45,1],[85,46,1],
                      [86,48,1],[85,49,1],[83,50,1],[85,52,1],[83,53,1],[81,54,1],[83,56,8],
                      [78,64,4],[90,68,2],[98,70,3],[88,73,3],[97,76,4],
                      [88,80,3],[97,83,3],[90,86,3],[86,89,3],[95,92,4],
                      [91,96,3],[86,99,3],[95,102,2],[98,104,3],[102,107,3],[91,110,2],[90,112,3],[86,115,3],[95,118,10]
                    ]
                  ]
                ];
                
  var vcontext;
  var acontext;
  var bpm = 140;
  var steptime = 15/bpm;
  var hitgain = 4;
  var nowtime;
  var notes = [];
  var wavnoise;
  var samplerate;
  var kick=[];
  var perc=[];
  var melodic;
  var counterpoint;
  var kickvals=[];
  var percvals=[];

  var OM = function () {
    for(var x=0;x<128;x++)notes[x]=440*Math.pow(2,(x-69)/12);
    console.log(notes);
    vcontext = document.getElementById('vcontext');
    acontext = new window.AudioContext();
    samplerate = acontext.sampleRate;
    nowtime = acontext.currentTime;
    kickvals=[  [35,2,18,2],
                [66,1/8,47,1/8]];
    percvals=[  [83,1/8],
                [83,1/16],
                [35,1/2]];
    wavnoise = acontext.createBuffer(1,samplerate,samplerate);
    var wavdata = wavnoise.getChannelData(0);
    for(x=0;x<wavdata.length;x++)wavdata[x]=Math.random()*2 - 1;
    for(x=0;x<2;x++)OM.kickset(x);
    for(x=0;x<3;x++)OM.percset(x);
    OM.melodyset();
    OM.counterset();
    OM.listen();
  };
  OM.kickset = function (index){
    target=kickvals[index];
    var oscmax=notes[target[0]];
    var gaindrop=steptime * target[1];
    var oscmin=notes[target[2]];
    var oscdrop=steptime * target[3];
    var timespan=gaindrop * 6;
    var wavspan=samplerate * timespan;
    var wavcontext=new OfflineAudioContext(1,wavspan,samplerate);
    var osc=wavcontext.createOscillator();
    var gain=wavcontext.createGain();
    gain.gain.setValueAtTime(1/2,0);
    gain.gain.setTargetAtTime(0,0,gaindrop);
    osc.frequency.value=oscmax;
    osc.frequency.setTargetAtTime(oscmin,0,oscdrop);
    osc.connect(gain);gain.connect(wavcontext.destination);
    osc.start(0);osc.stop(timespan);
    wavcontext.startRendering().then(function(wavout){
      kick[index]=wavout;});
  };
  OM.percset = function (index){
    var target=percvals[index];
    var frequency=notes[target[0]];
    var gaindrop=steptime * target[1];
    var timespan=gaindrop*6;
    var wavspan=samplerate*timespan;
    var wavcontext=new OfflineAudioContext(1,wavspan,samplerate);
    var noise=wavcontext.createBufferSource();
    noise.buffer=wavnoise;
    var gain=wavcontext.createGain();
    var highpass=wavcontext.createBiquadFilter();
    highpass.type="highpass";
    highpass.frequency.value=frequency;
    gain.gain.setValueAtTime(1/8,0);
    gain.gain.setTargetAtTime(0,0,gaindrop);
    noise.connect(gain);gain.connect(highpass);
    highpass.connect(wavcontext.destination);
    noise.start(0);noise.stop(timespan);
    wavcontext.startRendering().then(function(wavout){
      perc[index]=wavout;});
  };
  OM.square = function(index,steps,length,wavcontext){
    var osc = wavcontext.createOscillator();
    osc.frequency.value = notes[index];
    osc.type = "square";
    osc.connect(wavcontext.destination);
    osc.start(steptime*steps);osc.stop((steptime*steps)+timespan);
  };
  OM.sixteenset = function(){
    var thispattern = identity[1][pattern];
    var thistime = steptime*64;
    var thiscontext = new OfflineAudioContext(1,thistime,samplerate);
    for(var x=0;x<thispattern.length();x++)
      OM.square(thispattern[0],thispattern[1],thispattern[2],thiscontext);
    thiscontext.startRendering().then(function(wavout){sixteen=wavout;});
  };
  OM.thirtytwoset = function(){
    var thispattern = identity[2][pattern];
    var thistime = steptime*64;
    var thiscontext = new OfflineAudioContext(1,thistime,samplerate);
    for(var x=0;x<thispattern.length();x++)
      OM.square(thispattern[0],thispattern[1],thispattern[2],thiscontext);
    thiscontext.startRendering().then(function(wavout){thirtytwo=wavout;});
  };
  OM.hit = function(steps,wavout){
    var offset = nowtime+steps*steptime;
    var sample = acontext.createBufferSource();
    sample.buffer = wavout;
    var gain = acontext.createGain();
    gain.gain.value = hitgain;
    sample.connect(gain);
    gain.connect(acontext.destination);
    sample.start(offset);
  };
  OM.prevent = function (eX){eX.preventDefault();};
  OM.listen = function () {
    document.body.addEventListener('touchmove',OM.prevent,false);
    vcontext.addEventListener('mousedown',OM.playscene);
    vcontext.addEventListener('touchstart',OM.playscene);
  };
  OM.playscene = function (eX){
    nowtime=acontext.currentTime;
    //FOUR BAR MELODY
    if(Math.random() > 0.2){
    OM.hit(0,melodic);
    OM.hit(64,melodic);}
    //EIGHT BAR COUNTERPOINT
    if(Math.random() > 0.2)
    OM.hit(0,counterpoint);
    //ONE BAR DRUM PATTERN
    if(Math.random() > 0.5)
    //if(false)
    for(var count=0;count<8;count++){
      //KICK+SNARE LAYER
      OM.hit(0,kick[0]);
      OM.hit(3,kick[0]);
      OM.hit(6,kick[1]);OM.hit(6,perc[0]);
      OM.hit(9,kick[1]);OM.hit(9,perc[0]);
      OM.hit(10,kick[0]);
      OM.hit(12,kick[1]);OM.hit(12,perc[0]);
      OM.hit(15,kick[1]);OM.hit(15,perc[0]);
      //CLOSED+OPEN HIHAT LAYER
      for(x=0;x<16;x+=1)
      OM.hit(x,perc[1]);
      OM.hit(6,perc[2]);
      OM.hit(10,perc[2]);
      OM.hit(15,perc[2]);
      //MOVE FORWARD ONE BAR
      nowtime+=steptime*16;
    }
  };
  return OM;
}();
window.onload = function() {
  var om = new OM();
};