(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"generator_fraz_promo_atlas_1", frames: [[422,1528,453,454],[1123,634,420,588],[0,1528,420,517],[1123,1224,791,302],[1545,634,420,588],[1423,1528,420,446],[1123,0,659,632],[877,1528,544,372],[0,0,1121,1500]]},
		{name:"generator_fraz_promo_atlas_2", frames: [[890,566,21,41],[677,566,63,59],[1834,497,45,41],[858,598,18,29],[1203,633,93,93],[1081,633,120,120],[1298,633,93,93],[1277,1653,420,92],[1457,0,558,248],[693,193,717,189],[271,384,729,180],[0,1534,420,21],[1412,193,42,44],[942,566,27,27],[0,1369,420,163],[1081,804,420,234],[913,566,27,28],[1412,250,420,305],[971,566,26,27],[271,0,420,376],[942,595,20,34],[2038,140,7,7],[2036,232,12,39],[2004,497,32,37],[832,566,24,39],[913,596,25,27],[2017,232,13,4],[775,566,27,40],[119,645,11,36],[64,645,18,37],[2036,273,12,39],[1881,497,39,39],[858,566,30,30],[804,566,26,37],[2038,149,7,7],[964,595,26,26],[99,645,18,27],[1922,497,39,39],[1963,497,39,38],[1894,1035,126,344],[1277,1529,436,122],[0,1616,436,122],[742,566,31,38],[1411,557,405,245],[271,566,404,245],[1002,384,407,247],[1180,1282,337,245],[677,633,402,245],[397,880,399,240],[729,1285,303,245],[0,813,395,245],[0,1060,369,245],[1180,1040,283,240],[371,1122,356,245],[1519,1282,321,245],[422,1369,262,245],[798,1040,380,243],[1503,1035,389,245],[1877,1622,48,175],[1813,1622,62,194],[0,645,37,154],[1034,1529,241,241],[596,1616,79,210],[1715,1529,96,218],[1818,557,220,245],[876,1532,156,241],[0,0,269,643],[1834,250,200,245],[693,0,762,191],[39,645,23,114],[1034,1285,136,237],[438,1616,156,241],[1503,804,424,229],[2017,0,28,138],[686,1532,188,213],[1929,804,116,227],[1393,633,16,74],[84,645,13,41],[2017,140,19,90],[1842,1381,178,239],[2036,314,12,25],[2017,238,11,1]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_92 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_133 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_136 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_138 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.slider_gb1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.VectorSmartObject1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.Layer0copy_1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.slider_gb = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_2"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_140 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(img.CachedBmp_48);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4537,1527);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.znaniya = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(-81,-28.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.znaniya, new cjs.Rectangle(-81,-28.8,395.5,151), null);


(lib.uhodit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-81,0,0.4125,0.4125);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.uhodit, new cjs.Rectangle(-81,0,230.2,102.3), null);


(lib.propadaut = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_96();
	this.instance.setTransform(-81,-10,0.4125,0.4125);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.propadaut, new cjs.Rectangle(-81,-10,295.8,78), null);


(lib.angliiskiy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(-81,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.angliiskiy, new cjs.Rectangle(-81,0,364.5,90), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Layer0copy_1();
	this.instance.setTransform(0,0,0.6894,0.6894);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,292.3,157.9), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.VectorSmartObject1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,762,191), null);


(lib.soundon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(11.8,3.6,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_92();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.soundon, new cjs.Rectangle(0,0,20.8,20.5), null);


(lib.soundoff = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_90();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.soundoff, new cjs.Rectangle(0,0,22.5,20.5), null);


(lib.repeatsymbol = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.repeatsymbol, new cjs.Rectangle(0,0,226.5,227), null);


(lib.play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_85();
	this.instance.setTransform(0.05,-0.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.play, new cjs.Rectangle(0.1,0,46.5,46.5), null);


(lib.pause = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_83();
	this.instance.setTransform(0.05,-0.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pause, new cjs.Rectangle(0.1,0,46.5,46.5), null);


(lib.maskenglandface2psd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slider_gb
	this.instance = new lib.slider_gb();
	this.instance.setTransform(96,131);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(96,131,188,213);


(lib.ushelpoangliyski = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("ушел  ...", "bold 96px 'Arial Black'", "#21357E");
	this.text.textAlign = "center";
	this.text.lineHeight = 137;
	this.text.lineWidth = 681;
	this.text.parent = this;
	this.text.setTransform(103.35,-36.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239,-38.6,684.8,139.4);


(lib.uderzhi = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("удержи", "bold 94px 'Arial Black'", "#860019");
	this.text.lineHeight = 135;
	this.text.lineWidth = 413;
	this.text.parent = this;
	this.text.setTransform(-20.65,-10.5);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.uderzhi, new cjs.Rectangle(-22.6,-12.5,416.5,160.5), null);


(lib.svoi = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("свой", "bold 91px 'Arial Black'", "#B40025");
	this.text.lineHeight = 130;
	this.text.lineWidth = 247;
	this.text.parent = this;
	this.text.setTransform(-9,-39.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.svoi, new cjs.Rectangle(-11,-41.2,251,137.10000000000002), null);


(lib.relativepronouns = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("relative pronouns", "bold 72px 'Arial Black'", "#152874");
	this.text.lineHeight = 104;
	this.text.lineWidth = 689;
	this.text.parent = this;
	this.text.setTransform(-53,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.relativepronouns, new cjs.Rectangle(-55,0,693,122.5), null);


(lib.presentperfect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("present perfect", "bold 70px 'Arial Black'", "#152874");
	this.text.lineHeight = 101;
	this.text.lineWidth = 594;
	this.text.parent = this;
	this.text.setTransform(-47.15,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.presentperfect, new cjs.Rectangle(-49.1,0,597.9,119.7), null);


(lib.poangliyski = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("по-английски", "bold 85px 'Arial Black'", "#152874");
	this.text.textAlign = "center";
	this.text.lineHeight = 122;
	this.text.lineWidth = 682;
	this.text.parent = this;
	this.text.setTransform(94,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248.9,0,685.9,139.4);


(lib.pastcontinuous = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("past continuous", "bold 66px 'Arial Black'", "#152874");
	this.text.lineHeight = 95;
	this.text.lineWidth = 585;
	this.text.parent = this;
	this.text.setTransform(2,-11.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pastcontinuous, new cjs.Rectangle(0,-13.7,589,112.60000000000001), null);


(lib.indirectquestions = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("indirect questions", "bold 95px 'Arial Black'", "#152874");
	this.text.lineHeight = 136;
	this.text.lineWidth = 940;
	this.text.parent = this;
	this.text.setTransform(-264.6,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.indirectquestions, new cjs.Rectangle(-266.6,0,944.2,152.1), null);


(lib.generatorfraz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("ГЕНЕРАТОР ФРАЗ", "bold 72px 'Arial Black'", "#AC0020");
	this.text.textAlign = "center";
	this.text.lineHeight = 104;
	this.text.lineWidth = 764;
	this.text.parent = this;
	this.text.setTransform(-340.1,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.generatorfraz, new cjs.Rectangle(-724.2,0,768.2,105.6), null);


(lib.futuresimple = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("future simple", "bold 72px 'Arial Black'", "#152874");
	this.text.lineHeight = 104;
	this.text.lineWidth = 524;
	this.text.parent = this;
	this.text.setTransform(-9.15,46.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.futuresimple, new cjs.Rectangle(-11.1,44.6,528.1,119.70000000000002), null);


(lib.esliangliyskiy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("если английский", "bold 96px 'Arial Black'", "#2A3E85");
	this.text.textAlign = "center";
	this.text.lineHeight = 137;
	this.text.lineWidth = 1024;
	this.text.parent = this;
	this.text.setTransform(514.1,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1028.3,139.4);


(lib.contractedforms = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("contracted forms", "bold 70px 'Arial Black'", "#152874");
	this.text.lineHeight = 101;
	this.text.lineWidth = 679;
	this.text.parent = this;
	this.text.setTransform(-161,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.contractedforms, new cjs.Rectangle(-163,0,683.1,120.1), null);


(lib.auxiliaryverbs = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("auxiliary verbs", "bold 74px 'Arial Black'", "#152874");
	this.text.lineHeight = 106;
	this.text.lineWidth = 611;
	this.text.parent = this;
	this.text.setTransform(2,-25.4);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.auxiliaryverbs, new cjs.Rectangle(0,-27.4,614.6,126.30000000000001), null);


(lib.angliyskiy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("английский", "bold 91px 'Arial Black'", "#860019");
	this.text.lineHeight = 130;
	this.text.lineWidth = 620;
	this.text.parent = this;
	this.text.setTransform(2,-36.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.angliyskiy, new cjs.Rectangle(0,-38.5,624,146.6), null);


(lib.steps = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.right = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slider_gb
	this.instance = new lib.slider_gb1();
	this.instance.setTransform(126.75,70.4,1,1,3.9917);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.right, new cjs.Rectangle(82,70.4,313.1,660.2), null);


(lib.face_vs_brain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Vector_Smart_Object
	this.instance = new lib.VectorSmartObject1();
	this.instance.setTransform(45,151);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.face_vs_brain, new cjs.Rectangle(45,151,762,191), null);


(lib.circletextswf = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// text
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(324.5,33.9,0.3336,0.3336);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(317.7,28.9,0.3336,0.3336);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(311.1,24.45,0.3336,0.3336);

	this.instance_3 = new lib.CachedBmp_69();
	this.instance_3.setTransform(307.05,27.25,0.3336,0.3336);

	this.instance_4 = new lib.CachedBmp_68();
	this.instance_4.setTransform(303.05,16.65,0.3336,0.3336);

	this.instance_5 = new lib.CachedBmp_67();
	this.instance_5.setTransform(293.9,14.9,0.3336,0.3336);

	this.instance_6 = new lib.CachedBmp_66();
	this.instance_6.setTransform(289.35,8.6,0.3336,0.3336);

	this.instance_7 = new lib.CachedBmp_65();
	this.instance_7.setTransform(279.2,9.65,0.3336,0.3336);

	this.instance_8 = new lib.CachedBmp_64();
	this.instance_8.setTransform(270.85,6.65,0.3336,0.3336);

	this.instance_9 = new lib.CachedBmp_63();
	this.instance_9.setTransform(268.1,2.05,0.3336,0.3336);

	this.instance_10 = new lib.CachedBmp_62();
	this.instance_10.setTransform(258.45,4.75,0.3336,0.3336);

	this.instance_11 = new lib.CachedBmp_61();
	this.instance_11.setTransform(248.3,3.7,0.3336,0.3336);

	this.instance_12 = new lib.CachedBmp_60();
	this.instance_12.setTransform(242.4,6.9,0.3336,0.3336);

	this.instance_13 = new lib.CachedBmp_59();
	this.instance_13.setTransform(232.65,0,0.3336,0.3336);

	this.instance_14 = new lib.CachedBmp_58();
	this.instance_14.setTransform(225.35,4.45,0.3336,0.3336);

	this.instance_15 = new lib.CachedBmp_57();
	this.instance_15.setTransform(220.35,2.15,0.3336,0.3336);

	this.instance_16 = new lib.CachedBmp_56();
	this.instance_16.setTransform(215.85,2.25,0.3336,0.3336);

	this.instance_17 = new lib.CachedBmp_55();
	this.instance_17.setTransform(206.95,7.1,0.3336,0.3336);

	this.instance_18 = new lib.CachedBmp_54();
	this.instance_18.setTransform(196.6,10.35,0.3336,0.3336);

	this.instance_19 = new lib.CachedBmp_53();
	this.instance_19.setTransform(188.65,14.2,0.3336,0.3336);

	this.instance_20 = new lib.CachedBmp_52();
	this.instance_20.setTransform(187.3,23.15,0.3336,0.3336);

	this.instance_21 = new lib.CachedBmp_51();
	this.instance_21.setTransform(172.15,18.05,0.3336,0.3336);

	this.instance_22 = new lib.CachedBmp_50();
	this.instance_22.setTransform(160.7,25.1,0.3336,0.3336);

	this.instance_23 = new lib.CachedBmp_49();
	this.instance_23.setTransform(150.1,33.25,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(150.1,0,188.4,48.6);


(lib.button_all = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-62.25,227.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,227.8,2268.5,763.5);


(lib.button_play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.text = new cjs.Text("PLAY", "32px 'Arial'", "#E5E5E5");
	this.text.lineHeight = 38;
	this.text.lineWidth = 83;
	this.text.parent = this;
	this.text.setTransform(-41.75,-10.25);

	this.text_1 = new cjs.Text("PLAY", "32px 'Arial'", "#D3D3D3");
	this.text_1.lineHeight = 38;
	this.text_1.lineWidth = 83;
	this.text_1.parent = this;
	this.text_1.setTransform(-41.75,-10.25);

	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-109.2,-22.8,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_46();
	this.instance_1.setTransform(-109.2,-22.8,0.5,0.5);

	this.text_2 = new cjs.Text("PLAY", "32px 'Arial'", "#4A5B99");
	this.text_2.lineHeight = 38;
	this.text_2.lineWidth = 83;
	this.text_2.parent = this;
	this.text_2.setTransform(-41.75,-10.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text_1,p:{color:"#D3D3D3"}},{t:this.text,p:{color:"#E5E5E5"}}]}).to({state:[{t:this.instance_1},{t:this.text_1,p:{color:"#E5E5E5"}},{t:this.text,p:{color:"#4A5B99"}}]},1).to({state:[{t:this.instance_1},{t:this.text_2},{t:this.instance},{t:this.text_1,p:{color:"#D3D3D3"}},{t:this.text,p:{color:"#E5E5E5"}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-109.2,-22.8,218,61);


(lib.arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(-5,-5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arrow, new cjs.Rectangle(-5,-5,63,172), null);


(lib.urlpsd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Vector_Smart_Object
	this.instance = new lib.Symbol1();
	this.instance.setTransform(426,246.5,1,1,0,0,0,381,95.5);
	this.instance.filters = [new cjs.ColorFilter(0, 0, 0, 1, 255, 0, 0, 0)];
	this.instance.cache(-2,-2,766,195);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.urlpsd, new cjs.Rectangle(45,151,762,191), null);


(lib.soundonbtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.soundon();
	this.instance.setTransform(-0.5,0.5,1,1,0,0,0,-0.5,0.5);

	this.instance_1 = new lib.CachedBmp_94();
	this.instance_1.setTransform(-4.55,-4.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,-4.1,31.5,29.5);


(lib.soundoffbtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.soundoff();
	this.instance.setTransform(0.5,0.5,1,1,0,0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_94();
	this.instance_1.setTransform(-4.55,-4.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,-4.1,31.5,29.5);


(lib.gen = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.generatorfraz();
	this.instance.setTransform(570.55,189.75,0.213,0.213,0,0,0,-339.8,52.9);
	this.instance.filters = [new cjs.ColorFilter(1, 1, 1, 1, -255, 0, 0, 0)];
	this.instance.cache(-726,-2,772,110);

	this.instance_1 = new lib.CachedBmp_89();
	this.instance_1.setTransform(480.2,172,0.4167,0.4167);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gen, new cjs.Rectangle(480.2,172,175.00000000000006,245), null);


(lib.repeat = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.repeatsymbol();
	this.instance.setTransform(113.1,113.4,1,1,0,0,0,113.1,113.4);

	this.instance_1 = new lib.repeatsymbol();
	this.instance_1.setTransform(113.1,113.4,1,1,0,0,0,113.1,113.4);
	this.instance_1.filters = [new cjs.ColorFilter(0, 0, 0, 1, 229, 0, 48, 0)];
	this.instance_1.cache(-2,-2,231,231);

	this.instance_2 = new lib.CachedBmp_87();
	this.instance_2.setTransform(-49.65,-43.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_2},{t:this.instance}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.6,-43.1,329.5,316);


(lib.playbtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.play();
	this.instance.setTransform(22.9,23.1,1,1,0,0,0,22.9,23.1);

	this.instance_1 = new lib.CachedBmp_86();
	this.instance_1.setTransform(-7,-7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-7,60,60);


(lib.pausebtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.pause();
	this.instance.setTransform(22.9,23.1,1,1,0,0,0,22.9,23.1);

	this.instance_1 = new lib.CachedBmp_86();
	this.instance_1.setTransform(-7,-7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-7,60,60);


(lib.wh_movement_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.esliangliyskiy();
	this.instance.setTransform(867.6,270.05,60,60,0,0,0,698,29.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:514.1,regY:69.7,scaleX:54.1919,scaleY:54.1919,x:-9098.05,y:2464.65},0).wait(1).to({scaleX:48.6847,scaleY:48.6847,x:-8085,y:2241.4,alpha:0.0004},0).wait(1).to({scaleX:43.4693,scaleY:43.4693,x:-7125.65,y:2030,alpha:0.0034},0).wait(1).to({scaleX:38.5578,scaleY:38.5578,x:-6222.1,y:1830.95,alpha:0.0146},0).wait(1).to({scaleX:33.9381,scaleY:33.9381,x:-5372.25,y:1643.7,alpha:0.0446},0).wait(1).to({scaleX:29.6193,scaleY:29.6193,x:-4577.7,y:1468.65,alpha:0.111},0).wait(1).to({scaleX:25.5983,scaleY:25.5983,x:-3837.95,y:1305.7,alpha:0.24},0).wait(1).to({scaleX:21.8752,scaleY:21.8752,x:-3152.9,y:1154.8,alpha:0.468},0).wait(1).to({scaleX:18.4529,scaleY:18.4529,x:-2523.2,y:1016.1,alpha:0.8434},0).wait(1).to({scaleX:15.3255,scaleY:15.3255,x:-1947.7,y:889.4,alpha:1},0).wait(1).to({scaleX:12.4929,scaleY:12.4929,x:-1426.4,y:774.6},0).wait(1).to({scaleX:9.9612,scaleY:9.9612,x:-960.4,y:672.05},0).wait(1).to({scaleX:7.7303,scaleY:7.7303,x:-549.75,y:581.6},0).wait(1).to({scaleX:5.7913,scaleY:5.7913,x:-192.75,y:503.1},0).wait(1).to({scaleX:4.1531,scaleY:4.1531,x:108.95,y:436.7},0).wait(1).to({scaleX:2.8158,scaleY:2.8158,x:355.4,y:382.6},0).wait(1).to({scaleX:1.7703,scaleY:1.7703,x:548.1,y:340.3},0).wait(1).to({scaleX:1.0257,scaleY:1.0257,x:685.5,y:310.2},0).wait(1).to({scaleX:0.5789,scaleY:0.5789,x:768.15,y:292.15},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:796.05,y:286.2},0).wait(1).to({regX:697.6,regY:29.1,scaleX:0.431,scaleY:0.431,x:875.1,y:268.8},0).wait(1).to({regX:514.1,regY:69.7,scaleX:0.4286,scaleY:0.4286,x:796.5,y:286.15},0).wait(1).to({scaleX:0.4261,scaleY:0.4261,x:796.9,y:286.05},0).wait(1).to({scaleX:0.4237,scaleY:0.4237,x:797.35,y:286},0).wait(1).to({scaleX:0.4213,scaleY:0.4213,x:797.8,y:285.85},0).wait(1).to({scaleX:0.4188,scaleY:0.4188,x:798.25,y:285.8},0).wait(1).to({scaleX:0.4164,scaleY:0.4164,x:798.7,y:285.65},0).wait(1).to({scaleX:0.4139,scaleY:0.4139,x:799.15,y:285.55},0).wait(1).to({scaleX:0.4115,scaleY:0.4115,x:799.6,y:285.5},0).wait(1).to({scaleX:0.4091,scaleY:0.4091,x:800.05,y:285.35},0).wait(1).to({scaleX:0.4066,scaleY:0.4066,x:800.5,y:285.3},0).wait(1).to({scaleX:0.4042,scaleY:0.4042,x:800.95,y:285.15},0).wait(1).to({scaleX:0.4017,scaleY:0.4017,x:801.4,y:285.1},0).wait(1).to({scaleX:0.3993,scaleY:0.3993,x:801.85,y:285},0).wait(1).to({scaleX:0.3968,scaleY:0.3968,x:802.3,y:284.85},0).wait(1).to({scaleX:0.3944,scaleY:0.3944,x:802.75,y:284.8},0).wait(1).to({scaleX:0.392,scaleY:0.392,x:803.2,y:284.65},0).wait(1).to({scaleX:0.3895,scaleY:0.3895,x:803.65,y:284.6},0).wait(1).to({scaleX:0.3871,scaleY:0.3871,x:804.1,y:284.5},0).wait(1).to({scaleX:0.3846,scaleY:0.3846,x:804.55,y:284.35},0).wait(1).to({scaleX:0.3822,scaleY:0.3822,x:805,y:284.3},0).wait(1).to({scaleX:0.3798,scaleY:0.3798,x:805.45,y:284.15},0).wait(1).to({scaleX:0.3773,scaleY:0.3773,x:805.9,y:284.1},0).wait(1).to({scaleX:0.3749,scaleY:0.3749,x:806.35,y:284},0).wait(1).to({scaleX:0.3724,scaleY:0.3724,x:806.8,y:283.9},0).wait(1).to({scaleX:0.37,scaleY:0.37,x:807.25,y:283.8},0).wait(1).to({regX:697.9,regY:29.3,x:875.1,y:268.8},0).wait(1).to({regX:514.1,regY:69.7,scaleX:0.3415,scaleY:0.3415,x:812.35,y:282.55},0).wait(1).to({scaleX:0.3131,scaleY:0.3131,x:817.55,y:281.4},0).wait(1).to({scaleX:0.2846,scaleY:0.2846,x:822.75,y:280.3},0).wait(1).to({scaleX:0.2562,scaleY:0.2562,x:828,y:279.1},0).wait(1).to({scaleX:0.2277,scaleY:0.2277,x:833.25,y:277.95},0).wait(1).to({scaleX:0.1992,scaleY:0.1992,x:838.45,y:276.85},0).wait(1).to({scaleX:0.1708,scaleY:0.1708,x:843.7,y:275.65},0).wait(1).to({scaleX:0.1423,scaleY:0.1423,x:848.9,y:274.5},0).wait(1).to({scaleX:0.1138,scaleY:0.1138,x:854.2,y:273.4},0).wait(1).to({scaleX:0.0854,scaleY:0.0854,x:859.4,y:272.2},0).wait(1).to({scaleX:0.0569,scaleY:0.0569,x:864.6,y:271.05},0).wait(1).to({scaleX:0.0285,scaleY:0.0285,x:869.85,y:269.95},0).wait(1).to({scaleX:0,scaleY:0,x:-875.1,y:-268.75},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41012.4,-1481.9,61695,8361);


(lib.uderzhi_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.uderzhi();
	this.instance.setTransform(271.55,274.15,60,60,0,0,0,252,40.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:185.6,regY:67.7,scaleX:51.2577,scaleY:51.2577,x:-3129.9,y:1652.55},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:-2593.85,y:1435.85,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:-2104.2,y:1238,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:-1660.75,y:1058.8,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:-1264.05,y:898.7,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:-913.5,y:757.35,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:-609.4,y:634.8,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:-351.75,y:531.15},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:-140.25,y:446.2},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:24.5,y:380.25},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:143.1,y:333.1},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:215.25,y:304.85},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:240.9,y:295.4},0).wait(1).to({regX:252.7,regY:41.4,scaleX:0.4,scaleY:0.4,x:269.15,y:271.15},0).wait(1).to({regX:185.6,regY:67.7,x:242.25,y:281.65},0).wait(6).to({x:242.05},0).wait(1).to({x:241.85},0).wait(175));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16207.4,-2923.8,24993,9627);


(lib.svoi_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.svoi();
	this.instance.setTransform(236.65,272.4,60,60,0,0,0,237.1,26.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:114.5,regY:27.3,scaleX:51.2577,scaleY:51.258,x:-6025.45,y:328.5},0).wait(1).to({scaleX:43.2156,scaleY:43.2161,x:-5017.4,y:319.35,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8743,x:-4095.15,y:311,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.228,x:-3258.1,y:303.5,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2864,x:-2507.45,y:296.8,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.0403,x:-1842,y:290.9,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4942,x:-1262.35,y:285.8,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6483,x:-768.55,y:281.45},0).wait(1).to({scaleX:6.4963,scaleY:6.4979,x:-359.95,y:277.95},0).wait(1).to({scaleX:4.0505,scaleY:4.0522,x:-37.7,y:275.2},0).wait(1).to({scaleX:2.3002,scaleY:2.3019,x:199.25,y:273.35},0).wait(1).to({scaleX:1.2501,scaleY:1.2518,x:350.45,y:272.2},0).wait(1).to({scaleX:0.9,scaleY:0.9018,x:415.85,y:271.95},0).wait(1).to({regX:238.3,regY:27.9,scaleX:0.6,scaleY:0.6,x:491.65,y:271.2},0).wait(1).to({regX:114.5,regY:27.3,x:417.35,y:270.8},0).wait(5).to({x:417.15},0).wait(1).to({x:416.9},0).wait(175));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14649.3,-3774.6,15178,8226);


(lib.relativepronouns_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.relativepronouns();
	this.instance.setTransform(376.8,271.1,60,60,0,0,0,237.9,27);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:291.5,regY:61.2,scaleX:51.2577,scaleY:51.2577,x:3113.85,y:2024.1},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:2672.4,y:1749.1,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:2268.45,y:1498,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:1901.8,y:1270.7,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:1572.9,y:1067.45,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:1281.3,y:888.05,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:1027.25,y:732.55,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:810.7,y:601},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:631.4,y:493.2},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:489.9,y:409.6},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:385.7,y:349.7},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:319.05,y:313.8},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:289.8,y:301.9},0).wait(1).to({regX:252.1,regY:41.5,scaleX:0.24,scaleY:0.24,x:276.1,y:271.15},0).wait(1).to({regX:291.5,regY:61.2,x:285.5,y:275.85},0).wait(7).to({x:285.85},0).wait(1).to({x:286.2},0).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17197.2,-1348.9,41577,7347);


(lib.presentperfect_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.presentperfect();
	this.instance.setTransform(379.8,269.35,60,60,0,0,0,238.6,27.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:249.8,regY:59.8,scaleX:51.1912,scaleY:51.1912,x:952.6,y:1907.65},0).wait(1).to({scaleX:43.0878,scaleY:43.0878,x:861.3,y:1648.45,alpha:0.0024},0).wait(1).to({scaleX:35.6899,scaleY:35.6899,x:777.9,y:1411.85,alpha:0.0194},0).wait(1).to({scaleX:28.9928,scaleY:28.9928,x:702.45,y:1197.65,alpha:0.0819},0).wait(1).to({scaleX:23.0057,scaleY:23.0057,x:635,y:1006.25,alpha:0.25},0).wait(1).to({scaleX:17.7195,scaleY:17.7195,x:575.4,y:837.25,alpha:0.6223},0).wait(1).to({scaleX:13.1387,scaleY:13.1387,x:523.7,y:690.75,alpha:1},0).wait(1).to({scaleX:9.2634,scaleY:9.2634,x:479.95,y:566.85},0).wait(1).to({scaleX:6.0889,scaleY:6.0889,x:444.1,y:465.35},0).wait(1).to({scaleX:3.6245,scaleY:3.6245,x:416.25,y:386.65},0).wait(1).to({scaleX:1.8609,scaleY:1.8609,x:396.3,y:330.35},0).wait(1).to({scaleX:0.8027,scaleY:0.8027,x:384.15,y:296.6},0).wait(1).to({scaleX:0.45,scaleY:0.45,x:380.1,y:285.45},0).wait(1).to({regX:252.6,regY:41.4,scaleX:0.29,scaleY:0.29,x:375.05,y:271.15},0).wait(1).to({regX:249.8,regY:59.8,x:374.2,y:276.45},0).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16885.2,-1398.6,35877,7179);


(lib.pastcontinuous_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.pastcontinuous();
	this.instance.setTransform(379.8,272.35,60,60,0,0,0,238.1,27.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:294.5,regY:42.6,scaleX:51.2577,scaleY:51.2577,x:3258.55,y:1061.45},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:2792.8,y:937.35,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:2366.55,y:824,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:1979.65,y:721.45,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:1632.4,y:629.8,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:1324.55,y:548.85,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:1056.1,y:478.8,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:827.25,y:419.45},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:637.6,y:370.9},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:487.75,y:333.25},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:377.2,y:306.35},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:306.15,y:290.25},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:274.6,y:285},0).wait(1).to({regX:252.2,regY:41.5,scaleX:0.27,scaleY:0.27,x:241.85,y:271.15},0).wait(1).to({regX:294.5,regY:42.6,x:253.2,y:271.4},0).wait(9).to({x:253.35},0).wait(1).to({x:253.45},0).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13906.2,-2181.6,35337,6756);


(lib.indirectquestions_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.indirectquestions();
	this.instance.setTransform(376.8,269.35,60,60,0,0,0,238.3,27.4);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:205.5,regY:76,scaleX:51.2577,scaleY:51.2577,x:-1303,y:2760.65},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:-1037.75,y:2369.95,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:-795.45,y:2013.25,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:-576,y:1690.35,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:-379.65,y:1401.75,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:-206.1,y:1146.85,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:-55.5,y:926.05,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:72.1,y:739.25},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:176.9,y:586.25},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:258.55,y:467.55},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:317.45,y:382.6},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:353.35,y:331.7},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:366.25,y:314.8},0).wait(1).to({regX:252.8,regY:41.4,scaleX:0.18,scaleY:0.18,x:375.05,y:271.15},0).wait(1).to({regX:205.5,regY:76,x:366.5,y:277.35},0).wait(14));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29917.2,-1374.6,56649,9123);


(lib.imperativemood_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.poangliyski();
	this.instance.setTransform(384.8,277.4,60,60,0,0,0,252.1,29.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:94,regY:69.7,scaleX:54.2114,scaleY:54.2114,x:-8186.55,y:2435},0).wait(1).to({scaleX:48.7227,scaleY:48.7227,x:-7319.25,y:2216.5,alpha:0.0004},0).wait(1).to({scaleX:43.5248,scaleY:43.5248,x:-6498,y:2009.65,alpha:0.0034},0).wait(1).to({scaleX:38.6298,scaleY:38.6298,x:-5724.6,y:1814.85,alpha:0.0146},0).wait(1).to({scaleX:34.0256,scaleY:34.0256,x:-4997.2,y:1631.6,alpha:0.0446},0).wait(1).to({scaleX:29.7213,scaleY:29.7213,x:-4317.15,y:1460.3,alpha:0.111},0).wait(1).to({scaleX:25.7138,scaleY:25.7138,x:-3684,y:1300.85,alpha:0.24},0).wait(1).to({scaleX:22.0032,scaleY:22.0032,x:-3100.55,y:1153,alpha:0.468},0).wait(1).to({scaleX:18.5924,scaleY:18.5924,x:-2564.45,y:1017.1,alpha:0.8434},0).wait(1).to({scaleX:15.4755,scaleY:15.4755,x:-2074.85,y:892.9,alpha:1},0).wait(1).to({scaleX:12.6524,scaleY:12.6524,x:-1631.65,y:780.35},0).wait(1).to({scaleX:10.1292,scaleY:10.1292,x:-1235.9,y:679.8},0).wait(1).to({scaleX:7.9058,scaleY:7.9058,x:-887.5,y:591.2},0).wait(1).to({scaleX:5.9733,scaleY:5.9733,x:-585.1,y:514.15},0).wait(1).to({scaleX:4.3406,scaleY:4.3406,x:-330.05,y:449.1},0).wait(1).to({scaleX:3.0078,scaleY:3.0078,x:-122.4,y:396},0).wait(1).to({scaleX:1.9658,scaleY:1.9658,x:39.25,y:354.45},0).wait(1).to({scaleX:1.2237,scaleY:1.2237,x:153.5,y:324.9},0).wait(1).to({scaleX:0.7784,scaleY:0.7784,x:220.85,y:307.15},0).wait(1).to({scaleX:0.63,scaleY:0.63,x:241.3,y:301.2},0).wait(1).to({regX:252.3,regY:41.1,scaleX:0.631,scaleY:0.631,x:340.95,y:276.15},0).wait(1).to({regX:94,regY:69.7,scaleX:0.6282,scaleY:0.6282,x:241.5,y:294.1},0).wait(1).to({scaleX:0.6253,scaleY:0.6253,x:241.95,y:294},0).wait(1).to({scaleX:0.6225,scaleY:0.6225,x:242.35,y:293.95},0).wait(1).to({scaleX:0.6197,scaleY:0.6197,x:242.85,y:293.85},0).wait(1).to({scaleX:0.6168,scaleY:0.6168,x:243.3,y:293.75},0).wait(1).to({scaleX:0.614,scaleY:0.614,x:243.7,y:293.7},0).wait(1).to({scaleX:0.6111,scaleY:0.6111,x:244.2,y:293.6},0).wait(1).to({scaleX:0.6083,scaleY:0.6083,x:244.65,y:293.5},0).wait(1).to({scaleX:0.6055,scaleY:0.6055,x:245.05,y:293.45},0).wait(1).to({scaleX:0.6026,scaleY:0.6026,x:245.5,y:293.35},0).wait(1).to({scaleX:0.5998,scaleY:0.5998,x:246,y:293.25},0).wait(1).to({scaleX:0.5969,scaleY:0.5969,x:246.4,y:293.2},0).wait(1).to({scaleX:0.5941,scaleY:0.5941,x:246.85,y:293.1},0).wait(1).to({scaleX:0.5912,scaleY:0.5912,x:247.35,y:293},0).wait(1).to({scaleX:0.5884,scaleY:0.5884,x:247.75,y:292.95},0).wait(1).to({scaleX:0.5856,scaleY:0.5856,x:248.2,y:292.85},0).wait(1).to({scaleX:0.5827,scaleY:0.5827,x:248.65,y:292.75},0).wait(1).to({scaleX:0.5799,scaleY:0.5799,x:249.1,y:292.7},0).wait(1).to({scaleX:0.577,scaleY:0.577,x:249.55,y:292.6},0).wait(1).to({scaleX:0.5742,scaleY:0.5742,x:250,y:292.5},0).wait(1).to({scaleX:0.5714,scaleY:0.5714,x:250.45,y:292.45},0).wait(1).to({scaleX:0.5685,scaleY:0.5685,x:250.9,y:292.4},0).wait(1).to({scaleX:0.5657,scaleY:0.5657,x:251.3,y:292.3},0).wait(1).to({scaleX:0.5628,scaleY:0.5628,x:251.8,y:292.25},0).wait(1).to({scaleX:0.56,scaleY:0.56,x:252.25,y:292.15},0).wait(1).to({regX:252.2,regY:41,x:340.9,y:276.15},0).wait(1).to({regX:94,regY:69.7,scaleX:0.5169,scaleY:0.5169,x:259.1,y:291},0).wait(1).to({scaleX:0.4738,scaleY:0.4738,x:265.9,y:289.75},0).wait(1).to({scaleX:0.4308,scaleY:0.4308,x:272.7,y:288.45},0).wait(1).to({scaleX:0.3877,scaleY:0.3877,x:279.55,y:287.25},0).wait(1).to({scaleX:0.3446,scaleY:0.3446,x:286.35,y:286},0).wait(1).to({scaleX:0.3015,scaleY:0.3015,x:293.15,y:284.75},0).wait(1).to({scaleX:0.2585,scaleY:0.2585,x:300,y:283.55},0).wait(1).to({scaleX:0.2154,scaleY:0.2154,x:306.8,y:282.3},0).wait(1).to({scaleX:0.1723,scaleY:0.1723,x:313.6,y:281.05},0).wait(1).to({scaleX:0.1292,scaleY:0.1292,x:320.45,y:279.85},0).wait(1).to({scaleX:0.0862,scaleY:0.0862,x:327.25,y:278.6},0).wait(1).to({scaleX:0.0431,scaleY:0.0431,x:334.05,y:277.35},0).wait(1).to({scaleX:0,scaleY:0,x:-340.9,y:-276.15},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29678.2,-1516.6,41157,8364);


(lib.generatorfraz_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.generatorfraz();
	this.instance.setTransform(-958.2,188.15,70,70,0,0,0,-337.9,52.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-340.1,scaleX:63.2628,scaleY:63.2628,x:-1096.5,y:187.8},0).wait(1).to({scaleX:56.8745,scaleY:56.8745,x:-1081.55,y:187.5},0).wait(1).to({scaleX:50.8248,scaleY:50.8248,x:-1067.35,y:187.2},0).wait(1).to({scaleX:45.1275,scaleY:45.1275,x:-1053.95,y:186.95},0).wait(1).to({scaleX:39.7688,scaleY:39.7688,x:-1041.3,y:186.65},0).wait(1).to({scaleX:34.759,scaleY:34.759,x:-1029.5,y:186.4},0).wait(1).to({scaleX:30.0948,scaleY:30.0948,x:-1018.35,y:186.2},0).wait(1).to({scaleX:25.776,scaleY:25.776,x:-1008.65,y:185.95},0).wait(1).to({scaleX:21.8062,scaleY:21.8062,x:-999.75,y:185.75},0).wait(1).to({scaleX:18.1785,scaleY:18.1785,x:-991.6,y:185.55},0).wait(1).to({scaleX:14.8928,scaleY:14.8928,x:-984.15,y:185.45},0).wait(1).to({scaleX:11.956,scaleY:11.956,x:-977.6,y:185.3},0).wait(1).to({scaleX:9.3682,scaleY:9.3682,x:-971.75,y:185.15},0).wait(1).to({scaleX:7.119,scaleY:7.119,x:-966.65,y:185.05},0).wait(1).to({scaleX:5.2188,scaleY:5.2188,x:-962.4,y:184.95},0).wait(1).to({scaleX:3.6675,scaleY:3.6675,x:-958.95,y:184.85},0).wait(1).to({scaleX:2.4548,scaleY:2.4548,x:-956.15,y:184.75},0).wait(1).to({scaleX:1.591,scaleY:1.591,x:-954.2,y:184.7},0).wait(1).to({scaleX:1.0728,scaleY:1.0728,x:-953.05},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:-952.65,y:184.65},0).wait(1).to({regX:-338.5,regY:53.1,scaleX:0.5,scaleY:0.5,x:-963.1,y:184.75},0).wait(18).to({regX:-340.1,regY:52.8,scaleX:0.4988,scaleY:0.4988,x:-962.8,y:186.3},0).wait(1).to({scaleX:0.4952,scaleY:0.4952,x:-959.5,y:191.2},0).wait(1).to({scaleX:0.4892,scaleY:0.4892,x:-954.55,y:198.55},0).wait(1).to({scaleX:0.4807,scaleY:0.4807,x:-948.2,y:207.5},0).wait(1).to({scaleX:0.4699,scaleY:0.4699,x:-940.9,y:217.05},0).wait(1).to({scaleX:0.4566,scaleY:0.4566,x:-933,y:226.5},0).wait(1).to({scaleX:0.4409,scaleY:0.4409,x:-924.65,y:235.15},0).wait(1).to({scaleX:0.4228,scaleY:0.4228,x:-916.1,y:242.25},0).wait(1).to({scaleX:0.4023,scaleY:0.4023,x:-907.4,y:247.4},0).wait(1).to({scaleX:0.3794,scaleY:0.3794,x:-898.45,y:250},0).wait(1).to({scaleX:0.3541,scaleY:0.3541,x:-889.15,y:249.5},0).wait(1).to({scaleX:0.3264,scaleY:0.3264,x:-879.4,y:245.15},0).wait(1).to({scaleX:0.2962,scaleY:0.2962,x:-868.6,y:235.95},0).wait(1).to({scaleX:0.2636,scaleY:0.2636,x:-856.05,y:220.35},0).wait(1).to({scaleX:0.2287,scaleY:0.2287,x:-840,y:195.35},0).wait(1).to({scaleX:0.213,scaleY:0.213,x:-831.9,y:165.35},0).wait(1).to({x:-839.8,y:101.75},0).wait(1).to({regX:-339.8,regY:52.9,x:-840.7},0).wait(16));

	// Layer_2
	this.text = new cjs.Text(" Генератор фраз", "bold 16px 'Arial Black'");
	this.text.lineHeight = 25;
	this.text.lineWidth = 160;
	this.text.parent = this;
	this.text.setTransform(-920.45,99.95,1,0.0326);

	this.instance_1 = new lib.CachedBmp_73();
	this.instance_1.setTransform(-928.45,99.3,0.4167,0.4167);

	this.instance_2 = new lib.CachedBmp_74();
	this.instance_2.setTransform(-928.35,97.4,0.4167,0.4167);

	this.instance_3 = new lib.CachedBmp_75();
	this.instance_3.setTransform(-928.35,95.5,0.4167,0.4167);

	this.instance_4 = new lib.CachedBmp_76();
	this.instance_4.setTransform(-928.35,93.6,0.4167,0.4167);

	this.instance_5 = new lib.CachedBmp_77();
	this.instance_5.setTransform(-928.35,91.7,0.4167,0.4167);

	this.instance_6 = new lib.CachedBmp_78();
	this.instance_6.setTransform(-928.3,89.75,0.4167,0.4167);

	this.instance_7 = new lib.CachedBmp_79();
	this.instance_7.setTransform(-928.3,87.85,0.4167,0.4167);

	this.instance_8 = new lib.CachedBmp_80();
	this.instance_8.setTransform(-928.2,85.95,0.4167,0.4167);

	this.instance_9 = new lib.CachedBmp_82();
	this.instance_9.setTransform(-928.2,84.05,0.4167,0.4167);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.text}]},54).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27999.2,-3507.8,53774,7388.5);


(lib.futuresimple_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.futuresimple();
	this.instance.setTransform(370.8,262.1,60,60,0,0,0,237.9,27.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:252.9,regY:104.4,scaleX:51.2651,scaleY:51.2651,x:1139.65,y:4220.25},0).wait(1).to({scaleX:43.2298,scaleY:43.2298,x:1019,y:3600.3,alpha:0.0024},0).wait(1).to({scaleX:35.894,scaleY:35.894,x:908.85,y:3034.35,alpha:0.0194},0).wait(1).to({scaleX:29.2531,scaleY:29.2531,x:809.05,y:2522,alpha:0.0819},0).wait(1).to({scaleX:23.3163,scaleY:23.3163,x:719.9,y:2063.95,alpha:0.25},0).wait(1).to({scaleX:18.0745,scaleY:18.0745,x:641.15,y:1659.6,alpha:0.6223},0).wait(1).to({scaleX:13.5322,scaleY:13.5322,x:572.85,y:1309.1,alpha:1},0).wait(1).to({scaleX:9.6894,scaleY:9.6894,x:515.1,y:1012.6},0).wait(1).to({scaleX:6.5416,scaleY:6.5416,x:467.7,y:769.75},0).wait(1).to({scaleX:4.0978,scaleY:4.0978,x:430.95,y:581.2},0).wait(1).to({scaleX:2.349,scaleY:2.349,x:404.55,y:446.3},0).wait(1).to({scaleX:1.2998,scaleY:1.2998,x:388.65,y:365.35},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:383.25,y:338.4},0).wait(1).to({regX:242.8,regY:31.9,scaleX:0.3,scaleY:0.3,x:407.95,y:271.15},0).wait(1).to({regX:252.9,regY:104.4,x:410.9,y:292.85},0).wait(10).to({x:411.15},0).wait(1).to({x:411.35},0).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14572.2,0,31686,8485.1);


(lib.do_support_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.ushelpoangliyski();
	this.instance.setTransform(384,228.45,60,60,0,0,0,251.2,-5.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:103.4,regY:31.1,scaleX:54.2426,scaleY:54.2426,x:-7633,y:2197.7},0).wait(1).to({scaleX:48.7835,scaleY:48.7835,x:-6826.1,y:1999.8,alpha:0.0004},0).wait(1).to({scaleX:43.6136,scaleY:43.6136,x:-6062,y:1812.45,alpha:0.0034},0).wait(1).to({scaleX:38.745,scaleY:38.745,x:-5342.4,y:1635.9,alpha:0.0146},0).wait(1).to({scaleX:34.1656,scaleY:34.1656,x:-4665.65,y:1469.95,alpha:0.0446},0).wait(1).to({scaleX:29.8845,scaleY:29.8845,x:-4032.9,y:1314.75,alpha:0.111},0).wait(1).to({scaleX:25.8986,scaleY:25.8986,x:-3443.85,y:1170.25,alpha:0.24},0).wait(1).to({scaleX:22.208,scaleY:22.208,x:-2898.2,y:1036.45,alpha:0.468},0).wait(1).to({scaleX:18.8156,scaleY:18.8156,x:-2396.6,y:913.5,alpha:0.8434},0).wait(1).to({scaleX:15.7155,scaleY:15.7155,x:-1938.25,y:801.1,alpha:1},0).wait(1).to({scaleX:12.9076,scaleY:12.9076,x:-1523.1,y:699.35},0).wait(1).to({scaleX:10.398,scaleY:10.398,x:-1152.05,y:608.35},0).wait(1).to({scaleX:8.1866,scaleY:8.1866,x:-825.1,y:528.2},0).wait(1).to({scaleX:6.2645,scaleY:6.2645,x:-540.95,y:458.55},0).wait(1).to({scaleX:4.6406,scaleY:4.6406,x:-300.85,y:399.6},0).wait(1).to({scaleX:3.315,scaleY:3.315,x:-104.85,y:351.6},0).wait(1).to({scaleX:2.2786,scaleY:2.2786,x:48.35,y:314},0).wait(1).to({scaleX:1.5405,scaleY:1.5405,x:157.5,y:287.25},0).wait(1).to({scaleX:1.0976,scaleY:1.0976,x:222.95,y:271.25},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:244.8,y:265.85},0).wait(1).to({regX:255.7,regY:-5,scaleX:0.89,scaleY:0.89,x:385.25,y:231.4},0).wait(1).to({regX:103.4,regY:31.1,scaleX:0.8884,scaleY:0.8884,x:249.95,y:263.45},0).wait(1).to({scaleX:0.8868,scaleY:0.8868,x:250.2,y:263.4},0).wait(1).to({scaleX:0.8852,scaleY:0.8852,x:250.45,y:263.35},0).wait(1).to({scaleX:0.8836,scaleY:0.8836,x:250.65,y:263.3},0).wait(1).to({scaleX:0.882,scaleY:0.882,x:250.9,y:263.25},0).wait(1).to({scaleX:0.8804,scaleY:0.8804,x:251.2,y:263.2},0).wait(1).to({scaleX:0.8788,scaleY:0.8788,x:251.4,y:263.1},0).wait(1).to({scaleX:0.8772,scaleY:0.8772,x:251.65,y:263.05},0).wait(1).to({scaleX:0.8756,scaleY:0.8756,x:251.9,y:263},0).wait(1).to({scaleX:0.874,scaleY:0.874,x:252.1,y:262.95},0).wait(1).to({scaleX:0.8724,scaleY:0.8724,x:252.35,y:262.9},0).wait(1).to({scaleX:0.8708,scaleY:0.8708,x:252.65,y:262.85},0).wait(1).to({scaleX:0.8692,scaleY:0.8692,x:252.85,y:262.75},0).wait(1).to({scaleX:0.8676,scaleY:0.8676,x:253.1,y:262.7},0).wait(1).to({scaleX:0.866,scaleY:0.866,x:253.35,y:262.65},0).wait(1).to({scaleX:0.8644,scaleY:0.8644,x:253.6,y:262.6},0).wait(1).to({scaleX:0.8628,scaleY:0.8628,x:253.85,y:262.55},0).wait(1).to({scaleX:0.8612,scaleY:0.8612,x:254.1,y:262.5},0).wait(1).to({scaleX:0.8596,scaleY:0.8596,x:254.35,y:262.4},0).wait(1).to({scaleX:0.858,scaleY:0.858,x:254.55,y:262.35},0).wait(1).to({scaleX:0.8564,scaleY:0.8564,x:254.8,y:262.3},0).wait(1).to({scaleX:0.8548,scaleY:0.8548,x:255.05,y:262.25},0).wait(1).to({scaleX:0.8532,scaleY:0.8532,x:255.3,y:262.2},0).wait(1).to({scaleX:0.8516,scaleY:0.8516,x:255.55,y:262.15},0).wait(1).to({scaleX:0.85,scaleY:0.85,x:255.8,y:262.1},0).wait(1).to({regX:255.7,regY:-5.2,scaleX:0.8,scaleY:0.8,x:385.3,y:231.45},0).wait(1).to({regX:103.4,regY:31.1,scaleX:0.7385,scaleY:0.7385,x:272.8,y:258.2},0).wait(1).to({scaleX:0.6769,scaleY:0.6769,x:282.2,y:256},0).wait(1).to({scaleX:0.6154,scaleY:0.6154,x:291.55,y:253.75},0).wait(1).to({scaleX:0.5538,scaleY:0.5538,x:300.9,y:251.5},0).wait(1).to({scaleX:0.4923,scaleY:0.4923,x:310.3,y:249.3},0).wait(1).to({scaleX:0.4308,scaleY:0.4308,x:319.65,y:247.05},0).wait(1).to({scaleX:0.3692,scaleY:0.3692,x:329.05,y:244.85},0).wait(1).to({scaleX:0.3077,scaleY:0.3077,x:338.4,y:242.55},0).wait(1).to({scaleX:0.2462,scaleY:0.2462,x:347.75,y:240.35},0).wait(1).to({scaleX:0.1846,scaleY:0.1846,x:357.15,y:238.15},0).wait(1).to({scaleX:0.1231,scaleY:0.1231,x:366.5,y:235.9},0).wait(1).to({scaleX:0.0615,scaleY:0.0615,x:375.85,y:233.65},0).wait(1).to({scaleX:0,scaleY:0,x:-385.25,y:-231.4},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29028,-1775.5,41085,8361);


(lib.contractedforms_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.contractedforms();
	this.instance.setTransform(376.8,269.35,60,60,0,0,0,237.7,26.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:178.6,regY:60,scaleX:51.2577,scaleY:51.2577,x:-2640.15,y:1971.25},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:-2152.55,y:1704.4,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:-1706.35,y:1460.8,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:-1301.2,y:1240.25,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:-937.7,y:1043.1,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:-615.3,y:869.1,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:-334.3,y:718.3,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:-94.65,y:590.7},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:103.9,y:486.25},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:260.75,y:405.2},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:376.5,y:347.2},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:450.85,y:312.5},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:483.9,y:301},0).wait(1).to({regX:252.4,regY:41.6,scaleX:0.25,scaleY:0.25,x:508.7,y:271.15},0).wait(1).to({regX:178.6,regY:60,x:490.2,y:275.75},0).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23665.2,-1338.6,40986,7203);


(lib.auxiliaryverbs_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.auxiliaryverbs();
	this.instance.setTransform(376.8,271.1,60,60,0,0,0,238.6,27.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:307.3,regY:35.7,scaleX:51.2577,scaleY:51.2577,x:3898.1,y:681.2},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:3345.45,y:616.85,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:2840.95,y:558.15,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:2384.2,y:504.95,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:1975.85,y:457.4,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:1615.3,y:415.45,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:1302.85,y:379.05,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:1038.45,y:348.25},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:821.9,y:323.05},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:653.75,y:303.5},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:533.35,y:289.45},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:461.05,y:281.1},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:436.85,y:278.3},0).wait(1).to({regX:252.4,regY:41.5,scaleX:0.27,scaleY:0.27,x:375.05,y:271.15},0).wait(1).to({regX:307.3,regY:35.7,x:389.8,y:269.55},0).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13939.2,-3034.9,36876,7575);


(lib.angliyskiy_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.angliyskiy();
	this.instance.setTransform(309.15,268.15,60,60,0,0,0,252.4,41.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:312,regY:34.7,scaleX:51.166,scaleY:51.166,x:3358.55,y:-63.95},0).wait(1).to({scaleX:43.0395,scaleY:43.0395,x:2874.1,y:-10.75,alpha:0.0024},0).wait(1).to({scaleX:35.6205,scaleY:35.6205,x:2431.75,y:37.9,alpha:0.0194},0).wait(1).to({scaleX:28.9043,scaleY:28.9043,x:2031.35,y:81.85,alpha:0.0819},0).wait(1).to({scaleX:22.9001,scaleY:22.9001,x:1673.35,y:121.2,alpha:0.25},0).wait(1).to({scaleX:17.5988,scaleY:17.5988,x:1357.25,y:155.9,alpha:0.6223},0).wait(1).to({scaleX:13.005,scaleY:13.005,x:1083.35,y:185.95,alpha:1},0).wait(1).to({scaleX:9.1186,scaleY:9.1186,x:851.55,y:211.45},0).wait(1).to({scaleX:5.935,scaleY:5.935,x:661.65,y:232.25},0).wait(1).to({scaleX:3.4635,scaleY:3.4635,x:514.25,y:248.45},0).wait(1).to({scaleX:1.6949,scaleY:1.6949,x:408.7,y:260},0).wait(1).to({scaleX:0.6337,scaleY:0.6337,x:345.25,y:267},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:324.05,y:269.3},0).wait(1).to({regX:252.7,regY:41.1,scaleX:0.2832,scaleY:0.2832,x:307.4,y:271.15},0).wait(1).to({regX:312,regY:34.7,x:324.15,y:269.3},0).wait(2).to({x:324.2},0).wait(178));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14834.8,-4516.8,37440,8796);


(lib.step_sound = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// _
	this.instance = new lib.right();
	this.instance.setTransform(215.3,604.65,0.0831,0.0831,0,0,0,235.3,400.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(11).to({_off:false},0).wait(98).to({regX:238.5,regY:400.5,x:215.5,y:604.6,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(30));

	// _
	this.instance_1 = new lib.right();
	this.instance_1.setTransform(170.55,504.95,0.0831,0.0831,0,0,180,232.3,399.7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(23).to({_off:false},0).wait(89).to({regY:399.1},0).wait(1).to({regX:238.5,regY:400.5,x:170.05,y:505,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(26));

	// _
	this.instance_2 = new lib.right();
	this.instance_2.setTransform(215.35,415,0.0831,0.0831,0,0,0,236,399.7);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(36).to({_off:false},0).wait(81).to({regY:399.1},0).wait(1).to({regX:238.5,regY:400.5,x:215.5,y:415.05,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(21));

	// _
	this.instance_3 = new lib.right();
	this.instance_3.setTransform(171.05,309.05,0.0831,0.0831,0,0,180,187.2,400.9);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(48).to({_off:false},0).wait(74).to({regX:184.8,x:171.1},0).wait(1).to({regX:238.5,regY:400.5,x:166.6,y:308.95,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(16));

	// _
	this.instance_4 = new lib.right();
	this.instance_4.setTransform(215.35,216.9,0.0831,0.0831,0,0,0,235.3,400.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(60).to({_off:false},0).wait(68).to({regX:238.5,regY:400.5,x:215.55,y:216.85,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(11));

	// _
	this.instance_5 = new lib.right();
	this.instance_5.setTransform(170.4,104.95,0.0831,0.0831,0,0,180,230,400.9);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(71).to({_off:false},0).wait(61).to({regX:227.5,x:170.45},0).wait(1).to({regX:238.5,regY:400.5,x:169.5,y:104.85,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(6));

	// _
	this.instance_6 = new lib.right();
	this.instance_6.setTransform(215.35,-5.05,0.0831,0.0831,0,0,0,236,349.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(83).to({_off:false},0).wait(54).to({regY:346.7,y:-5.1},0).wait(1).to({regX:238.5,regY:400.5,x:215.5,y:-0.65,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-28.2,228.6,660.3000000000001);


(lib.bigfootstogether = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// right_big
	this.instance = new lib.right("synched",0);
	this.instance.setTransform(556.6,453.8,0.3592,0.3592,0,0,0,238.5,400.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(82).to({startPosition:0},0).wait(1).to({x:556.55,y:453.75,alpha:0.8889},0).wait(1).to({alpha:0.7778},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.5556},0).wait(1).to({alpha:0.4444},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2222},0).wait(1).to({alpha:0.1111},0).wait(1).to({alpha:0},0).wait(1));

	// left_big
	this.instance_1 = new lib.right("synched",0);
	this.instance_1.setTransform(400.15,453.8,0.3592,0.3592,0,0,180,227.8,400.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({_off:false},0).wait(70).to({regX:226.9},0).wait(1).to({regX:238.5,x:396,y:453.75,alpha:0.8889},0).wait(1).to({alpha:0.7778},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.5556},0).wait(1).to({alpha:0.4444},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2222},0).wait(1).to({alpha:0.1111},0).wait(1).to({alpha:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(339.7,335.2,273.2,237.09999999999997);


(lib.big_foots = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// right_big
	this.instance = new lib.right();
	this.instance.setTransform(529.1,454.65,0.3592,0.3592,0,0,0,238.5,400.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50).to({regX:238.3},0).wait(1).to({regX:238.5,y:454.6,alpha:0.8889},0).wait(1).to({alpha:0.7778},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.5556},0).wait(1).to({alpha:0.4444},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2222},0).wait(1).to({alpha:0.1111},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(6));

	// left_big
	this.instance_1 = new lib.right();
	this.instance_1.setTransform(332.6,159,0.3592,0.3592,0,0,180,190.2,400.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({_off:false},0).wait(45).to({regX:238.5,x:315.25,y:158.95,alpha:0.8889},0).wait(1).to({alpha:0.7778},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.5556},0).wait(1).to({alpha:0.4444},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2222},0).wait(1).to({alpha:0.1111},0).wait(1).to({alpha:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(259,40.4,326.4,532.8000000000001);


(lib.cut_face_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.maskenglandface2psd("synched",0);
	this.instance.setTransform(-0.5,0.5,1,1,0,0,0,190,237.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cut_face_2, new cjs.Rectangle(-94.5,-106,188,213), null);


(lib.circletext = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// text
	this.instance = new lib.circletextswf("synched",0);
	this.instance.setTransform(72.6,0.1,1,1,0,0,0,244.2,24.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.5,-24.3,188.4,48.6);


(lib.sounding = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
	}
	this.frame_1 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// Layer_1
	this.instance = new lib.soundonbtn();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.soundonbtn(), 3);

	this.instance_1 = new lib.soundoffbtn();
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.soundoffbtn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22.5,20.5);


(lib.rise_up_face = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.cut_face_2();
	this.instance.setTransform(140.65,262.8,1,1,0,0,0,-1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.rise_up_face, new cjs.Rectangle(47.2,156.8,188,213), null);


(lib.play_pause = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
	}
	this.frame_1 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// Layer_1
	this.instance = new lib.playbtn();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.playbtn(), 3);

	this.instance_1 = new lib.pausebtn();
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.pausebtn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.1,0,46.5,46.5);


// stage content:
(lib.generatorfrazpromo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,43,55,67,79,91,104,116,128,139,212,224,236,248,260,273,285,297,308,439,489,497,510,517,538,544,565,571,592,597,618,620,641,653,674,675,696,701,722,785,806,862,895,932,1038,1050,1127,1180,1221];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var becauseActionScriptIsVeryGoodLanguage;
		var playback = true;
		var iter = true;
		
		createjs.Sound.volume = 1;
		
		if (  !becauseActionScriptIsVeryGoodLanguage ) {
		
			var soundIsOn = true;
		
		createjs.Sound.muted = true;	
		}
			
			
			
		
		var _this = this;
			
			
		_this.videoplay.addEventListener('click', repeat.bind(_this) );	
		createjs.Ticker.on("tick", onEnterFrame);
			
		
		function onEnterFrame (e){
			
			
			var frameNumber = _this.currentFrame+1;
		
			if (frameNumber < 1294) {
				if(!soundIsOn)
				{
					_this.mutte.gotoAndStop(2);
				}
				else
				{
					_this.mutte.gotoAndStop(1);
				}
			}
			
			if (frameNumber < 1293) {
				if(!playback)
				{
					_this.pausing.gotoAndStop(2);
				}
				else
				{
					_this.pausing.gotoAndStop(1);
				}
			}
			
			if (frameNumber == 1293)
			{
				_this.pausing.removeEventListener('click', changePlayback.bind(_this) );
				_this.bigStop.removeEventListener('click', changePlayback.bind(_this) );
				
			}
		
			if (frameNumber == 1294)
			{
				if (iter) {
					//flain();
					//ambulance_on();
					iter = false;
				}
		
				_this.stop();
					
			}
			
			if (frameNumber == 1295)
			{
		
				_this.mutte.removeEventListener('click', changeSound.bind(_this) );
				_this.again.removeEventListener('click', repeat.bind(_this) );
		
				_this.gotoAndPlay(1);
					
			}
			
			if (frameNumber == 1327) {
		
				_this.stop();
			}
			
			if (frameNumber==1326) {
		
			}
		}	
			
		_this.again.addEventListener('click', repeat.bind(_this) );
		
		function repeat() {
			iter = true;
			
			var frameNumber = _this.currentFrame+1;
			if(!playback)
			{
				playback = !playback;
			}
			if (frameNumber == 1327) {
				_this.videoplay.addEventListener("click", repeat.bind(_this) );
				_this.gotoAndPlay(1);
			}
		
			if (frameNumber < 1294)
			{
				_this.stop();
				_this.pausing.gotoAndStop(1);
				_this.gotoAndPlay(1);
			}
			else
			{
				if (frameNumber == 1294) {
					_this.play();
				}
			}
			if (soundIsOn)
			{
				createjs.Sound.muted = true;
			}
			else
			{
				createjs.Sound.muted = false;
			}
		}
			
		
		_this.mutte.addEventListener('click',changeSound.bind(_this) );
		
		function changeSound(){
		   
			if(soundIsOn)
			{
				createjs.Sound.muted = false;
				soundIsOn = false;
				_this.mutte.gotoAndStop(2);
			}
			else 
			{
				createjs.Sound.muted = true;
				soundIsOn = true;
				_this.mutte.gotoAndStop(1);
			}
		}
		
		_this.pausing.addEventListener('click', changePlayback.bind(_this) );
		_this.bigStop.addEventListener('click', changePlayback.bind(_this) );
		
		function changePlayback(){
			if(playback)
			{
				_this.stop();
				_this.pausing.gotoAndStop(1);
		
				//createjs.Sound.muted = true;
			
			}
			else
			{
				_this.play();
				_this.pausing.gotoAndStop(2);
				
				if (soundIsOn)
				{
					//createjs.Sound.muted = false;
				}
			}
			playback = !playback;
		}
		
		
		if (  !becauseActionScriptIsVeryGoodLanguage )
		{ 
			var becauseActionScriptIsVeryGoodLanguage = true;
			_this.gotoAndPlay(1297);
		}
		
		
		//_this.gotoAndPlay(1150);
	}
	this.frame_43 = function() {
		playSound("step2");
	}
	this.frame_55 = function() {
		playSound("step3");
	}
	this.frame_67 = function() {
		playSound("step4");
	}
	this.frame_79 = function() {
		playSound("step3");
	}
	this.frame_91 = function() {
		playSound("step6");
	}
	this.frame_104 = function() {
		playSound("step27");
	}
	this.frame_116 = function() {
		playSound("step3");
	}
	this.frame_128 = function() {
		playSound("step2");
	}
	this.frame_139 = function() {
		playSound("step3");
	}
	this.frame_212 = function() {
		playSound("step2");
	}
	this.frame_224 = function() {
		playSound("step3");
	}
	this.frame_236 = function() {
		playSound("step4");
	}
	this.frame_248 = function() {
		playSound("step3");
	}
	this.frame_260 = function() {
		playSound("step6");
	}
	this.frame_273 = function() {
		playSound("step27");
	}
	this.frame_285 = function() {
		playSound("step3");
	}
	this.frame_297 = function() {
		playSound("step2");
	}
	this.frame_308 = function() {
		playSound("step3");
	}
	this.frame_439 = function() {
		playSound("flyingpast");
		playSound("brokenglass9");
	}
	this.frame_489 = function() {
		playSound("flyingpast4");
	}
	this.frame_497 = function() {
		playSound("win6");
	}
	this.frame_510 = function() {
		playSound("win6");
	}
	this.frame_517 = function() {
		playSound("flyingpast4");
	}
	this.frame_538 = function() {
		playSound("win6");
	}
	this.frame_544 = function() {
		playSound("flyingpast4");
	}
	this.frame_565 = function() {
		playSound("win6");
	}
	this.frame_571 = function() {
		playSound("flyingpast4");
	}
	this.frame_592 = function() {
		playSound("win6");
	}
	this.frame_597 = function() {
		playSound("flyingpast4");
	}
	this.frame_618 = function() {
		playSound("win6");
	}
	this.frame_620 = function() {
		playSound("flyingpast4");
	}
	this.frame_641 = function() {
		playSound("win6");
	}
	this.frame_653 = function() {
		playSound("flyingpast4");
	}
	this.frame_674 = function() {
		playSound("win2");
	}
	this.frame_675 = function() {
		playSound("flyingpast4");
	}
	this.frame_696 = function() {
		playSound("win2");
	}
	this.frame_701 = function() {
		playSound("flyingpast4");
	}
	this.frame_722 = function() {
		playSound("win2");
	}
	this.frame_785 = function() {
		playSound("flyingpast4");
	}
	this.frame_806 = function() {
		playSound("win6");
	}
	this.frame_862 = function() {
		playSound("flyingpast4");
	}
	this.frame_895 = function() {
		playSound("flyingpast4");
	}
	this.frame_932 = function() {
		playSound("flyingpast4");
	}
	this.frame_1038 = function() {
		playSound("step2");
	}
	this.frame_1050 = function() {
		playSound("step3");
	}
	this.frame_1127 = function() {
		playSound("hat");
	}
	this.frame_1180 = function() {
		playSound("flyingpast");
	}
	this.frame_1221 = function() {
		playSound("voltaicarc");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(43).call(this.frame_43).wait(12).call(this.frame_55).wait(12).call(this.frame_67).wait(12).call(this.frame_79).wait(12).call(this.frame_91).wait(13).call(this.frame_104).wait(12).call(this.frame_116).wait(12).call(this.frame_128).wait(11).call(this.frame_139).wait(73).call(this.frame_212).wait(12).call(this.frame_224).wait(12).call(this.frame_236).wait(12).call(this.frame_248).wait(12).call(this.frame_260).wait(13).call(this.frame_273).wait(12).call(this.frame_285).wait(12).call(this.frame_297).wait(11).call(this.frame_308).wait(131).call(this.frame_439).wait(50).call(this.frame_489).wait(8).call(this.frame_497).wait(13).call(this.frame_510).wait(7).call(this.frame_517).wait(21).call(this.frame_538).wait(6).call(this.frame_544).wait(21).call(this.frame_565).wait(6).call(this.frame_571).wait(21).call(this.frame_592).wait(5).call(this.frame_597).wait(21).call(this.frame_618).wait(2).call(this.frame_620).wait(21).call(this.frame_641).wait(12).call(this.frame_653).wait(21).call(this.frame_674).wait(1).call(this.frame_675).wait(21).call(this.frame_696).wait(5).call(this.frame_701).wait(21).call(this.frame_722).wait(63).call(this.frame_785).wait(21).call(this.frame_806).wait(56).call(this.frame_862).wait(33).call(this.frame_895).wait(37).call(this.frame_932).wait(106).call(this.frame_1038).wait(12).call(this.frame_1050).wait(77).call(this.frame_1127).wait(53).call(this.frame_1180).wait(41).call(this.frame_1221).wait(106));

	// bg_copy
	this.instance = new lib.CachedBmp_140();
	this.instance.setTransform(982.6,-17.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},2).wait(1325));

	// press_btn
	this.bigStop = new lib.button_all();
	this.bigStop.name = "bigStop";
	this.bigStop.setTransform(1261.4,357.05,0.2495,1,0,0,0,1069.8,604.5);
	new cjs.ButtonHelper(this.bigStop, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.bigStop).to({_off:true},1293).wait(34));

	// btn_play_copy
	this.videoplay = new lib.button_play();
	this.videoplay.name = "videoplay";
	this.videoplay.setTransform(1668.65,336);
	this.videoplay._off = true;
	new cjs.ButtonHelper(this.videoplay, 0, 1, 2, false, new lib.button_play(), 3);

	this.timeline.addTween(cjs.Tween.get(this.videoplay).wait(1295).to({_off:false},0).wait(32));

	// arrow
	this.instance_1 = new lib.arrow("synched",0);
	this.instance_1.setTransform(1501,638.95,0.69,0.69,0,0,0,26.4,81);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1232).to({_off:false},0).wait(1).to({regX:26.5,rotation:0.701,x:1501.05,y:637.9},0).wait(1).to({rotation:2.8698,x:1500.9,y:634.75},0).wait(1).to({rotation:6.4624,x:1500.7,y:629.6},0).wait(1).to({rotation:11.479,x:1500.4,y:622.4},0).wait(1).to({rotation:17.9414,x:1500,y:613.25},0).wait(1).to({rotation:25.8497,x:1499.4,y:602.1},0).wait(1).to({rotation:35.1818,x:1498.6,y:589.2},0).wait(1).to({rotation:45.9598,x:1497.5,y:574.4},0).wait(1).to({rotation:58.1618,x:1496.15,y:558},0).wait(1).to({rotation:71.8095,x:1494.45,y:539.9},0).wait(1).to({rotation:86.9031,x:1492.35,y:520.4},0).wait(1).to({rotation:103.4206,x:1489.75,y:499.6},0).wait(1).to({rotation:121.362,x:1486.6,y:477.5},0).wait(1).to({rotation:140.7712,x:1482.8,y:454.4},0).wait(1).to({rotation:161.6043,x:1478.35,y:430.4},0).wait(1).to({rotation:173.9525,x:1473.15,y:405.85},0).wait(1).to({rotation:170.3747,x:1467.15,y:380.7},0).wait(1).to({rotation:166.582,x:1460.25,y:355.35},0).wait(1).to({rotation:162.5677,x:1452.4,y:329.95},0).wait(1).to({rotation:158.3418,x:1443.55,y:304.65},0).wait(1).to({rotation:153.8944,x:1433.65,y:279.9},0).wait(1).to({rotation:149.2353,x:1422.65,y:255.9},0).wait(1).to({rotation:144.3547,x:1410.5,y:232.9},0).wait(1).to({rotation:139.2592,x:1397.2,y:211.2},0).wait(1).to({rotation:133.9487,x:1382.75,y:191.15},0).wait(1).to({rotation:128.42,x:1367.15,y:173.2},0).wait(1).to({rotation:122.6731,x:1350.4,y:157.6},0).wait(1).to({rotation:116.7112,x:1332.55,y:144.75},0).wait(1).to({rotation:110.5311,x:1313.7,y:134.95},0).wait(1).to({rotation:104.1328,x:1293.9,y:128.8},0).wait(1).to({rotation:97.5757,x:1273.4,y:126.7},0).wait(1).to({rotation:91.1773,x:1253.35,y:128.65},0).wait(1).to({rotation:84.9972,x:1234.15,y:134.4},0).wait(1).to({rotation:79.0353,x:1215.9,y:143.75},0).wait(1).to({rotation:73.2884,x:1198.45,y:156},0).wait(1).to({rotation:67.7597,x:1182.1,y:171.1},0).wait(1).to({rotation:62.4492,x:1166.85,y:188.55},0).wait(1).to({rotation:57.3537,x:1152.6,y:208},0).wait(1).to({rotation:52.4731,x:1139.5,y:229.2},0).wait(1).to({rotation:47.814,x:1127.45,y:251.8},0).wait(1).to({rotation:43.3666,x:1116.4,y:275.5},0).wait(1).to({rotation:39.1407,x:1106.45,y:299.95},0).wait(1).to({rotation:35.1265,x:1097.45,y:324.9},0).wait(1).to({rotation:31.3337,x:1089.45,y:350.15},0).wait(1).to({rotation:27.7559,x:1082.3,y:375.35},0).wait(1).to({rotation:24.3964,x:1075.95,y:400.35},0).wait(1).to({rotation:21.2518,x:1070.45,y:424.85},0).wait(1).to({rotation:18.3221,x:1065.65,y:448.55},0).wait(1).to({rotation:15.614,x:1061.5,y:471.4},0).wait(1).to({rotation:13.1208,x:1057.95,y:493.1},0).wait(1).to({rotation:10.8425,x:1054.95,y:513.55},0).wait(1).to({rotation:8.7824,x:1052.35,y:532.55},0).wait(1).to({rotation:6.9406,x:1050.3,y:549.9},0).wait(1).to({rotation:5.3138,x:1048.6,y:565.6},0).wait(1).to({rotation:3.9051,x:1047.15,y:579.35},0).wait(1).to({rotation:2.7114,x:1046,y:591.25},0).wait(1).to({rotation:1.736,x:1045.2,y:601.05},0).wait(1).to({rotation:0.9788,x:1044.55,y:608.75},0).wait(1).to({rotation:0.4365,x:1044.1,y:614.35},0).wait(1).to({rotation:0.1091,x:1043.85,y:617.7},0).wait(1).to({rotation:0.0033,x:1043.8,y:618.8},0).wait(1).to({regY:81.1,rotation:0,y:618.85},0).to({_off:true},1).wait(32));

	// play_pause
	this.pausing = new lib.play_pause();
	this.pausing.name = "pausing";
	this.pausing.setTransform(1446.35,19,0.45,0.45,0,0,0,23.4,23.2);

	this.timeline.addTween(cjs.Tween.get(this.pausing).wait(1282).to({regY:22.9},0).wait(1).to({regX:23,regY:23,x:1446.1,alpha:0.9},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.7},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.1},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(34));

	// refresh
	this.again = new lib.repeat();
	this.again.name = "again";
	this.again.setTransform(1511.35,19,0.0806,0.0806,0,0,0,113,113.5);
	new cjs.ButtonHelper(this.again, 0, 1, 2, false, new lib.repeat(), 3);

	this.timeline.addTween(cjs.Tween.get(this.again).wait(1327));

	// sounding
	this.mutte = new lib.sounding();
	this.mutte.name = "mutte";
	this.mutte.setTransform(1479.4,18.95,1,1,0,0,0,10.1,10.3);

	this.timeline.addTween(cjs.Tween.get(this.mutte).wait(1327));

	// hat
	this.instance_2 = new lib.CachedBmp_100();
	this.instance_2.setTransform(1166.25,295.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_101();
	this.instance_3.setTransform(1166.2,283.75,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_102();
	this.instance_4.setTransform(1166.2,275.9,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_103();
	this.instance_5.setTransform(1166.2,262.35,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_104();
	this.instance_6.setTransform(1166.2,252,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_105();
	this.instance_7.setTransform(1166.2,241.2,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_106();
	this.instance_8.setTransform(1166.2,230.1,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_107();
	this.instance_9.setTransform(1166.2,219.8,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_108();
	this.instance_10.setTransform(1166.2,210.55,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_109();
	this.instance_11.setTransform(1166.2,202,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_110();
	this.instance_12.setTransform(1166.2,194.05,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_111();
	this.instance_13.setTransform(1166.2,188.3,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_112();
	this.instance_14.setTransform(1166.2,183.55,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_113();
	this.instance_15.setTransform(1166.2,180.65,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_114();
	this.instance_16.setTransform(1166.2,178.55,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_115();
	this.instance_17.setTransform(1166.2,178.55,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_116();
	this.instance_18.setTransform(1166.2,177.35,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_117();
	this.instance_19.setTransform(1166.2,176.65,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_118();
	this.instance_20.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_119();
	this.instance_21.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_120();
	this.instance_22.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_121();
	this.instance_23.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_122();
	this.instance_24.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_123();
	this.instance_25.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_124();
	this.instance_26.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_125();
	this.instance_27.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_126();
	this.instance_28.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_127();
	this.instance_29.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_128();
	this.instance_30.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_129();
	this.instance_31.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_130();
	this.instance_32.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_131();
	this.instance_33.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_132();
	this.instance_34.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_133();
	this.instance_35.setTransform(1166.2,176.6,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_136();
	this.instance_36.setTransform(1166.2,176.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},1083).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_36}]},10).to({state:[{t:this.instance_36}]},33).to({state:[]},36).wait(131));

	// fill_url
	this.instance_37 = new lib.urlpsd("synched",0);
	this.instance_37.setTransform(1262.55,381.5,0.6736,0.6736,0,0,0,424.9,499.7);
	this.instance_37.alpha = 0.0195;
	this.instance_37._off = true;

	this.duga = new lib.urlpsd();
	this.duga.name = "duga";
	this.duga.setTransform(1262.65,381.5,0.6736,0.6736,0,0,0,424.7,499.7);
	this.duga.alpha = 0;
	this.duga._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1265).to({_off:false},0).wait(1).to({regX:426,regY:246.5,x:1263.25,y:210.9,alpha:0.0526},0).wait(1).to({alpha:0.0853},0).wait(1).to({alpha:0.1179},0).wait(1).to({alpha:0.1505},0).wait(1).to({alpha:0.1832},0).wait(1).to({alpha:0.2158},0).wait(1).to({alpha:0.2484},0).wait(1).to({alpha:0.2811},0).wait(1).to({alpha:0.3137},0).wait(1).to({alpha:0.3463},0).wait(1).to({alpha:0.3789},0).wait(1).to({alpha:0.4116},0).wait(1).to({alpha:0.4442},0).wait(1).to({alpha:0.4768},0).wait(1).to({alpha:0.5095},0).wait(1).to({alpha:0.5421},0).wait(1).to({alpha:0.5747},0).wait(1).to({alpha:0.6074},0).wait(1).to({alpha:0.64},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regY:499.7,x:1262.6,y:381.5,alpha:0.6406,mode:"independent"},0).to({_off:true},22).wait(10));
	this.timeline.addTween(cjs.Tween.get(this.duga).wait(1317).to({_off:false},0).wait(1).to({regX:426,regY:246.5,x:1263.45,y:210.9,alpha:0.0711},0).wait(1).to({alpha:0.1422},0).wait(1).to({alpha:0.2133},0).wait(1).to({alpha:0.2844},0).wait(1).to({alpha:0.3556},0).wait(1).to({alpha:0.4267},0).wait(1).to({alpha:0.4978},0).wait(1).to({alpha:0.5689},0).wait(1).to({alpha:0.64},0).wait(1));

	// Level_1
	this.instance_38 = new lib.face_vs_brain("synched",0);
	this.instance_38.setTransform(1271.45,411.1,0.3731,0.3731,0,0,0,425.9,499.6);

	this.instance_39 = new lib.urlpsd("synched",0);
	this.instance_39.setTransform(1271.65,411.5,0.3731,0.3731,0,0,0,425.4,499.6);
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_38}]},1127).to({state:[{t:this.instance_39}]},69).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_39}]},1).to({state:[]},16).wait(62));
	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1196).to({_off:false},0).wait(1).to({regX:426,regY:246.5,scaleX:0.402,scaleY:0.402,x:1271,y:306.85},0).wait(1).to({scaleX:0.4288,scaleY:0.4288,x:1270.25,y:297.4},0).wait(1).to({scaleX:0.4534,scaleY:0.4534,x:1269.5,y:288.65},0).wait(1).to({scaleX:0.4762,scaleY:0.4762,x:1268.85,y:280.7},0).wait(1).to({scaleX:0.4971,scaleY:0.4971,x:1268.2,y:273.3},0).wait(1).to({scaleX:0.5163,scaleY:0.5163,x:1267.65,y:266.45},0).wait(1).to({scaleX:0.534,scaleY:0.534,x:1267.1,y:260.25},0).wait(1).to({scaleX:0.5501,scaleY:0.5501,x:1266.65,y:254.6},0).wait(1).to({scaleX:0.5648,scaleY:0.5648,x:1266.2,y:249.35},0).wait(1).to({scaleX:0.5782,scaleY:0.5782,x:1265.8,y:244.7},0).wait(1).to({scaleX:0.5904,scaleY:0.5904,x:1265.45,y:240.35},0).wait(1).to({scaleX:0.6015,scaleY:0.6015,x:1265.1,y:236.45},0).wait(1).to({scaleX:0.6115,scaleY:0.6115,x:1264.85,y:232.95},0).wait(1).to({scaleX:0.6205,scaleY:0.6205,x:1264.6,y:229.7},0).wait(1).to({scaleX:0.6286,scaleY:0.6286,x:1264.35,y:226.85},0).wait(1).to({scaleX:0.6359,scaleY:0.6359,x:1264.1,y:224.25},0).wait(1).to({scaleX:0.6425,scaleY:0.6425,x:1263.95,y:221.95},0).wait(1).to({scaleX:0.6483,scaleY:0.6483,x:1263.75,y:219.9},0).wait(1).to({scaleX:0.6535,scaleY:0.6535,x:1263.65,y:218.1},0).wait(1).to({scaleX:0.6581,scaleY:0.6581,x:1263.5,y:216.45},0).wait(1).to({scaleX:0.6621,scaleY:0.6621,x:1263.35,y:215.05},0).wait(1).to({scaleX:0.6657,scaleY:0.6657,x:1263.2,y:213.8},0).wait(1).to({scaleX:0.6688,scaleY:0.6688,x:1263.15,y:212.7},0).wait(1).to({scaleX:0.6715,scaleY:0.6715,x:1263.05,y:211.7},0).wait(1).to({scaleX:0.6736,scaleY:0.6736,x:1263,y:211},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:425.4,regY:499.8,x:1262.6,y:381.5,alpha:0.6406},0).to({_off:true},16).wait(62));

	// rise_up_face
	this.instance_40 = new lib.rise_up_face("synched",0);
	this.instance_40.setTransform(1270.6,362.95,1,1,0,0,0,142.6,183.7);
	this.instance_40._off = true;

	this.face = new lib.rise_up_face();
	this.face.name = "face";
	this.face.setTransform(1266.65,294.8,1.8,1.8,0,0,0,142.6,183.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_40}]},1196).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.face}]},1).wait(78));
	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1196).to({_off:false},0).wait(1).to({regX:141.2,regY:263.3,scaleX:1.0855,scaleY:1.0855,x:1268.65,y:442.05},0).wait(1).to({scaleX:1.1646,scaleY:1.1646,x:1268.15,y:441.6},0).wait(1).to({scaleX:1.2376,scaleY:1.2376,x:1267.65,y:441.2},0).wait(1).to({scaleX:1.3049,scaleY:1.3049,x:1267.25,y:440.85},0).wait(1).to({scaleX:1.3668,scaleY:1.3668,x:1266.85,y:440.5},0).wait(1).to({scaleX:1.4236,scaleY:1.4236,x:1266.45,y:440.15},0).wait(1).to({scaleX:1.4758,scaleY:1.4758,x:1266.2,y:439.85},0).wait(1).to({scaleX:1.5234,scaleY:1.5234,x:1265.85,y:439.55},0).wait(1).to({scaleX:1.567,scaleY:1.567,x:1265.55,y:439.35},0).wait(1).to({scaleX:1.6067,scaleY:1.6067,x:1265.3,y:439.15},0).wait(1).to({scaleX:1.6427,scaleY:1.6427,x:1265.1,y:438.95},0).wait(1).to({scaleX:1.6754,scaleY:1.6754,x:1264.85,y:438.8},0).wait(1).to({scaleX:1.7051,scaleY:1.7051,x:1264.7,y:438.65},0).wait(1).to({scaleX:1.7318,scaleY:1.7318,x:1264.55,y:438.5},0).wait(1).to({scaleX:1.7558,scaleY:1.7558,x:1264.35,y:438.35},0).wait(1).to({scaleX:1.7774,scaleY:1.7774,x:1264.2,y:438.25},0).wait(1).to({scaleX:1.7967,scaleY:1.7967,x:1264.1,y:438.15},0).wait(1).to({scaleX:1.8,scaleY:1.8,y:438.1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(78));

	// black_eye
	this.instance_41 = new lib.CachedBmp_138();
	this.instance_41.setTransform(1123,300.5,0.5,0.5);
	this.instance_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(1221).to({_off:false},0).wait(106));

	// Layer_0_copy_1
	this.instance_42 = new lib.Symbol3();
	this.instance_42.setTransform(1266.05,223.85,1,1,0,0,0,146.2,78.9);
	this.instance_42.alpha = 0;
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(1221).to({_off:false},0).wait(1).to({alpha:0.0825},0).wait(1).to({alpha:0.165},0).wait(1).to({alpha:0.2475},0).wait(1).to({alpha:0.33},0).wait(1).to({alpha:0.2475},0).wait(1).to({alpha:0.165},0).wait(1).to({alpha:0.0825},0).wait(1).to({alpha:0},0).wait(1).to({alpha:0.1125},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.3375},0).wait(1).to({alpha:0.45},0).wait(1).to({alpha:0.3375},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.1125},0).wait(1).to({alpha:0},0).wait(1).to({alpha:0.185},0).wait(1).to({alpha:0.37},0).wait(1).to({alpha:0.555},0).wait(1).to({alpha:0.74},0).wait(1).to({alpha:0.6325},0).wait(1).to({alpha:0.525},0).wait(1).to({alpha:0.4175},0).wait(1).to({alpha:0.31},0).wait(1).to({alpha:0.54},0).wait(1).to({alpha:0.77},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.85},0).wait(1).to({alpha:0.7},0).wait(1).to({alpha:0.545},0).wait(1).to({alpha:0.39},0).wait(43).to({alpha:0.1914},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.26},0).wait(1).to({alpha:0.295},0).wait(1).to({alpha:0.33},0).wait(1).to({x:1266,alpha:0.2475},0).wait(1).to({alpha:0.165},0).wait(1).to({x:1265.95,alpha:0.0825},0).wait(1).to({alpha:0},0).wait(1).to({alpha:0.1125},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.3375},0).wait(1).to({alpha:0.45},0).wait(1).to({alpha:0.38},0).wait(1).to({alpha:0.31},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.17},0).wait(1).to({alpha:0.3125},0).wait(1).to({alpha:0.455},0).wait(1).to({alpha:0.5975},0).wait(1).to({alpha:0.74},0).wait(1).to({alpha:0.6575},0).wait(1).to({alpha:0.575},0).wait(1).to({alpha:0.4925},0).wait(1).to({alpha:0.41},0).wait(1).to({alpha:0.5633},0).wait(1).to({alpha:0.7167},0).wait(1).to({alpha:0.87},0).wait(1).to({alpha:0.825},0).wait(1).to({alpha:0.78},0).wait(1).to({alpha:0.585},0).wait(1).to({alpha:0.39},0).wait(1));

	// foots_final
	this.instance_43 = new lib.bigfootstogether("synched",0);
	this.instance_43.setTransform(1358.5,499.95,1.2,1.2,0,0,0,556.6,454.7);
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(1038).to({_off:false},0).to({_off:true},92).wait(197));

	// circle_text
	this.instance_44 = new lib.circletext("synched",0);
	this.instance_44.setTransform(1263.65,477.55,1.499,1.499,-101.5527,0,0,72.9,107.2);
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(1034).to({_off:false},0).wait(1).to({regX:72.7,regY:0,rotation:-57.0986,x:1128.6,y:390.45},0).wait(1).to({rotation:-12.6442,x:1228.3,y:320.75},0).wait(1).to({rotation:31.8101,x:1348.25,y:340.85},0).wait(1).to({rotation:76.2645,x:1419.85,y:439.2},0).wait(1).to({rotation:37.9689,x:1362.45,y:350.7},0).wait(1).to({rotation:-0.3267,x:1262.6,y:316.85},0).wait(1).to({rotation:-38.6224,x:1163.2,y:352.15},0).wait(1).to({rotation:-76.918,x:1107.05,y:441.4},0).wait(1).to({rotation:-42.5322,x:1154.85,y:359.3},0).wait(1).to({rotation:-8.1465,x:1240.75,y:318.45},0).wait(1).to({rotation:26.2393,x:1334.6,y:333.3},0).wait(1).to({rotation:60.625,x:1403.7,y:398.5},0).wait(1).to({rotation:37.7728,x:1362,y:350.35},0).wait(1).to({rotation:14.9207,x:1304.9,y:322.15},0).wait(1).to({rotation:-7.9315,x:1241.3,y:318.4},0).wait(1).to({rotation:-30.7837,x:1181.2,y:339.6},0).wait(1).to({rotation:-15.5201,x:1220.5,y:322.75},0).wait(1).to({rotation:-0.2565,x:1262.8,y:316.8},0).wait(1).to({rotation:15.0071,x:1305.1,y:322.25},0).wait(1).to({rotation:5.8372,x:1279.85,y:317.65},0).wait(1).to({rotation:-3.3326,x:1254.15,y:317.1},0).wait(1).to({rotation:-12.5025,x:1228.7,y:320.65},0).wait(1).to({rotation:-2.3707,x:1256.85,y:316.95},0).wait(1).to({rotation:7.7611,x:1285.2,y:318.25},0).wait(1).to({rotation:2.5452,x:1270.6,y:317},0).wait(1).to({rotation:-2.6707,x:1256},0).wait(1).to({rotation:1.5,x:1267.7,y:316.85},0).wait(1).to({regX:73.5,regY:107.4,scaleX:1.4989,scaleY:1.4989,rotation:0.0012,x:1263.65,y:477.85},0).to({_off:true},65).wait(200));

	// cut_face
	this.instance_45 = new lib.rise_up_face("synched",0);
	this.instance_45.setTransform(1270.6,362.95,1,1,0,0,0,142.6,183.7);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(1139).to({_off:false},0).wait(1).to({regX:141.2,regY:263.3,x:1269.2,y:442.55,alpha:0.0714},0).wait(1).to({alpha:0.1429},0).wait(1).to({alpha:0.2143},0).wait(1).to({alpha:0.2857},0).wait(1).to({alpha:0.3571},0).wait(1).to({alpha:0.4286},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.5714},0).wait(1).to({alpha:0.6429},0).wait(1).to({alpha:0.7143},0).wait(1).to({alpha:0.7857},0).wait(1).to({alpha:0.8571},0).wait(1).to({alpha:0.9286},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:142.6,regY:183.7,x:1270.6,y:362.95},0).wait(35).to({startPosition:0},0).to({_off:true},1).wait(131));

	// gen_2
	this.instance_46 = new lib.gen();
	this.instance_46.setTransform(1409.9,353.5,1.2,1.2,0,0,0,567.1,294.6);
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(499).to({_off:false},0).wait(1).to({regX:567.7,regY:294.5,x:1410.6,y:353.4},0).wait(1).to({x:1408.25,y:353.55},0).wait(1).to({x:1393.55,y:354.5},0).wait(1).to({x:1355.6,y:357.1},0).wait(1).to({x:1295.5,y:360.4},0).wait(1).to({x:1224.5,y:357.75},0).wait(1).to({x:1164.05,y:323.85},0).wait(1).to({x:1139.15,y:269.2},0).wait(1).to({x:1126.5,y:218.95},0).wait(1).to({x:1119.8,y:186.3},0).wait(1).to({x:1117.3,y:173.6},0).wait(1).to({x:1116.9,y:171.5},0).wait(1).to({x:1116.85,y:171.35},0).wait(1).to({regY:294.6,x:1116.15,y:171.45},0).wait(14).to({regX:567.6,x:1116.2},0).wait(1).to({regX:567.7,regY:294.5,x:1116.3,y:171.35},0).wait(1).to({x:1116.6,y:173.15},0).wait(1).to({x:1118.35,y:185},0).wait(1).to({x:1123.75,y:223.15},0).wait(1).to({x:1133.9,y:298.05},0).wait(1).to({x:1151.3,y:389.1},0).wait(1).to({x:1206.3,y:431.2},0).wait(1).to({x:1287.2,y:412.95},0).wait(1).to({x:1352.65,y:392.65},0).wait(1).to({x:1386.2,y:382.3},0).wait(1).to({x:1396.7,y:379.1},0).wait(1).to({x:1398.25,y:378.65},0).wait(1).to({x:1398.3,y:378.6},0).wait(1).to({regX:567.5,x:1398.1,y:378.65},0).wait(13).to({regX:567.1,regY:294.6,x:1398.3,y:378.7},0).wait(1).to({regX:567.7,regY:294.5,x:1399,y:378.55},0).wait(1).to({x:1397,y:381.5},0).wait(1).to({x:1386.25,y:397.3},0).wait(1).to({x:1362.45,y:433},0).wait(1).to({x:1328.7,y:482.9},0).wait(1).to({x:1282.55,y:528.45},0).wait(1).to({x:1226.5,y:527.45},0).wait(1).to({x:1177.2,y:504.35},0).wait(1).to({x:1141.45,y:483.85},0).wait(1).to({x:1125.25,y:474.15},0).wait(1).to({x:1122.25,y:472.3},0).wait(1).to({x:1122.1,y:472.2},0).wait(1).to({regX:567.1,regY:294.6,x:1121.25,y:472.3},0).wait(13).to({regX:567.4,x:1121.4},0).wait(1).to({regX:567.7,regY:294.5,x:1121.7,y:472.1},0).wait(1).to({x:1121.55,y:470.4},0).wait(1).to({x:1120.3,y:458.85},0).wait(1).to({x:1117.6,y:422.5},0).wait(1).to({x:1123.45,y:351.45},0).wait(1).to({x:1196.85,y:266.7},0).wait(1).to({x:1301.15,y:234.1},0).wait(1).to({x:1366.25,y:224.3},0).wait(1).to({x:1388.45,y:221.95},0).wait(1).to({x:1391.8,y:221.6},0).wait(1).to({x:1392,y:221.55},0).wait(1).to({regX:567.2,regY:294.6,x:1391.55,y:221.65},0).wait(13).to({regX:566.4,regY:293.7,x:1391.75,y:221.9},0).wait(1).to({regX:567.7,regY:294.5,x:1393.35,y:223.05},0).wait(1).to({x:1395.85,y:227.6},0).wait(1).to({x:1407.95,y:249.8},0).wait(1).to({x:1432.55,y:295.95},0).wait(1).to({x:1464.45,y:368.25},0).wait(1).to({x:1468.55,y:459.45},0).wait(1).to({x:1427.9,y:508.15},0).wait(1).to({x:1384.05,y:532},0).wait(1).to({x:1358.4,y:541.85},0).wait(1).to({x:1352.75,y:543.75},0).wait(1).to({x:1352.35,y:543.85},0).wait(1).to({regX:567.5,regY:294.3,x:1350.6,y:542.75},0).wait(12).to({regX:566.9,x:1350.65},0).wait(1).to({regX:567.7,regY:294.5,x:1351.5,y:543},0).wait(1).to({x:1347.35,y:544.3},0).wait(1).to({x:1323.95,y:551.35},0).wait(1).to({x:1270.75,y:563.15},0).wait(1).to({x:1208.15,y:547.35},0).wait(1).to({x:1167.4,y:477.4},0).wait(1).to({x:1140.4,y:424.1},0).wait(1).to({x:1128.5,y:402.7},0).wait(1).to({x:1126.35,y:399},0).wait(1).to({x:1126.25,y:398.85},0).wait(1).to({regX:567.4,regY:294.4,x:1125.4,y:398.7},0).wait(12).to({regX:567.1,x:1125.5,y:398.65},0).wait(1).to({regX:567.7,regY:294.5,x:1126.25},0).wait(1).to({x:1126.65,y:394.3},0).wait(1).to({x:1128.7,y:368.3},0).wait(1).to({x:1130.15,y:309.35},0).wait(1).to({x:1142.35,y:301.7},0).wait(1).to({x:1256.6,y:394.3},0).wait(1).to({x:1364.3,y:439.65},0).wait(1).to({x:1405.35,y:452},0).wait(1).to({x:1412.05,y:453.8},0).wait(1).to({x:1412.3,y:453.85},0).wait(1).to({regX:567.1,regY:294.4,x:1411.4,y:453.75},0).wait(11).to({y:453.85},0).wait(1).to({regX:567.7,regY:294.5,x:1412.05,y:454},0).wait(1).to({x:1408.6,y:456.5},0).wait(1).to({x:1387.55,y:470.85},0).wait(1).to({x:1333.5,y:494.7},0).wait(1).to({x:1267,y:443.2},0).wait(1).to({x:1200.6,y:323.6},0).wait(1).to({x:1146.5,y:276.45},0).wait(1).to({x:1125.45,y:264.7},0).wait(1).to({x:1122,y:263.05},0).wait(1).to({x:1121.85,y:262.95},0).wait(1).to({regX:567.1,regY:294.4,x:1121.2,y:262.85},0).wait(10).to({regX:566.1,regY:294.3,x:1121.3},0).wait(1).to({regX:567.7,regY:294.5,x:1123.35,y:263.05},0).wait(1).to({x:1128.5,y:260.6},0).wait(1).to({x:1159.35,y:244.1},0).wait(1).to({x:1233.5,y:187.15},0).wait(1).to({x:1315.6,y:129.4},0).wait(1).to({x:1374.8,y:161.85},0).wait(1).to({x:1399.5,y:182.55},0).wait(1).to({x:1403.6,y:186.2},0).wait(1).to({x:1403.75,y:186.3},0).wait(1).to({regX:566.2,regY:294.3,x:1401.65,y:186.1},0).wait(12).to({regX:565.8,regY:294.2,x:1401.85},0).wait(1).to({regX:567.7,regY:294.5,x:1404.1,y:186.45,alpha:0.9444},0).wait(1).to({y:186.55,alpha:0.8889},0).wait(1).to({x:1404.15,y:187.2,alpha:0.8333},0).wait(1).to({y:189.55,alpha:0.7778},0).wait(1).to({x:1404.05,y:195.8,alpha:0.7222},0).wait(1).to({x:1403.45,y:209.25,alpha:0.6667},0).wait(1).to({x:1400.2,y:233.9,alpha:0.6111},0).wait(1).to({x:1388.25,y:272.8,alpha:0.5556},0).wait(1).to({x:1351.1,y:323.7,alpha:0.5},0).wait(1).to({x:1292.2,y:358.2,alpha:0.4444},0).wait(1).to({x:1245.75,y:371.25,alpha:0.3889},0).wait(1).to({x:1215.9,y:375.95,alpha:0.3333},0).wait(1).to({x:1199.55,y:377.65,alpha:0.2778},0).wait(1).to({x:1191.9,y:378.2,alpha:0.2222},0).wait(1).to({x:1189.05,y:378.4,alpha:0.1667},0).wait(1).to({x:1188.25,y:378.45,alpha:0.1111},0).wait(1).to({x:1188.15,alpha:0.0556},0).wait(1).to({x:1188.1,alpha:0},0).to({_off:true},1).wait(60).to({_off:false,regX:567.4,regY:294.6,x:1002,y:526.2},0).wait(1).to({regX:567.7,regY:294.5,x:1002.55,alpha:0.125},0).wait(1).to({x:1011,y:530.5,alpha:0.25},0).wait(1).to({x:1066.85,y:555.4,alpha:0.375},0).wait(1).to({x:1244.75,y:580.65,alpha:0.5},0).wait(1).to({x:1377.95,y:500.55,alpha:0.625},0).wait(1).to({x:1406.3,y:460.85,alpha:0.75},0).wait(1).to({x:1410.2,y:454.3,alpha:0.875},0).wait(1).to({x:1410.3,y:454.15,alpha:1},0).wait(1).to({regX:567.8,regY:294.6,x:1409.8,y:454.2},0).wait(9).to({regX:567.1,x:1409.95},0).wait(1).to({regX:567.7,regY:294.5,x:1410.5,y:454.15},0).wait(1).to({x:1404.1,y:457.4},0).wait(1).to({x:1364.35,y:475.95},0).wait(1).to({x:1257.7,y:490.75},0).wait(1).to({x:1163.8,y:421.1},0).wait(1).to({x:1131.95,y:387.7},0).wait(1).to({x:1126.85,y:382.25},0).wait(1).to({x:1126.7,y:382.1},0).wait(1).to({regX:567.5,regY:294.6,x:1125.9,y:382.2},0).wait(9).to({regX:566.4,x:1126},0).wait(1).to({regX:567.7,regY:294.5,x:1127.65,y:381.9},0).wait(1).to({x:1131.9,y:374.2},0).wait(1).to({x:1156.95,y:326.3},0).wait(1).to({x:1223.25,y:215},0).wait(1).to({x:1338.7,y:207.2},0).wait(1).to({x:1393.95,y:222.9},0).wait(1).to({x:1403.3,y:225.85},0).wait(1).to({x:1403.55,y:225.95},0).wait(1).to({regX:566.8,regY:294.7,x:1402,y:226.2},0).wait(9).to({regX:566.1,regY:293.7,x:1402.1,y:226.35},0).wait(1).to({regX:567.7,regY:294.5,x:1403.9,y:227.45},0).wait(1).to({x:1399.35,y:232.7},0).wait(1).to({x:1371.75,y:265.3},0).wait(1).to({x:1294.1,y:336.2},0).wait(1).to({x:1184.2,y:329.4},0).wait(1).to({x:1136.85,y:314.2},0).wait(1).to({x:1128.95,y:311.45},0).wait(1).to({x:1128.75,y:311.4},0).wait(1).to({regX:566.3,regY:294.2,x:1126.65,y:310.25},0).wait(9).to({regY:293.9,x:1126.7,y:310.4},0).wait(1).to({regX:567.7,regY:294.5,x:1128.35,y:311.1,alpha:0.8},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(453));

	// po_angliyski_copy
	this.instance_47 = new lib.poangliyski();
	this.instance_47.setTransform(1403.9,361.85,60,60,0,0,0,251.8,40.1);
	this.instance_47.alpha = 0;
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(939).to({_off:false},0).wait(1).to({regX:94,regY:69.7,scaleX:54.2426,scaleY:54.2426,x:-7155.8,y:1967.35},0).wait(1).to({scaleX:48.7835,scaleY:48.7835,x:-6294.55,y:1805.75,alpha:0.0004},0).wait(1).to({scaleX:43.6136,scaleY:43.6136,x:-5478.95,y:1652.65,alpha:0.0034},0).wait(1).to({scaleX:38.745,scaleY:38.745,x:-4710.85,y:1508.5,alpha:0.0146},0).wait(1).to({scaleX:34.1656,scaleY:34.1656,x:-3988.5,y:1372.95,alpha:0.0446},0).wait(1).to({scaleX:29.8845,scaleY:29.8845,x:-3313.15,y:1246.25,alpha:0.111},0).wait(1).to({scaleX:25.8986,scaleY:25.8986,x:-2684.4,y:1128.3,alpha:0.24},0).wait(1).to({scaleX:22.208,scaleY:22.208,x:-2102,y:1018.85,alpha:0.468},0).wait(1).to({scaleX:18.8156,scaleY:18.8156,x:-1566.7,y:918.25,alpha:0.8434},0).wait(1).to({scaleX:15.7155,scaleY:15.7155,x:-1077.5,y:826.3,alpha:1},0).wait(1).to({scaleX:12.9076,scaleY:12.9076,x:-634.4,y:743.05},0).wait(1).to({scaleX:10.398,scaleY:10.398,x:-238.4,y:668.7},0).wait(1).to({scaleX:8.1866,scaleY:8.1866,x:110.6,y:603.05},0).wait(1).to({scaleX:6.2645,scaleY:6.2645,x:413.85,y:546.1},0).wait(1).to({scaleX:4.6406,scaleY:4.6406,x:670.05,y:497.9},0).wait(1).to({scaleX:3.315,scaleY:3.315,x:879.25,y:458.6},0).wait(1).to({scaleX:2.2786,scaleY:2.2786,x:1042.8,y:427.85},0).wait(1).to({scaleX:1.5405,scaleY:1.5405,x:1159.3,y:406},0).wait(1).to({scaleX:1.0976,scaleY:1.0976,x:1229.2,y:392.85},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:1252.45,y:388.5},0).wait(1).to({regX:252.2,regY:41,scaleX:0.89,scaleY:0.89,x:1402.35,y:360.4},0).wait(1).to({regX:94,regY:69.7,scaleX:0.8884,scaleY:0.8884,x:1261.8,y:385.85},0).wait(1).to({scaleX:0.8868,scaleY:0.8868,x:1262.05,y:385.8},0).wait(1).to({scaleX:0.8852,scaleY:0.8852,x:1262.3,y:385.75},0).wait(1).to({scaleX:0.8836,scaleY:0.8836,x:1262.55},0).wait(1).to({scaleX:0.882,scaleY:0.882,x:1262.8,y:385.65},0).wait(1).to({scaleX:0.8804,scaleY:0.8804,x:1263.05,y:385.6},0).wait(1).to({scaleX:0.8788,scaleY:0.8788,x:1263.3},0).wait(1).to({scaleX:0.8772,scaleY:0.8772,x:1263.55,y:385.55},0).wait(1).to({scaleX:0.8756,scaleY:0.8756,x:1263.8,y:385.5},0).wait(1).to({scaleX:0.874,scaleY:0.874,x:1264.05,y:385.45},0).wait(1).to({scaleX:0.8724,scaleY:0.8724,x:1264.3,y:385.4},0).wait(1).to({scaleX:0.8708,scaleY:0.8708,x:1264.55,y:385.35},0).wait(1).to({scaleX:0.8692,scaleY:0.8692,x:1264.8},0).wait(1).to({scaleX:0.8676,scaleY:0.8676,x:1265.1,y:385.25},0).wait(1).to({scaleX:0.866,scaleY:0.866,x:1265.35,y:385.2},0).wait(1).to({scaleX:0.8644,scaleY:0.8644,x:1265.6,y:385.15},0).wait(1).to({scaleX:0.8628,scaleY:0.8628,x:1265.85},0).wait(1).to({scaleX:0.8612,scaleY:0.8612,x:1266.1,y:385.05},0).wait(1).to({scaleX:0.8596,scaleY:0.8596,x:1266.35,y:385},0).wait(1).to({scaleX:0.858,scaleY:0.858,x:1266.6},0).wait(1).to({scaleX:0.8564,scaleY:0.8564,x:1266.85,y:384.95},0).wait(1).to({scaleX:0.8548,scaleY:0.8548,x:1267.1,y:384.9},0).wait(1).to({scaleX:0.8532,scaleY:0.8532,x:1267.35,y:384.85},0).wait(1).to({scaleX:0.8516,scaleY:0.8516,x:1267.6,y:384.8},0).wait(1).to({scaleX:0.85,scaleY:0.85,x:1267.85,y:384.75},0).wait(1).to({regX:252.2,regY:41,scaleX:0.8,scaleY:0.8,x:1402.4,y:360.35},0).wait(1).to({regX:94,regY:69.7,scaleX:0.7385,scaleY:0.7385,x:1285.55,y:381.5},0).wait(1).to({scaleX:0.6769,scaleY:0.6769,x:1295.3,y:379.75},0).wait(1).to({scaleX:0.6154,scaleY:0.6154,x:1305.05,y:378},0).wait(1).to({scaleX:0.5538,scaleY:0.5538,x:1314.75,y:376.2},0).wait(1).to({scaleX:0.4923,scaleY:0.4923,x:1324.5,y:374.45},0).wait(1).to({scaleX:0.4308,scaleY:0.4308,x:1334.25,y:372.65},0).wait(1).to({scaleX:0.3692,scaleY:0.3692,x:1343.95,y:370.95},0).wait(1).to({scaleX:0.3077,scaleY:0.3077,x:1353.7,y:369.15},0).wait(1).to({scaleX:0.2462,scaleY:0.2462,x:1363.45,y:367.4},0).wait(1).to({scaleX:0.1846,scaleY:0.1846,x:1373.15,y:365.6},0).wait(1).to({scaleX:0.1231,scaleY:0.1231,x:1382.9,y:363.9},0).wait(1).to({scaleX:0.0615,scaleY:0.0615,x:1392.65,y:362.1},0).wait(1).to({scaleX:0,scaleY:0,x:-1402.4,y:-360.3},0).wait(2).to({_off:true},1).wait(325));

	// po_angliyski
	this.instance_48 = new lib.imperativemood_2("synched",0);
	this.instance_48.setTransform(972.85,17.7,1.2,1.2,0,0,0,0.1,0);
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(932).to({_off:false},0).to({_off:true},71).wait(324));

	// ushel___
	this.instance_49 = new lib.do_support_2("synched",0,false);
	this.instance_49.setTransform(943.05,-24.6,1.2,1.2);
	this.instance_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(895).to({_off:false},0).to({_off:true},71).wait(361));

	// esli_angliyskiy
	this.instance_50 = new lib.wh_movement_2("synched",0);
	this.instance_50.setTransform(300.35,-153.7,1.2,1.2);
	this.instance_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(862).to({_off:false},0).to({_off:true},71).wait(394));

	// angliyskiy
	this.instance_51 = new lib.angliyskiy_2("synched",0);
	this.instance_51.setTransform(1011.7,-144,1.2,1.2);

	this.instance_52 = new lib.angliyskiy();
	this.instance_52.setTransform(1381.4,180.95,0.336,0.336,0,0,0,252.7,41.4);
	this.instance_52._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_51}]},701).to({state:[{t:this.instance_52}]},30).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},22).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_52}]},1).to({state:[]},1).wait(520));
	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(731).to({_off:false},0).wait(1).to({regX:312,regY:34.7,x:1401.3,y:178.65},0).wait(1).to({x:1401.35,y:178.7},0).wait(1).to({x:1401.45},0).wait(1).to({x:1401.95},0).wait(1).to({x:1403.25,y:178.8},0).wait(1).to({x:1406.1,y:178.95},0).wait(1).to({x:1411.55,y:179.25},0).wait(1).to({x:1421.05,y:179.9},0).wait(1).to({x:1436.25,y:181.2},0).wait(1).to({x:1458.55,y:183.65},0).wait(1).to({x:1487.9,y:188.65},0).wait(1).to({x:1519.75,y:198.85},0).wait(1).to({x:1537.35,y:219.65},0).wait(1).to({x:1519.8,y:247.2},0).wait(1).to({x:1487.95,y:269.6},0).wait(1).to({x:1458.55,y:285.8},0).wait(1).to({x:1436.25,y:296.8},0).wait(1).to({x:1421.1,y:303.85},0).wait(1).to({x:1411.55,y:308.15},0).wait(1).to({x:1406.1,y:310.6},0).wait(1).to({x:1403.25,y:311.85},0).wait(1).to({x:1401.95,y:312.4},0).wait(1).to({x:1401.5,y:312.6},0).wait(1).to({x:1401.35,y:312.65},0).wait(2).to({x:1401.3},0).wait(1).to({regX:252.7,regY:41.5,x:1381.35,y:314.9},0).wait(1).to({regX:312,regY:34.7,x:1401.25,y:312.55},0).wait(1).to({x:1401.2,y:312.5},0).wait(1).to({x:1400.85,y:311.85},0).wait(1).to({x:1399.4,y:309.6},0).wait(1).to({x:1395.5,y:303.45},0).wait(1).to({x:1386.95,y:289.9},0).wait(1).to({x:1370.25,y:263.55},0).wait(1).to({x:1353.6,y:237.25},0).wait(1).to({x:1345.05,y:223.7},0).wait(1).to({x:1341.15,y:217.55},0).wait(1).to({x:1339.75,y:215.3},0).wait(1).to({x:1339.35,y:214.65},0).wait(1).to({x:1339.3,y:214.6},0).wait(1).to({x:1339.25,y:214.55},0).wait(1).to({regX:252.7,regY:41.6,x:1319.3,y:216.95},0).wait(22).to({regX:252.6},0).wait(1).to({regX:312,regY:34.7,x:1339.25,y:214.55,alpha:0.8571},0).wait(1).to({alpha:0.7143},0).wait(1).to({alpha:0.5714},0).wait(1).to({alpha:0.4286},0).wait(1).to({alpha:0.2857},0).wait(1).to({alpha:0.1429},0).wait(1).to({alpha:0},0).wait(4).to({_off:true},1).wait(520));

	// svoi
	this.instance_53 = new lib.svoi("synched",0);
	this.instance_53.setTransform(2354.45,255.9,60,60,0,0,0,248.8,19.9);
	this.instance_53.alpha = 0;
	this.instance_53._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(682).to({_off:false},0).wait(1).to({regX:114.5,regY:27.3,scaleX:51.4205,scaleY:51.4207,x:-4600.3,y:635.95},0).wait(1).to({scaleX:43.528,scaleY:43.5285,x:-3589.35,y:577.05,alpha:0.0024},0).wait(1).to({scaleX:36.3226,scaleY:36.3233,x:-2670.7,y:523.15,alpha:0.0194},0).wait(1).to({scaleX:29.7998,scaleY:29.8008,x:-1843.8,y:474.25,alpha:0.0819},0).wait(1).to({scaleX:23.9686,scaleY:23.9697,x:-1109.8,y:430.45,alpha:0.25},0).wait(1).to({scaleX:18.82,scaleY:18.8212,x:-467.5,y:391.7,alpha:0.6223},0).wait(1).to({scaleX:14.3585,scaleY:14.3598,x:82.45,y:357.95,alpha:1},0).wait(1).to({scaleX:10.584,scaleY:10.5855,x:483.55,y:331.25},0).wait(1).to({scaleX:7.4922,scaleY:7.4937,x:793,y:309.6},0).wait(1).to({scaleX:5.0918,scaleY:5.0935,x:1009.45,y:293},0).wait(1).to({scaleX:3.3742,scaleY:3.3759,x:1134.25,y:281.4},0).wait(1).to({scaleX:2.3435,scaleY:2.3453,x:1166.75,y:274.95},0).wait(1).to({scaleX:2,scaleY:2.0018,x:1106.95,y:273.45},0).wait(1).to({regX:252.2,regY:40.8,scaleX:0.7227,scaleY:0.7234,x:1224.7,y:258.8},0).wait(1).to({regX:114.5,regY:27.3,x:1125.15,y:249},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:252.2,regY:41.4,x:1224.7,y:258.9},0).wait(1).to({regX:114.5,regY:27.3,x:1125.15,y:248.65},0).wait(1).to({x:1125.2},0).wait(1).to({x:1125.3},0).wait(1).to({x:1125.65},0).wait(1).to({x:1126.65},0).wait(1).to({x:1128.8},0).wait(1).to({x:1133.05},0).wait(1).to({x:1140.55},0).wait(1).to({x:1152.9},0).wait(1).to({x:1172.15},0).wait(1).to({x:1200.8},0).wait(1).to({x:1242},0).wait(1).to({x:1299.5},0).wait(1).to({x:1357},0).wait(1).to({x:1398.25},0).wait(1).to({x:1426.9},0).wait(1).to({x:1446.15},0).wait(1).to({x:1458.5},0).wait(1).to({x:1465.95},0).wait(1).to({x:1470.2},0).wait(1).to({x:1472.4},0).wait(1).to({x:1473.4},0).wait(1).to({x:1473.75},0).wait(1).to({x:1473.85},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:252.7,regY:41.6,scaleX:0.72,scaleY:0.72,x:1573.5,y:258.95,mode:"independent"},0).wait(1).to({regX:114.5,regY:27.3,x:1473.95,y:248.6},0).wait(2).to({x:1473.9,y:248.65},0).wait(1).to({x:1473.65},0).wait(1).to({x:1473},0).wait(1).to({x:1471.55},0).wait(1).to({x:1468.75},0).wait(1).to({x:1463.75},0).wait(1).to({x:1455.6},0).wait(1).to({x:1442.85},0).wait(1).to({x:1423.8},0).wait(1).to({x:1396.45},0).wait(1).to({x:1369.15},0).wait(1).to({x:1350.1},0).wait(1).to({x:1337.35},0).wait(1).to({x:1329.2},0).wait(1).to({x:1324.2},0).wait(1).to({x:1321.4},0).wait(1).to({x:1319.95},0).wait(1).to({x:1319.3},0).wait(1).to({x:1319.05},0).wait(1).to({x:1319},0).wait(2).to({x:1318.95},0).wait(1).to({regX:252.7,regY:41.6,x:1418.5,y:258.95},0).wait(22).to({regX:252.6,x:1418.45},0).wait(1).to({regX:114.5,regY:27.3,x:1330.45,y:248.6,alpha:0.8571},0).wait(1).to({x:1341.9,alpha:0.7143},0).wait(1).to({x:1353.3,alpha:0.5714},0).wait(1).to({x:1364.75,alpha:0.4286},0).wait(1).to({x:1376.15,alpha:0.2857},0).wait(1).to({x:1387.6,alpha:0.1429},0).wait(1).to({x:1399,alpha:0},0).wait(2).to({_off:true},1).wait(520));

	// svoi
	this.instance_54 = new lib.svoi_2("synched",0);
	this.instance_54.setTransform(627.6,-66.15,1.2,1.2,0,0,0,0,-0.1);
	this.instance_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(675).to({_off:false},0).to({_off:true},48).wait(604));

	// uderzhi
	this.instance_55 = new lib.uderzhi_2("synched",0);
	this.instance_55.setTransform(1126.9,112.75,1.2,1.2);

	this.instance_56 = new lib.uderzhi();
	this.instance_56.setTransform(1576.95,438.1,0.48,0.48,0,0,0,252.4,41.1);
	this.instance_56._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_55}]},653).to({state:[{t:this.instance_56}]},66).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},22).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_56}]},1).to({state:[]},1).wait(522));
	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(719).to({_off:false},0).wait(1).to({regX:185.6,regY:67.7,x:1544.85,y:450.8},0).wait(1).to({y:450.85},0).wait(1).to({x:1544.7},0).wait(1).to({x:1544.05},0).wait(1).to({x:1542.3,y:450.95},0).wait(1).to({x:1538.45,y:451.15},0).wait(1).to({x:1531.05,y:451.45},0).wait(1).to({x:1518.35,y:451.8},0).wait(1).to({x:1498.35,y:451.85},0).wait(1).to({x:1469.35,y:450.65},0).wait(1).to({x:1431.1,y:445.85},0).wait(1).to({x:1386.5,y:432.7},0).wait(1).to({x:1344.85,y:402.2},0).wait(1).to({x:1327.05,y:357.45},0).wait(1).to({x:1329.05,y:316.6},0).wait(1).to({x:1337.65,y:283.9},0).wait(1).to({x:1346.8,y:259.95},0).wait(1).to({x:1354.05,y:243.75},0).wait(1).to({x:1359,y:233.6},0).wait(1).to({x:1362,y:227.75},0).wait(1).to({x:1363.6,y:224.7},0).wait(1).to({x:1364.3,y:223.3},0).wait(1).to({x:1364.6,y:222.8},0).wait(1).to({x:1364.65,y:222.65},0).wait(2).to({y:222.6},0).wait(1).to({regX:252.4,regY:41.1,x:1396.75,y:209.95},0).wait(1).to({regX:185.6,regY:67.7,x:1364.65,y:222.65},0).wait(1).to({x:1364.7,y:222.7},0).wait(2).to({y:222.85},0).wait(1).to({x:1364.75,y:223.25},0).wait(1).to({x:1364.9,y:224.1},0).wait(1).to({x:1365.2,y:225.75},0).wait(1).to({x:1365.75,y:228.65},0).wait(1).to({x:1366.55,y:233.45},0).wait(1).to({x:1367.9,y:240.95},0).wait(1).to({x:1369.85,y:252.1},0).wait(1).to({x:1372.65,y:268.15},0).wait(1).to({x:1375.5,y:284.25},0).wait(1).to({x:1377.45,y:295.4},0).wait(1).to({x:1378.8,y:302.9},0).wait(1).to({x:1379.6,y:307.7},0).wait(1).to({x:1380.15,y:310.6},0).wait(1).to({x:1380.4,y:312.25},0).wait(1).to({x:1380.55,y:313.1},0).wait(1).to({x:1380.65,y:313.5},0).wait(1).to({y:313.65},0).wait(4).to({regX:252.3,regY:41.1,x:1412.65,y:300.9},0).wait(23).to({regX:185.6,regY:67.7,x:1380.6,y:313.6,alpha:0.8571},0).wait(1).to({alpha:0.7143},0).wait(1).to({alpha:0.5714},0).wait(1).to({alpha:0.4286},0).wait(1).to({alpha:0.2857},0).wait(1).to({alpha:0.1429},0).wait(1).to({alpha:0},0).wait(4).to({_off:true},1).wait(522));

	// present_perfect
	this.instance_57 = new lib.presentperfect_2("synched",0,false);
	this.instance_57.setTransform(963.6,121.2,1.2,1.2);
	this.instance_57._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(785).to({_off:false},0).to({_off:true},51).wait(491));

	// contracted_forms
	this.instance_58 = new lib.contractedforms_2_2("synched",0,false);
	this.instance_58.setTransform(539.8,74.5,1.2,1.2);
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(620).to({_off:false},0).to({_off:true},37).wait(670));

	// indirect_questions
	this.instance_59 = new lib.indirectquestions_2_2("synched",0);
	this.instance_59.setTransform(913.1,211.35,1.2,1.2,0,0,0,0,0.1);
	this.instance_59._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(597).to({_off:false},0).to({_off:true},34).wait(696));

	// relative_pronouns
	this.instance_60 = new lib.relativepronouns_2("synched",0);
	this.instance_60.setTransform(1049.9,-112.15,1.2,1.2);
	this.instance_60._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(571).to({_off:false},0).to({_off:true},39).wait(717));

	// auxiliary_verbs
	this.instance_61 = new lib.auxiliaryverbs_2("synched",0);
	this.instance_61.setTransform(656.25,153.75,1.2,1.2,0,0,0,0,0.1);
	this.instance_61._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(544).to({_off:false},0).to({_off:true},40).wait(743));

	// past_continuous
	this.instance_62 = new lib.pastcontinuous_2("synched",0);
	this.instance_62.setTransform(1095.75,55.95,1.2,1.2,0,0,0,0.1,0.1);
	this.instance_62._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(517).to({_off:false},0).to({_off:true},41).wait(769));

	// future_simple
	this.instance_63 = new lib.futuresimple_2("synched",0);
	this.instance_63.setTransform(623,-180.6,1.2,1.2);
	this.instance_63._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(489).to({_off:false},0).to({_off:true},42).wait(796));

	// generator_fraz
	this.instance_64 = new lib.generatorfraz_2("synched",0);
	this.instance_64.setTransform(2420.25,105.6,1.2,1.2);
	this.instance_64._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(439).to({_off:false},0).to({_off:true},60).wait(828));

	// propadaut
	this.instance_65 = new lib.propadaut();
	this.instance_65.setTransform(1277,588.15,1.212,1.212,0,0,0,49.9,45.5);
	this.instance_65._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(297).to({_off:false},0).wait(60).to({regY:45.4,x:1277.2,y:588.05},0).wait(1).to({regX:66.9,regY:29,x:1297.75,y:568.15},0).wait(1).to({x:1297.9},0).wait(1).to({x:1299,y:567.9},0).wait(1).to({x:1302.8,y:567},0).wait(1).to({x:1312.5,y:564.35},0).wait(1).to({x:1330.85,y:557.7},0).wait(1).to({x:1354.7,y:541.1},0).wait(1).to({x:1365.7,y:498},0).wait(1).to({x:1362.9,y:437.8},0).wait(1).to({x:1368.2,y:398.2},0).wait(1).to({x:1374.75,y:376.8},0).wait(1).to({x:1378.65,y:367},0).wait(1).to({x:1380.25,y:363.35},0).wait(1).to({x:1380.7,y:362.35},0).wait(1).to({x:1380.75,y:362.2},0).wait(2).to({regX:49.9,regY:45.5,x:1360.1,y:382.1},0).wait(1).to({regX:66.9,regY:29,x:1380.65,y:362.05},0).wait(2).to({x:1380.5},0).wait(1).to({x:1380},0).wait(1).to({x:1378.55},0).wait(1).to({x:1375.4},0).wait(1).to({x:1369.3},0).wait(1).to({x:1358.45},0).wait(1).to({x:1340.65},0).wait(1).to({x:1315.75},0).wait(1).to({x:1297.95},0).wait(1).to({x:1287.15},0).wait(1).to({x:1281},0).wait(1).to({x:1277.85},0).wait(1).to({x:1276.4},0).wait(1).to({x:1275.9},0).wait(1).to({x:1275.75},0).wait(2).to({x:1275.7},0).wait(1).to({regX:50,regY:45.5,scaleX:1.2119,scaleY:1.2119,x:1255.25,y:382.05},0).wait(53).to({regX:49.9,regY:45.4,scaleX:1.212,scaleY:1.212,x:1215.05,y:382},0).wait(1).to({regX:66.9,regY:29,x:1235.6,y:362.1,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(871));

	// znaniya
	this.instance_66 = new lib.znaniya();
	this.instance_66.setTransform(1485.6,203,0.6,0.6,0,0,0,270.2,40.1);
	this.instance_66._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(309).to({_off:false},0).wait(48).to({regX:270.1,regY:39.9,x:1485.55},0).wait(1).to({regX:116.8,regY:46.7,x:1387.9,y:208.35},0).wait(1).to({x:1382.2,y:209.8},0).wait(1).to({x:1375.95,y:211.5},0).wait(1).to({x:1368.05,y:213.95},0).wait(1).to({x:1356.4,y:218.1},0).wait(1).to({x:1337.75,y:226.25},0).wait(1).to({x:1308.7,y:243.65},0).wait(1).to({x:1269.15,y:281.75},0).wait(1).to({x:1242.25,y:329.25},0).wait(1).to({x:1232.35,y:360.75},0).wait(1).to({x:1228.6,y:379.9},0).wait(1).to({x:1227.1,y:391.6},0).wait(1).to({x:1226.35,y:399.3},0).wait(1).to({x:1225.95,y:405.35},0).wait(1).to({x:1225.7,y:410.85},0).wait(1).to({x:1225.5,y:416.2},0).wait(1).to({regX:270.1,regY:39.9,x:1317.55,y:412.15},0).wait(1).to({regX:116.8,regY:46.7,x:1225.55,y:416.15},0).wait(1).to({x:1225.6},0).wait(1).to({x:1225.8},0).wait(1).to({x:1226.5},0).wait(1).to({x:1228.5},0).wait(1).to({x:1232.8},0).wait(1).to({x:1241.25},0).wait(1).to({x:1256.15},0).wait(1).to({x:1280.65},0).wait(1).to({x:1314.85},0).wait(1).to({x:1339.35},0).wait(1).to({x:1354.25},0).wait(1).to({x:1362.65},0).wait(1).to({x:1367},0).wait(1).to({x:1368.95},0).wait(1).to({x:1369.7},0).wait(1).to({x:1369.9},0).wait(3).to({regX:270.2,regY:40,x:1461.9,y:412.15},0).wait(5).to({regX:270.1,regY:39.9},0).wait(1).to({regX:116.8,regY:46.7,x:1369.9,y:416.15},0).wait(1).to({rotation:-31.8795,x:1385.9,y:464.2},0).wait(1).to({rotation:-64.1932,x:1425.45,y:496.7},0).wait(1).to({rotation:-120.369,x:1511.9,y:489.45},0).wait(1).to({rotation:-134.544,x:1529.3,y:474.8},0).wait(1).to({rotation:-138.582,x:1533.55,y:469.95},0).wait(1).to({rotation:-133.599,x:1528.25,y:475.95},0).wait(1).to({rotation:-120.369,x:1511.9,y:489.45},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({rotation:-69.9862,x:1434.25,y:499.95},0).wait(1).to({rotation:-62,x:1422.3,y:495.2},0).wait(1).to({rotation:-68.2162,x:1431.5,y:499.05},0).wait(1).to({rotation:-77.1285,x:1445.35,y:502.7},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({rotation:-104,x:1488.1,y:500.35},0).wait(1).to({rotation:-107,x:1492.65,y:498.9},0).wait(1).to({rotation:-104,x:1488.1,y:500.35},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({rotation:-80.2433,x:1450.25,y:503.45},0).wait(1).to({rotation:-77.5558,x:1446.05,y:502.8},0).wait(1).to({rotation:-80.2433,x:1450.25,y:503.45},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({rotation:-95,x:1473.95,y:503.4},0).wait(1).to({rotation:-97,x:1477.1,y:502.95},0).wait(1).to({rotation:-95,x:1473.95,y:503.4},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({rotation:-87.5282,x:1461.95,y:504.2},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({rotation:-92,x:1469.15,y:503.85},0).wait(1).to({rotation:-89,x:1464.3,y:504.2},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({rotation:-91,x:1467.55,y:504},0).wait(1).to({rotation:-90,x:1465.95,y:504.05},0).wait(1).to({regX:270.2,regY:40,x:1461.85,y:412.1},0).wait(2).to({regX:269.2,regY:39.9,y:412.2},0).wait(1).to({regX:116.8,regY:46.7,x:1465.85,y:510.7},0).wait(1).to({y:532.05},0).wait(1).to({y:567.75},0).wait(1).to({y:617.55},0).wait(1).to({y:681.7},0).wait(1).to({y:760.2},0).wait(1).to({y:852.8,alpha:0.5},0).wait(1).to({y:888.5,alpha:0},0).wait(1).to({_off:true},1).wait(882));

	// bf2
	this.instance_67 = new lib.big_foots("synched",0);
	this.instance_67.setTransform(1488.8,547.1,1.2,1.2,0,0,0,556.8,454.7);
	this.instance_67._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(297).to({_off:false},0).to({_off:true},60).wait(970));

	// steps2
	this.instance_68 = new lib.step_sound("synched",0,false);
	this.instance_68.setTransform(1395.8,415.15,1.2,1.2,0,0,0,483.4,345.2);
	this.instance_68._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(200).to({_off:false},0).to({_off:true},138).wait(989));

	// uhodit
	this.instance_69 = new lib.uhodit();
	this.instance_69.setTransform(1276.1,564.15,1.212,1.212,0,0,0,50,45.5);
	this.instance_69._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(125).to({_off:false},0).wait(60).to({regX:50.1,regY:45.4,x:1276.2,y:564.05},0).wait(1).to({regX:34.1,regY:51.2,x:1256.8,y:571.05},0).wait(1).to({x:1256.95},0).wait(1).to({x:1258.05,y:570.8},0).wait(1).to({x:1261.85,y:569.85},0).wait(1).to({x:1271.75,y:567.2},0).wait(1).to({x:1291.25,y:560.25},0).wait(1).to({x:1319.75,y:542.45},0).wait(1).to({x:1344.7,y:495.9},0).wait(1).to({x:1355.95,y:432.25},0).wait(1).to({x:1365.95,y:391.45},0).wait(1).to({x:1373.55,y:369.75},0).wait(1).to({x:1377.65,y:359.9},0).wait(1).to({x:1379.3,y:356.25},0).wait(1).to({x:1379.75,y:355.25},0).wait(1).to({x:1379.8,y:355.1},0).wait(2).to({regX:50.1,regY:45.4,x:1399.2,y:348},0).wait(1).to({regX:34.1,regY:51.2,x:1379.8,y:355},0).wait(2).to({x:1379.75},0).wait(1).to({x:1379.55,y:355.05},0).wait(1).to({x:1378.95},0).wait(1).to({x:1377.6},0).wait(1).to({x:1375.05},0).wait(1).to({x:1370.5},0).wait(1).to({x:1363.05},0).wait(1).to({x:1352.6},0).wait(1).to({x:1345.15},0).wait(1).to({x:1340.6},0).wait(1).to({x:1338.05},0).wait(1).to({x:1336.7},0).wait(1).to({x:1336.1},0).wait(1).to({x:1335.9},0).wait(1).to({x:1335.85},0).wait(2).to({x:1335.8},0).wait(1).to({regX:50.1,regY:45.4,scaleX:1.2119,scaleY:1.2119,x:1355.1,y:348},0).wait(51).to({scaleX:1.212,scaleY:1.212,x:1355.2},0).wait(1).to({regX:34.1,regY:51.2,x:1335.8,y:355,alpha:0.9333},0).wait(1).to({alpha:0.8667},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.7333},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.5333},0).wait(1).to({alpha:0.4667},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2667},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.1333},0).wait(1).to({alpha:0.0667},0).wait(1).to({alpha:0},0).wait(8).to({_off:true},1).wait(1030));

	// angliiskiy
	this.instance_70 = new lib.angliiskiy();
	this.instance_70.setTransform(1503.7,209,0.8,0.8,0,0,0,270.2,40);
	this.instance_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(137).to({_off:false},0).wait(49).to({regX:101.2,regY:45,x:1362.85,y:214.3},0).wait(1).to({x:1357.25,y:215.7},0).wait(1).to({x:1351.2,y:217.4},0).wait(1).to({x:1343.75,y:219.75},0).wait(1).to({x:1332.95,y:223.75},0).wait(1).to({x:1316.4,y:231.55},0).wait(1).to({x:1292.6,y:248},0).wait(1).to({x:1264.6,y:284.1},0).wait(1).to({x:1249.2,y:329.55},0).wait(1).to({x:1244.5,y:360.15},0).wait(1).to({x:1242.95,y:378.95},0).wait(1).to({x:1242.3,y:390.45},0).wait(1).to({x:1241.95,y:398.15},0).wait(1).to({x:1241.75,y:404.1},0).wait(1).to({x:1241.6,y:409.6},0).wait(1).to({x:1241.45,y:414.95},0).wait(1).to({regX:270.2,regY:40,x:1376.75,y:411},0).wait(1).to({regX:101.2,regY:45,x:1241.5,y:414.95},0).wait(1).to({x:1241.55},0).wait(1).to({x:1241.7},0).wait(1).to({x:1242.35},0).wait(1).to({x:1244},0).wait(1).to({x:1247.75},0).wait(1).to({x:1255},0).wait(1).to({x:1267.75},0).wait(1).to({x:1288.8},0).wait(1).to({x:1318.15},0).wait(1).to({x:1339.2},0).wait(1).to({x:1352},0).wait(1).to({x:1359.25},0).wait(1).to({x:1362.95},0).wait(1).to({x:1364.65},0).wait(1).to({x:1365.3},0).wait(1).to({x:1365.45},0).wait(3).to({regX:270.2,regY:40,x:1500.65,y:410.95},0).wait(51).to({y:411},0).wait(1).to({regX:101.2,regY:45,x:1365.45,y:414.95,alpha:0.9333},0).wait(1).to({alpha:0.8667},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.7333},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.5333},0).wait(1).to({alpha:0.4667},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2667},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.1333},0).wait(1).to({alpha:0.0667},0).wait(1).to({alpha:0},0).wait(8).to({_off:true},1).wait(1030));

	// bf1
	this.instance_71 = new lib.big_foots("synched",0);
	this.instance_71.setTransform(1472.25,547.1,1.2,1.2,0,0,0,556.6,454.7);
	this.instance_71._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(125).to({_off:false},0).to({_off:true},66).wait(1136));

	// steps1
	this.instance_72 = new lib.step_sound("synched",0);
	this.instance_72.setTransform(1395.45,415.45,1.2,1.2,0,0,0,483.1,345.4);
	this.instance_72._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(31).to({_off:false},0).to({_off:true},153).wait(1143));

	// bg
	this.instance_73 = new lib.CachedBmp_140();
	this.instance_73.setTransform(982.6,-17.95,0.5,0.5);
	this.instance_73._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(2).to({_off:false},0).wait(1325));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-47651.9,-5204.1,81001.9,15205.6);
// library properties:
lib.properties = {
	id: 'AEE097CEFB9D2345A5FAE086D49C4CB7',
	width: 2525,
	height: 720,
	fps: 29.97,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [
		{src:"../images/CachedBmp_48.png?1629267925428", id:"CachedBmp_48"},
		{src:"../images/generator_fraz_promo_atlas_1.png?1629267924959", id:"generator_fraz_promo_atlas_1"},
		{src:"../images/generator_fraz_promo_atlas_2.png?1629267924961", id:"generator_fraz_promo_atlas_2"},
		{src:"../sounds/brokenglass9.mp3?1629267925428", id:"brokenglass9"},
		{src:"../sounds/hat.mp3?1629267925428", id:"hat"},
		{src:"../sounds/flyingpast.mp3?1629267925428", id:"flyingpast"},
		{src:"../sounds/flyingpast4.mp3?1629267925428", id:"flyingpast4"},
		{src:"../sounds/step27.mp3?1629267925428", id:"step27"},
		{src:"../sounds/step3.mp3?1629267925428", id:"step3"},
		{src:"../sounds/step6.mp3?1629267925428", id:"step6"},
		{src:"../sounds/step2.mp3?1629267925428", id:"step2"},
		{src:"../sounds/win2.mp3?1629267925428", id:"win2"},
		{src:"../sounds/win6.mp3?1629267925428", id:"win6"},
		{src:"../sounds/step4.mp3?1629267925428", id:"step4"},
		{src:"../sounds/voltaicarc.mp3?1629267925428", id:"voltaicarc"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['AEE097CEFB9D2345A5FAE086D49C4CB7'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;