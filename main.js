
var OM = function () {
  var bpm = 70;         //idk who cares
  var hitgain = 1;
  
  var anomaly = [[0,0],[0,0],[0,0],[0,0],[0,0]]; //[type][song][buffer]
  
  var identity = [                                        //[type][song][note,time,length]
                  [   //0 = DRUM BEAT (0-31)
                    [                                     //pattern 0 - kill over
                      [0,0,3],[0,3,3],[4,6,3],[4,9,1],[0,10,2],[4,12,3],[4,15,1],
                      [8,0,3],[8,3,3],[9,6,2],[8,8,2],[9,10,2],[8,12,4],
                      [0,16,3],[0,19,3],[4,22,3],[4,25,1],[0,26,2],[4,28,3],[4,31,1],
                      [8,16,3],[8,19,3],[9,22,2],[8,24,2],[9,26,2],[8,28,4]
                    ],
                    [                                     //pattern 1 - serenity
                      [0,0,4],[0,4,4],[4,8,3],[4,11,3],[4,14,4],[0,18,3],[0,21,1],[0,22,2],[4,24,6],[4,30,1],[4,31,1],
                      [8,0,4],[8,4,2],[9,6,2],[8,8,8],[8,16,4],[8,20,2],[9,22,2],[8,24,8]
                    ]
                  ],
                  [   //1 = DRUM FILL (0-15)
                    [                                     //pattern 0 - kill over
                      [4,0,1],[0,1,2],[0,3,1],[4,4,2],[4,6,1],[0,7,2],[0,9,1],[4,10,2],[4,12,1],[0,13,2],[0,15,1],
                      [8,0,3],[8,3,3],[9,6,1],[8,7,2],[9,9,1],[8,10,2],[9,12,1],[8,13,3]
                    ],
                    [                                     //pattern 1 - serenity 
                      [0,0,3],[0,3,1],[4,4,4],[0,7,3],[0,10,2],[4,12,4],
                      [8,0,2],[9,2,2],[8,4,6],[9,10,2],[8,12,4]
                    ]
                  ],
                  [   //2 = KEYBOARD LEFT HAND (0-63)
                    [                                     //pattern 0 - kill over
                      [71,0,3],[83,3,3],[71,6,3],[78,9,3],[71,10,2],[71,12,2],[78,14,2],
                      [86,16,2],[90,19,2],[83,22,2],[79,24,2],[74,27,2],[86,30,2],
                      [90,32,2],[91,34,2],[83,36,2],[74,39,2],[78,42,2],[83,44,2],[86,46,2],
                      [81,48,2],[76,50,2],[85,52,2],[88,55,2],[93,58,2],[81,60,2],[76,62,2],
                    ],
                    [                                     //pattern 1 - serenity
                      [38,0,3],[38,4,3],[38,10,3],[37,14,3],[37,18,3],[37,22,2],[40,24,3],[37,28,3],
                      [35,0,3],[35,4,3],[35,10,3],[33,14,3],[33,18,3],[33,22,2],[37,24,3],[33,28,3],
                      [35,32,3],[35,36,3],[35,42,3],[37,46,3],[37,50,3],[37,54,2],[40,56,3],[37,60,3],
                      [31,32,3],[31,36,3],[31,42,3],[33,46,3],[33,50,3],[33,54,2],[37,56,3],[33,60,3]
                    ]
                  ],
                  [   //3 = KEYBOARD RIGHT HAND (0-128)
                    [                                     //pattern 0 - kill over
                      [83,0,4],[90,4,2],[78,6,3],[74,9,3],[83,12,4],
                      [90,16,3],[86,19,3],[83,21,1],[90,22,2],[78,24,2],[74,26,2],[83,28,4],
                      [88,32,2],[86,34,1],[85,35,1],[83,37,1],[90,38,2],[86,40,4],[88,44,1],[86,45,1],[85,46,1],
                      [86,48,1],[85,49,1],[83,50,1],[85,52,1],[83,53,1],[81,54,1],[83,56,8],
                      [78,64,4],[90,68,2],[98,70,3],[88,73,3],[97,76,4],
                      [88,80,3],[97,83,3],[90,86,3],[86,89,3],[95,92,4],
                      [91,96,3],[86,99,3],[95,102,2],[98,104,3],[102,107,3],[91,110,2],[90,112,3],[86,115,3],[95,118,10]
                    ],
                    [                                     //pattern 1 - serenity
                      [47,0,2],[35,2,1],[59,3,1],[54,6,1],[62,7,1],[66,9,1],[59,10,2],[62,12,2],[54,14,1],[59,15,1],
                      [54,17,1],[66,18,1],[59,20,3],[54,23,1],[62,24,1],[54,25,1],[59,26,1],[47,28,3],[47,31,1],
                      [47,32,1],[59,34,1],[50,36,4],[54,40,4],[59,44,1],[54,45,1],[47,46,1],
                      [54,48,3],[59,51,3],[62,54,4],[62,58,1],[62,59,1],[62,60,1],[62,61,1],
                      [64,64,1],[62,65,1],[61,66,1],[62,68,1],[61,69,1],[59,70,1],[61,72,1],[59,73,1],[57,74,1],[59,76,4],
                      [35,80,1],[47,81,3],[49,85,3],[50,89,3],[62,92,4],
                      [55,96,3],[57,99,3],[59,102,5],[59,108,1],[59,109,1],[59,111,1],
                      [57,112,3],[59,115,3],[61,118,2],[61,122,1],[61,123,1],[61,124,1],[61,125,1]
                    ],
                  ],
                  [   //4 = BASSLINE
                    [                                     //pattern 0 - kill over
                      [23,0,4],[23,4,4],[23,10,4],[25,14,4],[26,18,4],[28,22,4],[25,26,2],[26,28,4],
                      [19,32,4],[19,36,4],[19,42,4],[21,46,4],[23,50,4],[25,54,4],[21,58,2],[23,60,4]
                    ],
                    [                                     //pattern 1 - serenity
                      [23,0,4],[23,4,4],[23,10,4],[25,14,4],[25,18,4],[26,22,2],[28,24,2],[26,26,2],[25,28,4],
                      [19,32,4],[19,36,4],[19,42,4],[21,46,4],[21,50,4],[23,54,2],[25,56,2],[23,58,2],[21,60,4]
                    ]
                  ]
                ];
                
  var drumsamples=[];    //buffers with rendered drum (pitched) sounds
  var percsamples=[];    //buffers with rendered perc (noise) sounds
  var samplesleft;   //drums left to render
  var drumvals= [//pitched percussion sounds
                                    //high,low,bend,fade
                  [35,18,1,1],      //kickdrum
                  [42,23,2,2],      //lowtom
                  [47,30,1,1],      //midtom
                  [54,35,1/2,1/2],  //hitom
                  [59,42,1/3,1/3],  //lowsnare
                  [66,47,1/4,1/4],  //midsnare
                  [71,54,1/8,1/8],  //hisnare
                  [78,59,1/16,1/16]  //openhat
                ];
  var percvals= [//nonpitched percussion sounds
                                    //filter,fade
                  [35,1/2],         //snarenoise
                  [83,1/16],        //closedhatnoise
                  [83,1/8]         //openhatnoise
                ];
                
  var vcontext;          //HTML5 canvas
  var acontext;          //WebAudio context
  
  var steptime = 15/bpm; //sixteenth note length
  
  var nowtime;           //used by parallel hit renderers
  var notes = [];        //lookup table for note frequencies
  
  var wavnoise;          //buffer with supposedly white noise
  var samplerate;        //samples per second in audio context


  var OM = function () {
    for(var x=0;x<128;x++)notes[x]=440*Math.pow(2,(x-69)/12);console.log(notes);//generate notes, print to console because why not
    vcontext = document.getElementById('vcontext');                             //grab canvas reference from HTML
    acontext = new window.AudioContext();                                       //grab WebAudio context from browser
    samplerate = acontext.sampleRate;                                           //grab sample rate from audio context
    noiseclip = acontext.createBuffer(1,samplerate,samplerate);                 //create buffer for noise
    var noisedata = noiseclip.getChannelData(0);                                //grab reference to noise buffer data
    for(x=0;x<noisedata.length;x++)noisedata[x]=Math.random()*2 - 1;            //randomize contents
    samplesleft = drumvals.length + percvals.length;                            //count how many samples need rendering
    var drumcallback = function (indexcalled) {                                 //create function for drumsample callbacks
          return function(outputclip){
            drumsamples[indexcalled]=outputclip;
            samplesleft--;console.log(samplesleft);
            if(samplesleft===0)renderanomaly();
          };
    };
    for(var drumindex=0;drumindex<drumvals.length;drumindex++){                   //create each drum sample
      var drumnode=drumvals[drumindex];
      var drumhigh=notes[drumnode[0]];                                     //initial pitch
      var drumlow=notes[drumnode[1]];                                      //final pitch
      var drumbend=steptime * drumnode[2];                                 //pitchdown time
      var drumfade=steptime * drumnode[3];                                 //fadeout time
      var drumcontext=new OfflineAudioContext(1,samplerate*drumfade*8,samplerate);    //spawn a buffer generator
      var drumosc=drumcontext.createOscillator();                                     //spawn an oscillator
      var drumgain=drumcontext.createGain();                                          //spawn a volume node
      drumgain.gain.setValueAtTime(1,0);                                              //set initial volume
      drumgain.gain.setTargetAtTime(0,0,drumfade);                                    //set fadeout
      drumosc.frequency.value=drumhigh;                                               //set initial pitch
      drumosc.frequency.setTargetAtTime(drumlow,0,drumbend);                          //set final pitch
      drumosc.connect(drumgain);drumgain.connect(drumcontext.destination);            //connect the dots
      drumosc.start(0);drumosc.stop(drumfade*8);                                      //set endpoints for oscillator
      drumcontext.startRendering().then(drumcallback(drumindex));                     //link to drum bank when finished
    }
    var perccallback = function (indexcalled) {                                 //create linking callback generator
      return function(outputclip){
        percsamples[indexcalled]=outputclip;
            samplesleft--;console.log(samplesleft);
            if(samplesleft===0)renderanomaly();};        
    };
    for(var percindex=0;percindex<percvals.length;percindex++){                   //create each perc sample
        var percnote=notes[percvals[percindex][0]];                                   //filter pitch
        var percfade=steptime*percvals[percindex][1];                                 //fade time
        var perccontext=new OfflineAudioContext(1,samplerate*percfade*8,samplerate);  //spawn a buffer generator
        var percnoise=perccontext.createBufferSource();                               //spawn a buffer node
        percnoise.buffer=noiseclip;                                                   //link noise to buffer node
        var percgain=perccontext.createGain();                                        //spawn a volume node
        var percfilter=perccontext.createBiquadFilter();                              //spawn a filter node
        percfilter.type="highpass";                                                   //set to highpass filter
        percfilter.frequency.value=percnote;                                          //set frequency of filter
        percgain.gain.setValueAtTime(1,0);                                            //set initial volume
        percgain.gain.setTargetAtTime(0,0,percfade);                                  //set fadeout time
        percnoise.connect(percgain);percgain.connect(percfilter);                     //connect the dots
        percfilter.connect(perccontext.destination);                                  //connect to renderer
        percnoise.start(0);percnoise.stop(percfade*8);                                //set buffer playback
        perccontext.startRendering().then(perccallback(percindex));                             //link to perc bank when finished
    }
  };
  
  var renderanomaly = function(){
    var typeindex;                                                              //create type index for anomaly bank
    var songindex;                                                              //create song index for anomaly bank
    var anomalycallback = function (typecalled,songcalled) {                    //create anomaly linker callback generator
      return function(outputclip){
        console.log(anomaly);
        anomaly[typecalled][songcalled]=outputclip;};
    };
    for(songindex=0;songindex<2;songindex++){
      var pattern;
      for(typeindex=0;typeindex<5;typeindex++){
        pattern = identity[typeindex][songindex];                                        //grab current pattern to render
        switch(typeindex){
          case 0: 
          case 1: { //DRUMBEAT+DRUMFILL
            var dbsteps=32;
            if(typeindex===0)dbsteps=64;
            var dbcontext=new OfflineAudioContext(1,samplerate*steptime*dbsteps,samplerate);  //create drumbeat anomaly renderer
            for(var dbindex=0;dbindex<pattern.length;dbindex++){                       //schedule buffers at each note
              var dbnote=pattern[dbindex];                                                      //grab current note
              switch(dbnote[0]){                                                                //check what note to play
                case 0:{                                                                        //if note is kick:
                  var dbkick=dbcontext.createBufferSource();                                      //create kick node
                  dbkick.buffer=drumsamples[0];dbkick.connect(dbcontext.destination);             //connect the dots
                  dbkick.start(steptime*dbnote[1]);dbkick.stop(steptime*(dbnote[1]+dbnote[2]));   //schedule kick sound                     
                } break;
                case 4:{                                                                        //if note is snare:
                  var dbdrum=dbcontext.createBufferSource();                                      //create snare drum node
                  var dbperc=dbcontext.createBufferSource();                                      //create snare perc node
                  dbdrum.buffer=drumsamples[4];dbperc.buffer=percsamples[0];                      //connect the buffers
                  dbdrum.connect(dbcontext.destination);dbperc.connect(dbcontext.destination);    //connect the dots
                  dbdrum.start(steptime*dbnote[1]);dbdrum.stop(steptime*(dbnote[1]+dbnote[2]));   //schedule drum sound
                  dbperc.start(steptime*dbnote[1]);dbdrum.stop(steptime*(dbnote[1]+dbnote[2]));   //schedule perc sound
                } break;
                case 8:
                case 9:{                                                                        //if note is hihat:
                  var dbhihat=dbcontext.createBufferSource();                                     //create hihat node
                  if(dbnote[0]==8)dbhihat.buffer=percsamples[1];                                  //if closed, set closed hihat
                  else dbhihat.buffer=percsamples[2];                                             //otherwise, set open hihat
                  dbhihat.connect(dbcontext.destination);                                         //connect the dots
                  if(dbnote[0]==8)dbhihat.loop = true;
                  dbhihat.start(steptime*dbnote[1]);
                  dbhihat.stop(steptime*(dbnote[1]+dbnote[2])); //schedule hihat sound
                } break;
                default:break;
              }
            }
            dbcontext.startRendering().then(anomalycallback(typeindex,songindex));
          } break;
          case 2: //LEFTHAND
          case 3: //RIGHTHAND
          case 4: { //BASSLINE
            var squaresteps=64;
            if(typeindex==3)squaresteps=128;
            squarecontext=new OfflineAudioContext(1,samplerate*steptime*squaresteps,samplerate);
            for(var squareindex=0;squareindex<pattern.length;squareindex++){
              squarenote = pattern[squareindex];
              squareosc = squarecontext.createOscillator();
              squaregain = squarecontext.createGain();squaregain.gain.value=0.25;
              squareosc.type = "square";squareosc.connect(squaregain);
              squaregain.connect(squarecontext.destination);
              squareosc.frequency.value = notes[squarenote[0]];
              squareosc.start(steptime*squarenote[1]);
              squareosc.stop(steptime*(squarenote[1]+squarenote[2]));
            }
            squarecontext.startRendering().then(anomalycallback(typeindex,songindex));
          } break;
          default:break;
        }
      }
    }
    OM.listen();
  };
  
  OM.hit = function(hittime,sourceclip){
    var hitclip=acontext.createBufferSource();
    hitclip.buffer=sourceclip;
    var gain=acontext.createGain();gain.gain.value=hitgain;
    var delay=acontext.createDelay(steptime*32);
    var feedback=acontext.createGain();feedback.gain.value=1/3;
    
    delay.delayTime.value=(steptime*3);
    hitclip.connect(delay);
    delay.connect(feedback);feedback.connect(delay);delay.connect(acontext.destination);
    hitclip.connect(gain);gain.connect(acontext.destination);
    hitclip.start(hittime);
  };
  OM.prevent = function (eX){eX.preventDefault();};
  OM.listen = function () {
    document.body.addEventListener('touchmove',OM.prevent,false);
    vcontext.addEventListener('mousedown',OM.playscene);
    vcontext.addEventListener('touchstart',OM.playscene);
  };
  OM.playscene = function (eX){
    nowtime=acontext.currentTime;
    OM.hit(nowtime,anomaly[0][1]);
    OM.hit(nowtime+64*steptime,anomaly[0][1]);
    //OM.hit(nowtime+96*steptime,anomaly[1][1]);
    OM.hit(nowtime,anomaly[2][0]);
    OM.hit(nowtime+(64*steptime),anomaly[2][0]);
    OM.hit(nowtime,anomaly[3][1]);
    OM.hit(nowtime,anomaly[2][0]);
    OM.hit(nowtime+(64*steptime),anomaly[2][0]);
    OM.hit(nowtime,anomaly[3][1]);
    OM.hit(nowtime,anomaly[3][0]);
    //OM.hit(nowtime,anomaly[4][1]);
    //OM.hit(nowtime+(64*steptime),anomaly[4][1]);
    
  };
  return OM;
}();
window.onload = function() {
  var om = new OM();
};