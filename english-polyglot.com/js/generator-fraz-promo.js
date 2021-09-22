(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"generator_fraz_promo_atlas_1", frames: [[422,0,424,229],[0,590,269,643],[271,590,310,436],[0,1235,762,191],[519,1143,87,81],[271,1150,80,80],[393,1145,81,81],[550,337,93,93],[519,1028,118,113],[393,1028,124,115],[550,231,104,104],[550,432,93,93],[422,231,126,344],[271,1028,120,120],[0,0,420,588]]}
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



(lib.Layer0copy_1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.slider_gb1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.slider_gb1_1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.VectorSmartObject1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["generator_fraz_promo_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5122,1724);// helper functions:

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
	this.text = new cjs.Text("знания?", "bold 24px 'Arial Black'", "#C3373C");
	this.text.lineHeight = 36;
	this.text.parent = this;
	this.text.setTransform(-104.55,21.05,4.31,4.31);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.znaniya, new cjs.Rectangle(-113.1,12.5,505.5,211.6), null);


(lib.uhodit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("уходит", "bold 14px 'Arial Black'", "#DE5759");
	this.text.lineHeight = 22;
	this.text.parent = this;
	this.text.setTransform(-72.4,22.6,4.31,4.31);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.uhodit, new cjs.Rectangle(-81,14,248.5,102.4), null);


(lib.propadaut = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text(" пропадают  ", "bold 8px 'Arial Black'", "#DE5759");
	this.text.lineHeight = 13;
	this.text.parent = this;
	this.text.setTransform(-107.4,5.6,4.31,4.31);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.propadaut, new cjs.Rectangle(-116,-3,264.6,78), null);


(lib.angliiskiy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("английский?", "bold 11px 'Arial Black'", "#C3373C");
	this.text.lineHeight = 18;
	this.text.parent = this;
	this.text.setTransform(-77.2,35.75,4.9998,4.9998);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.angliiskiy, new cjs.Rectangle(-87.2,25.8,424.8,104.50000000000001), null);


(lib.soundon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(0,0,0.2551,0.2551);

	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(-3,-2.1,0.2551,0.2551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.soundon, new cjs.Rectangle(-3,-2.1,26.6,26.6), null);


(lib.soundoff = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(0,0,0.2551,0.2551);

	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(-3,-2.1,0.2551,0.2551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.soundoff, new cjs.Rectangle(-3,-2.1,26.6,26.6), null);


(lib.rise_up_face = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.repeatsymbol = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.repeatsymbol, new cjs.Rectangle(0,0,40,40), null);


(lib.play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(0.05,-0.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.play, new cjs.Rectangle(0.1,0,46.5,46.5), null);


(lib.pause = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(0.05,-0.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pause, new cjs.Rectangle(0.1,0,46.5,46.5), null);


(lib.Why = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Why", "bold 200px 'Arial Black'", "#A00101");
	this.text.textAlign = "center";
	this.text.lineHeight = 284;
	this.text.lineWidth = 524;
	this.text.parent = this;
	this.text.setTransform(252.9,-6.8);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Why, new cjs.Rectangle(-11.1,-8.8,528.1,286), null);


(lib.ushelpoangliyski = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("ушел  ...", "bold 96px 'Arial Black'", "#E1475E");
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
	this.text = new cjs.Text("удержи", "bold 94px 'Arial Black'", "#D10019");
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
	this.text = new cjs.Text("свой", "bold 91px 'Arial Black'", "#D10019");
	this.text.lineHeight = 130;
	this.text.lineWidth = 247;
	this.text.parent = this;
	this.text.setTransform(-9,-39.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.svoi, new cjs.Rectangle(-11,-41.2,251,137.10000000000002), null);


(lib.so = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("so ...", "bold 230px 'Arial Black'", "#A00101");
	this.text.textAlign = "center";
	this.text.lineHeight = 326;
	this.text.lineWidth = 679;
	this.text.parent = this;
	this.text.setTransform(178.55,-113.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.so, new cjs.Rectangle(-163,-115.2,683.1,328.4), null);


(lib.she = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("she", "bold 230px 'Arial Black'", "#A00101");
	this.text.textAlign = "center";
	this.text.lineHeight = 326;
	this.text.lineWidth = 611;
	this.text.parent = this;
	this.text.setTransform(307.3,-123.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.she, new cjs.Rectangle(0,-125.9,614.6,328.3), null);


(lib.presentperfect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("much?", "bold 130px 'Arial Black'", "#A00101");
	this.text.textAlign = "center";
	this.text.lineHeight = 185;
	this.text.lineWidth = 594;
	this.text.parent = this;
	this.text.setTransform(249.8,-44.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.presentperfect, new cjs.Rectangle(-49.1,-46.3,597.9,187.39999999999998), null);


(lib.love = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("love", "bold 230px 'Arial Black'", "#A00101");
	this.text.textAlign = "center";
	this.text.lineHeight = 326;
	this.text.lineWidth = 689;
	this.text.parent = this;
	this.text.setTransform(291.45,-72.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.love, new cjs.Rectangle(-55,-74.3,693,328.4), null);


(lib.him = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("him", "bold 300px 'Arial Black'", "#A00101");
	this.text.textAlign = "center";
	this.text.lineHeight = 425;
	this.text.lineWidth = 940;
	this.text.parent = this;
	this.text.setTransform(205.45,-112.8);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.him, new cjs.Rectangle(-266.6,-114.8,944.2,427.1), null);


(lib.doesnt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("doesn't", "bold 130px 'Arial Black'", "#A00101");
	this.text.textAlign = "center";
	this.text.lineHeight = 185;
	this.text.lineWidth = 585;
	this.text.parent = this;
	this.text.setTransform(294.45,-49.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.doesnt, new cjs.Rectangle(0,-51.4,589,187.3), null);


(lib.angliyskiy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("английский", "bold 91px 'Arial Black'", "#D10019");
	this.text.lineHeight = 130;
	this.text.lineWidth = 620;
	this.text.parent = this;
	this.text.setTransform(2,-36.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.angliyskiy, new cjs.Rectangle(0,-38.5,624,146.6), null);


(lib.поанглийски = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("по-английски", "bold 85px 'Arial Black'", "#E1697A");
	this.text.textAlign = "center";
	this.text.lineHeight = 122;
	this.text.lineWidth = 682;
	this.text.parent = this;
	this.text.setTransform(94,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248.9,0,685.9,139.4);


(lib.еслианглийский = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("если английский", "bold 96px 'Arial Black'", "#E93B44");
	this.text.textAlign = "center";
	this.text.lineHeight = 137;
	this.text.lineWidth = 1024;
	this.text.parent = this;
	this.text.setTransform(514.1,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1028.3,139.4);


(lib.generatorfraz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("ГЕНЕРАТОР ФРАЗ", "bold 72px 'Arial Black'", "#D34847");
	this.text.textAlign = "center";
	this.text.lineHeight = 104;
	this.text.lineWidth = 764;
	this.text.parent = this;
	this.text.setTransform(-340.1,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.generatorfraz, new cjs.Rectangle(-724.2,0,768.2,105.6), null);


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


(lib.face = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.slider_gb1_1();
	this.instance.setTransform(-155,-218);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155,-218,310,436);


(lib.dugaurl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.VectorSmartObject1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dugaurl, new cjs.Rectangle(0,0,762,191), null);


(lib.button_all = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(-62.2,218.5,0.4429,0.4429);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,218.5,2268.6,763.6);


(lib.button_play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Layer0copy_1();
	this.instance.setTransform(0,0,0.6894,0.6894);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,292.3,157.9), null);


(lib.arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-5,-5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arrow, new cjs.Rectangle(-5,-5,63,172), null);


(lib.urlpsd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Vector_Smart_Object
	this.instance = new lib.dugaurl();
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

	this.instance_1 = new lib.CachedBmp_16();
	this.instance_1.setTransform(-4.55,-4.1,0.2551,0.2551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{alpha:1}}]}).to({state:[{t:this.instance,p:{alpha:0.6914}}]},1).to({state:[{t:this.instance_1},{t:this.instance,p:{alpha:1}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,-4.1,31.6,29.4);


(lib.soundoffbtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.soundoff();
	this.instance.setTransform(0.5,0.5,1,1,0,0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_16();
	this.instance_1.setTransform(-4.55,-4.1,0.2551,0.2551);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{alpha:1}}]}).to({state:[{t:this.instance,p:{alpha:0.6914}}]},1).to({state:[{t:this.instance_1},{t:this.instance,p:{alpha:1}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,-4.1,31.6,29.4);


(lib.gen = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.generatorfraz();
	this.instance.setTransform(569.35,189.75,0.213,0.213,0,0,0,-339.8,52.9);
	this.instance.filters = [new cjs.ColorFilter(1, 1, 1, 1, -43, 0, 0, 0)];
	this.instance.cache(-726,-2,772,110);

	this.instance_1 = new lib.CachedBmp_10();
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
	this.instance_1.alpha = 0.4883;

	this.instance_2 = new lib.CachedBmp_8();
	this.instance_2.setTransform(-9.05,-9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{alpha:1}}]}).to({state:[{t:this.instance_1},{t:this.instance,p:{alpha:0.4883}}]},1).to({state:[{t:this.instance_2},{t:this.instance,p:{alpha:1}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-9,59,56.5);


(lib.playbtn2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.play();
	this.instance.setTransform(22.9,23.1,1,1,0,0,0,22.9,23.1);

	this.instance_1 = new lib.play();
	this.instance_1.setTransform(22.9,23.1,1,1,0,0,0,22.9,23.1);
	this.instance_1.alpha = 0.4883;

	this.instance_2 = new lib.CachedBmp_7();
	this.instance_2.setTransform(-7,-7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{alpha:1}}]}).to({state:[{t:this.instance_1},{t:this.instance,p:{alpha:0.4883}}]},1).to({state:[{t:this.instance_2},{t:this.instance,p:{alpha:1}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-7,60,60);


(lib.playbtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.play();
	this.instance.setTransform(22.9,23.1,1,1,0,0,0,22.9,23.1);

	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(-7,-7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{alpha:1}}]}).to({state:[{t:this.instance,p:{alpha:0.8008}}]},1).to({state:[{t:this.instance_1},{t:this.instance,p:{alpha:1}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-7,60,60);


(lib.pausebtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.pause();
	this.instance.setTransform(22.9,23.1,1,1,0,0,0,22.9,23.1);

	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(-7,-7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{alpha:1}}]}).to({state:[{t:this.instance,p:{alpha:0.8008}}]},1).to({state:[{t:this.instance_1},{t:this.instance,p:{alpha:1}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-7,60,60);


(lib.wh_movement_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.еслианглийский();
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
	this.instance.setTransform(266.8,271.15,60,60,0,0,0,251.4,40.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:185.6,regY:67.7,scaleX:51.2577,scaleY:51.2577,x:-3103.3,y:1680.75},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:-2571.55,y:1459.6,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:-2085.85,y:1257.7,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:-1645.9,y:1074.9,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:-1252.3,y:911.5,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:-904.5,y:767.25,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:-602.8,y:642.2,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:-347.1,y:536.45},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:-137.2,y:449.75},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:26.3,y:382.5},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:144.1,y:334.35},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:215.8,y:305.5},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:241.4,y:295.9},0).wait(1).to({regX:252.7,regY:41.4,scaleX:0.4,scaleY:0.4,x:269.15,y:271.15},0).wait(1).to({regX:185.6,regY:67.7,x:242.25,y:281.65},0).wait(6).to({x:242.05},0).wait(1).to({x:241.85},0).wait(175));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16176.2,-2890.8,24993,9627);


(lib.svoi_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.svoi();
	this.instance.setTransform(233.4,271.15,60,60,0,0,0,236.5,25.6);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:114.5,regY:27.3,scaleX:51.2577,scaleY:51.258,x:-5997.5,y:358.3},0).wait(1).to({scaleX:43.2156,scaleY:43.2161,x:-4993.85,y:344.6,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8743,x:-4075.6,y:332.1,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.228,x:-3242.2,y:320.8,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2864,x:-2494.8,y:310.65,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.0403,x:-1832.25,y:301.75,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4942,x:-1255.05,y:294,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6483,x:-763.35,y:287.4},0).wait(1).to({scaleX:6.4963,scaleY:6.4979,x:-356.45,y:282.05},0).wait(1).to({scaleX:4.0505,scaleY:4.0522,x:-35.5,y:277.85},0).wait(1).to({scaleX:2.3002,scaleY:2.3019,x:200.5,y:274.9},0).wait(1).to({scaleX:1.2501,scaleY:1.2518,x:351.1,y:273.05},0).wait(1).to({scaleX:0.9,scaleY:0.9018,x:416.35,y:272.45},0).wait(1).to({regX:238.3,regY:27.9,scaleX:0.6,scaleY:0.6,x:491.65,y:271.2},0).wait(1).to({regX:114.5,regY:27.3,x:417.35,y:270.8},0).wait(5).to({x:417.15},0).wait(1).to({x:416.9},0).wait(175));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14616.6,-3739.8,15145.800000000001,8226);


(lib.relativepronouns_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.love();
	this.instance.setTransform(376.8,271.1,60,60,0,0,0,237.4,26.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:291.5,regY:89.9,scaleX:51.2577,scaleY:51.2577,x:3139.5,y:3520.85},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:2694,y:3011,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:2286.4,y:2545.55,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:1916.4,y:2124.1,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:1584.55,y:1747.4,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:1290.3,y:1414.8,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:1033.95,y:1126.55,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:815.5,y:882.7},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:634.65,y:682.9},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:491.95,y:527.9},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:386.85,y:416.9},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:319.65,y:350.35},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:290.25,y:328.15},0).wait(1).to({regX:252.1,regY:41.5,scaleX:0.24,scaleY:0.24,x:276.1,y:271.15},0).wait(1).to({regX:291.5,regY:89.9,x:285.5,y:282.75},0).wait(7).to({x:285.55},0).wait(1).to({x:285.6},0).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17167.2,-5776.9,41577,19701);


(lib.presentperfect_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.presentperfect();
	this.instance.setTransform(376.8,268.1,60,60,0,0,0,238,27.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:249.8,regY:47.4,scaleX:51.1912,scaleY:51.1912,x:980.75,y:1302.6},0).wait(1).to({scaleX:43.0878,scaleY:43.0878,x:885,y:1139.35,alpha:0.0024},0).wait(1).to({scaleX:35.6899,scaleY:35.6899,x:797.55,y:990.3,alpha:0.0194},0).wait(1).to({scaleX:28.9928,scaleY:28.9928,x:718.4,y:855.3,alpha:0.0819},0).wait(1).to({scaleX:23.0057,scaleY:23.0057,x:647.65,y:734.65,alpha:0.25},0).wait(1).to({scaleX:17.7195,scaleY:17.7195,x:585.15,y:628.15,alpha:0.6223},0).wait(1).to({scaleX:13.1387,scaleY:13.1387,x:530.9,y:535.9,alpha:1},0).wait(1).to({scaleX:9.2634,scaleY:9.2634,x:485.05,y:457.75},0).wait(1).to({scaleX:6.0889,scaleY:6.0889,x:447.45,y:393.75},0).wait(1).to({scaleX:3.6245,scaleY:3.6245,x:418.25,y:344.1},0).wait(1).to({scaleX:1.8609,scaleY:1.8609,x:397.3,y:308.55},0).wait(1).to({scaleX:0.8027,scaleY:0.8027,x:384.6,y:287.25},0).wait(1).to({scaleX:0.45,scaleY:0.45,x:380.35,y:280.15},0).wait(1).to({regX:252.6,regY:41.4,scaleX:0.29,scaleY:0.29,x:375.05,y:271.15},0).wait(1).to({regX:249.8,regY:47.4,x:374.2,y:272.85},0).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16852.2,-4141.9,35877,11241);


(lib.pastcontinuous_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.doesnt();
	this.instance.setTransform(379.8,272.35,60,60,0,0,0,237.6,26.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:294.5,regY:42.2,scaleX:51.2577,scaleY:51.2577,x:3284.2,y:1066.6},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:2814.4,y:941.65,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:2384.5,y:827.6,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:1994.25,y:724.4,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:1644.05,y:632.15,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:1333.55,y:550.7,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:1062.85,y:480.15,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:832.05,y:420.4},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:640.85,y:371.55},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:489.8,y:333.7},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:378.35,y:306.55},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:306.8,y:290.4},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:275.05,y:285.1},0).wait(1).to({regX:252.2,regY:41.5,scaleX:0.27,scaleY:0.27,x:241.85,y:271.15},0).wait(1).to({regX:294.5,regY:42.2,x:253.2,y:271.3},0).wait(9).to({x:253.35},0).wait(1).to({x:253.45},0).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13876.2,-4416.6,35337,11241);


(lib.indirectquestions_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.him();
	this.instance.setTransform(376.8,269.35,60,60,0,0,0,237.8,26.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:205.5,regY:98.7,scaleX:51.2577,scaleY:51.2577,x:-1277.35,y:3949.85},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:-1016.1,y:3372.55,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:-777.5,y:2845.5,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:-561.4,y:2368.4,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:-368,y:1941.9,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:-197.1,y:1565.4,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:-48.75,y:1239.1,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:76.9,y:963.05},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:180.15,y:737},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:260.6,y:561.5},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:318.6,y:436},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:353.95,y:360.7},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:366.7,y:335.7},0).wait(1).to({regX:252.8,regY:41.4,scaleX:0.18,scaleY:0.18,x:375.05,y:271.15},0).wait(1).to({regX:205.5,regY:98.7,x:366.5,y:281.4},0).wait(14));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29887.2,-8232.6,56649,25623);


(lib.imperativemood_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.поанглийски();
	this.instance.setTransform(384.8,277.4,60,60,0,0,0,252.1,28.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:94,regY:69.7,scaleX:54.2183,scaleY:54.2183,x:-8187.65,y:2494.9},0).wait(1).to({scaleX:48.736,scaleY:48.736,x:-7321.35,y:2270.65,alpha:0.0004},0).wait(1).to({scaleX:43.5443,scaleY:43.5443,x:-6501.1,y:2058.35,alpha:0.0034},0).wait(1).to({scaleX:38.655,scaleY:38.655,x:-5728.6,y:1858.35,alpha:0.0146},0).wait(1).to({scaleX:34.0563,scaleY:34.0563,x:-5002,y:1670.25,alpha:0.0446},0).wait(1).to({scaleX:29.757,scaleY:29.757,x:-4322.8,y:1494.45,alpha:0.111},0).wait(1).to({scaleX:25.7543,scaleY:25.7543,x:-3690.4,y:1330.8,alpha:0.24},0).wait(1).to({scaleX:22.048,scaleY:22.048,x:-3107.65,y:1178.5,alpha:0.468},0).wait(1).to({scaleX:18.6412,scaleY:18.6412,x:-2572.2,y:1038.45,alpha:0.8434},0).wait(1).to({scaleX:15.528,scaleY:15.528,x:-2083.15,y:910.4,alpha:1},0).wait(1).to({scaleX:12.7083,scaleY:12.7083,x:-1640.55,y:794.35},0).wait(1).to({scaleX:10.188,scaleY:10.188,x:-1245.2,y:690.6},0).wait(1).to({scaleX:7.9672,scaleY:7.9672,x:-897.25,y:599.05},0).wait(1).to({scaleX:6.037,scaleY:6.037,x:-595.15,y:519.5},0).wait(1).to({scaleX:4.4063,scaleY:4.4063,x:-340.4,y:452.1},0).wait(1).to({scaleX:3.075,scaleY:3.075,x:-133,y:397.05},0).wait(1).to({scaleX:2.0343,scaleY:2.0343,x:28.45,y:353.9},0).wait(1).to({scaleX:1.293,scaleY:1.293,x:142.55,y:322.95},0).wait(1).to({scaleX:0.8483,scaleY:0.8483,x:209.85,y:304.2},0).wait(1).to({scaleX:0.7,scaleY:0.7,x:230.25,y:297.6},0).wait(1).to({regX:252.3,regY:41.1,scaleX:0.631,scaleY:0.631,x:340.95,y:276.15},0).wait(1).to({regX:94,regY:69.7,scaleX:0.6282,scaleY:0.6282,x:241.5,y:294.1},0).wait(1).to({scaleX:0.6253,scaleY:0.6253,x:241.95,y:294},0).wait(1).to({scaleX:0.6225,scaleY:0.6225,x:242.35,y:293.95},0).wait(1).to({scaleX:0.6197,scaleY:0.6197,x:242.85,y:293.85},0).wait(1).to({scaleX:0.6168,scaleY:0.6168,x:243.3,y:293.75},0).wait(1).to({scaleX:0.614,scaleY:0.614,x:243.7,y:293.7},0).wait(1).to({scaleX:0.6111,scaleY:0.6111,x:244.2,y:293.6},0).wait(1).to({scaleX:0.6083,scaleY:0.6083,x:244.65,y:293.5},0).wait(1).to({scaleX:0.6055,scaleY:0.6055,x:245.05,y:293.45},0).wait(1).to({scaleX:0.6026,scaleY:0.6026,x:245.5,y:293.35},0).wait(1).to({scaleX:0.5998,scaleY:0.5998,x:246,y:293.25},0).wait(1).to({scaleX:0.5969,scaleY:0.5969,x:246.4,y:293.2},0).wait(1).to({scaleX:0.5941,scaleY:0.5941,x:246.85,y:293.1},0).wait(1).to({scaleX:0.5912,scaleY:0.5912,x:247.35,y:293},0).wait(1).to({scaleX:0.5884,scaleY:0.5884,x:247.75,y:292.95},0).wait(1).to({scaleX:0.5856,scaleY:0.5856,x:248.2,y:292.85},0).wait(1).to({scaleX:0.5827,scaleY:0.5827,x:248.65,y:292.75},0).wait(1).to({scaleX:0.5799,scaleY:0.5799,x:249.1,y:292.7},0).wait(1).to({scaleX:0.577,scaleY:0.577,x:249.55,y:292.6},0).wait(1).to({scaleX:0.5742,scaleY:0.5742,x:250,y:292.5},0).wait(1).to({scaleX:0.5714,scaleY:0.5714,x:250.45,y:292.45},0).wait(1).to({scaleX:0.5685,scaleY:0.5685,x:250.9,y:292.4},0).wait(1).to({scaleX:0.5657,scaleY:0.5657,x:251.3,y:292.3},0).wait(1).to({scaleX:0.5628,scaleY:0.5628,x:251.8,y:292.25},0).wait(1).to({scaleX:0.56,scaleY:0.56,x:252.25,y:292.15},0).wait(1).to({regX:252.2,regY:41,x:340.9,y:276.15},0).wait(1).to({regX:94,regY:69.7,scaleX:0.5169,scaleY:0.5169,x:259.1,y:291},0).wait(1).to({scaleX:0.4738,scaleY:0.4738,x:265.9,y:289.75},0).wait(1).to({scaleX:0.4308,scaleY:0.4308,x:272.7,y:288.45},0).wait(1).to({scaleX:0.3877,scaleY:0.3877,x:279.55,y:287.25},0).wait(1).to({scaleX:0.3446,scaleY:0.3446,x:286.35,y:286},0).wait(1).to({scaleX:0.3015,scaleY:0.3015,x:293.15,y:284.75},0).wait(1).to({scaleX:0.2585,scaleY:0.2585,x:300,y:283.55},0).wait(1).to({scaleX:0.2154,scaleY:0.2154,x:306.8,y:282.3},0).wait(1).to({scaleX:0.1723,scaleY:0.1723,x:313.6,y:281.05},0).wait(1).to({scaleX:0.1292,scaleY:0.1292,x:320.45,y:279.85},0).wait(1).to({scaleX:0.0862,scaleY:0.0862,x:327.25,y:278.6},0).wait(1).to({scaleX:0.0431,scaleY:0.0431,x:334.05,y:277.35},0).wait(1).to({scaleX:0,scaleY:0,x:-340.9,y:-276.15},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29678.2,-1450.6,41157,8364);


(lib.generatorfraz_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.generatorfraz();
	this.instance.setTransform(-936.7,174.8,72,72,0,0,0,-304.6,40.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-340.1,regY:52.8,scaleX:60.3,scaleY:60.3,x:-3077.35,y:911.05},0).wait(1).to({scaleX:49.206,scaleY:49.206,x:-2683.45,y:776.2},0).wait(1).to({scaleX:38.7,scaleY:38.7,x:-2310.45,y:648.45},0).wait(1).to({scaleX:29.5504,scaleY:29.5504,x:-1985.65,y:537.25},0).wait(1).to({scaleX:26.0463,scaleY:26.0463,x:-1861.2,y:494.65},0).wait(1).to({scaleX:22.7705,scaleY:22.7705,x:-1744.9,y:454.8},0).wait(1).to({scaleX:19.7205,scaleY:19.7205,x:-1636.6,y:417.7},0).wait(1).to({scaleX:16.8965,scaleY:16.8965,x:-1536.3,y:383.35},0).wait(1).to({scaleX:14.3006,scaleY:14.3006,x:-1444.15,y:351.7},0).wait(1).to({scaleX:11.9284,scaleY:11.9284,x:-1359.9,y:322.85},0).wait(1).to({scaleX:9.7799,scaleY:9.7799,x:-1283.6,y:296.7},0).wait(1).to({scaleX:7.8595,scaleY:7.8595,x:-1215.4,y:273.35},0).wait(1).to({scaleX:6.1674,scaleY:6.1674,x:-1155.25,y:252.7},0).wait(1).to({scaleX:4.6966,scaleY:4.6966,x:-1103,y:234.8},0).wait(1).to({scaleX:3.454,scaleY:3.454,x:-1058.85,y:219.55},0).wait(1).to({scaleX:2.4396,scaleY:2.4396,x:-1022.8,y:207.2},0).wait(1).to({scaleX:1.6467,scaleY:1.6467,x:-994.65,y:197.55},0).wait(1).to({scaleX:1.0818,scaleY:1.0818,x:-974.55,y:190.6},0).wait(1).to({scaleX:0.743,scaleY:0.743,x:-962.5,y:186.45},0).wait(1).to({scaleX:0.63,scaleY:0.63,x:-958.45,y:185},0).wait(1).to({regX:-338.5,regY:53.1,scaleX:0.5,scaleY:0.5,x:-954.6,y:184.75},0).wait(18).to({regX:-340.1,regY:52.8,scaleX:0.4988,scaleY:0.4988,x:-954.15,y:186.2},0).wait(1).to({scaleX:0.4952,scaleY:0.4952,x:-950.45,y:190.85},0).wait(1).to({scaleX:0.4892,scaleY:0.4892,x:-944.6,y:197.7},0).wait(1).to({scaleX:0.4807,scaleY:0.4807,x:-936.85,y:205.8},0).wait(1).to({scaleX:0.4699,scaleY:0.4699,x:-927.5,y:213.95},0).wait(1).to({scaleX:0.4566,scaleY:0.4566,x:-916.95,y:221.35},0).wait(1).to({scaleX:0.4409,scaleY:0.4409,x:-905.45,y:227.2},0).wait(1).to({scaleX:0.4228,scaleY:0.4228,x:-893.35,y:230.75},0).wait(1).to({scaleX:0.4023,scaleY:0.4023,x:-880.95,y:231.85},0).wait(1).to({scaleX:0.3794,scaleY:0.3794,x:-868.6,y:230.1},0).wait(1).to({scaleX:0.3541,scaleY:0.3541,x:-856.55,y:225.45},0).wait(1).to({scaleX:0.3264,scaleY:0.3264,x:-845.35,y:218.15},0).wait(1).to({scaleX:0.2962,scaleY:0.2962,x:-835.5,y:208.45},0).wait(1).to({scaleX:0.2636,scaleY:0.2636,x:-827.7,y:196.95},0).wait(1).to({scaleX:0.2287,scaleY:0.2287,x:-823.15,y:184.95},0).wait(1).to({scaleX:0.213,scaleY:0.213,x:-827.95,y:157.55},0).wait(1).to({x:-840.5,y:113.75},0).wait(1).to({regX:-338.3,regY:53.1,x:-839.4,y:101.85},0).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31147.9,-2748.4,55310.4,7599.6);


(lib.futuresimple_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.Why();
	this.instance.setTransform(370.8,266.35,60,60,0,0,0,237.2,26.6);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:252.9,regY:134.2,scaleX:51.2651,scaleY:51.2651,x:1175.55,y:5782.2},0).wait(1).to({scaleX:43.2298,scaleY:43.2298,x:1049.25,y:4917.35,alpha:0.0024},0).wait(1).to({scaleX:35.894,scaleY:35.894,x:933.95,y:4127.75,alpha:0.0194},0).wait(1).to({scaleX:29.2531,scaleY:29.2531,x:829.55,y:3413,alpha:0.0819},0).wait(1).to({scaleX:23.3163,scaleY:23.3163,x:736.2,y:2774.05,alpha:0.25},0).wait(1).to({scaleX:18.0745,scaleY:18.0745,x:653.8,y:2209.9,alpha:0.6223},0).wait(1).to({scaleX:13.5322,scaleY:13.5322,x:582.35,y:1721.05,alpha:1},0).wait(1).to({scaleX:9.6894,scaleY:9.6894,x:521.85,y:1307.45},0).wait(1).to({scaleX:6.5416,scaleY:6.5416,x:472.3,y:968.75},0).wait(1).to({scaleX:4.0978,scaleY:4.0978,x:433.85,y:705.8},0).wait(1).to({scaleX:2.349,scaleY:2.349,x:406.2,y:517.7},0).wait(1).to({scaleX:1.2998,scaleY:1.2998,x:389.55,y:404.9},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:383.95,y:367.35},0).wait(1).to({regX:242.8,regY:31.9,scaleX:0.3,scaleY:0.3,x:408,y:271.15},0).wait(1).to({regX:252.9,regY:134.2,x:410.95,y:301.8},0).wait(1).to({x:411},0).wait(17));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14530.2,-1857.6,31686,17160);


(lib.do_support_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.ushelpoangliyski();
	this.instance.setTransform(390,228.45,60,60,0,0,0,250.8,-5.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:103.4,regY:31.1,scaleX:54.2426,scaleY:54.2426,x:-7605.85,y:2197.7},0).wait(1).to({scaleX:48.7835,scaleY:48.7835,x:-6801.75,y:1999.8,alpha:0.0004},0).wait(1).to({scaleX:43.6136,scaleY:43.6136,x:-6040.2,y:1812.45,alpha:0.0034},0).wait(1).to({scaleX:38.745,scaleY:38.745,x:-5323,y:1635.9,alpha:0.0146},0).wait(1).to({scaleX:34.1656,scaleY:34.1656,x:-4648.55,y:1469.95,alpha:0.0446},0).wait(1).to({scaleX:29.8845,scaleY:29.8845,x:-4017.95,y:1314.75,alpha:0.111},0).wait(1).to({scaleX:25.8986,scaleY:25.8986,x:-3430.9,y:1170.25,alpha:0.24},0).wait(1).to({scaleX:22.208,scaleY:22.208,x:-2887.1,y:1036.45,alpha:0.468},0).wait(1).to({scaleX:18.8156,scaleY:18.8156,x:-2387.2,y:913.5,alpha:0.8434},0).wait(1).to({scaleX:15.7155,scaleY:15.7155,x:-1930.35,y:801.1,alpha:1},0).wait(1).to({scaleX:12.9076,scaleY:12.9076,x:-1516.65,y:699.35},0).wait(1).to({scaleX:10.398,scaleY:10.398,x:-1146.85,y:608.35},0).wait(1).to({scaleX:8.1866,scaleY:8.1866,x:-821,y:528.2},0).wait(1).to({scaleX:6.2645,scaleY:6.2645,x:-537.8,y:458.55},0).wait(1).to({scaleX:4.6406,scaleY:4.6406,x:-298.5,y:399.6},0).wait(1).to({scaleX:3.315,scaleY:3.315,x:-103.2,y:351.6},0).wait(1).to({scaleX:2.2786,scaleY:2.2786,x:49.5,y:314},0).wait(1).to({scaleX:1.5405,scaleY:1.5405,x:158.3,y:287.25},0).wait(1).to({scaleX:1.0976,scaleY:1.0976,x:223.5,y:271.25},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:245.25,y:265.85},0).wait(1).to({regX:255.7,regY:-5,scaleX:0.89,scaleY:0.89,x:385.25,y:231.4},0).wait(1).to({regX:103.4,regY:31.1,scaleX:0.8884,scaleY:0.8884,x:249.95,y:263.45},0).wait(1).to({scaleX:0.8868,scaleY:0.8868,x:250.2,y:263.4},0).wait(1).to({scaleX:0.8852,scaleY:0.8852,x:250.45,y:263.35},0).wait(1).to({scaleX:0.8836,scaleY:0.8836,x:250.65,y:263.3},0).wait(1).to({scaleX:0.882,scaleY:0.882,x:250.9,y:263.25},0).wait(1).to({scaleX:0.8804,scaleY:0.8804,x:251.2,y:263.2},0).wait(1).to({scaleX:0.8788,scaleY:0.8788,x:251.4,y:263.1},0).wait(1).to({scaleX:0.8772,scaleY:0.8772,x:251.65,y:263.05},0).wait(1).to({scaleX:0.8756,scaleY:0.8756,x:251.9,y:263},0).wait(1).to({scaleX:0.874,scaleY:0.874,x:252.1,y:262.95},0).wait(1).to({scaleX:0.8724,scaleY:0.8724,x:252.35,y:262.9},0).wait(1).to({scaleX:0.8708,scaleY:0.8708,x:252.65,y:262.85},0).wait(1).to({scaleX:0.8692,scaleY:0.8692,x:252.85,y:262.75},0).wait(1).to({scaleX:0.8676,scaleY:0.8676,x:253.1,y:262.7},0).wait(1).to({scaleX:0.866,scaleY:0.866,x:253.35,y:262.65},0).wait(1).to({scaleX:0.8644,scaleY:0.8644,x:253.6,y:262.6},0).wait(1).to({scaleX:0.8628,scaleY:0.8628,x:253.85,y:262.55},0).wait(1).to({scaleX:0.8612,scaleY:0.8612,x:254.1,y:262.5},0).wait(1).to({scaleX:0.8596,scaleY:0.8596,x:254.35,y:262.4},0).wait(1).to({scaleX:0.858,scaleY:0.858,x:254.55,y:262.35},0).wait(1).to({scaleX:0.8564,scaleY:0.8564,x:254.8,y:262.3},0).wait(1).to({scaleX:0.8548,scaleY:0.8548,x:255.05,y:262.25},0).wait(1).to({scaleX:0.8532,scaleY:0.8532,x:255.3,y:262.2},0).wait(1).to({scaleX:0.8516,scaleY:0.8516,x:255.55,y:262.15},0).wait(1).to({scaleX:0.85,scaleY:0.85,x:255.8,y:262.1},0).wait(1).to({regX:255.7,regY:-5.2,scaleX:0.8,scaleY:0.8,x:385.3,y:231.45},0).wait(1).to({regX:103.4,regY:31.1,scaleX:0.7385,scaleY:0.7385,x:272.8,y:258.2},0).wait(1).to({scaleX:0.6769,scaleY:0.6769,x:282.2,y:256},0).wait(1).to({scaleX:0.6154,scaleY:0.6154,x:291.55,y:253.75},0).wait(1).to({scaleX:0.5538,scaleY:0.5538,x:300.9,y:251.5},0).wait(1).to({scaleX:0.4923,scaleY:0.4923,x:310.3,y:249.3},0).wait(1).to({scaleX:0.4308,scaleY:0.4308,x:319.65,y:247.05},0).wait(1).to({scaleX:0.3692,scaleY:0.3692,x:329.05,y:244.85},0).wait(1).to({scaleX:0.3077,scaleY:0.3077,x:338.4,y:242.55},0).wait(1).to({scaleX:0.2462,scaleY:0.2462,x:347.75,y:240.35},0).wait(1).to({scaleX:0.1846,scaleY:0.1846,x:357.15,y:238.15},0).wait(1).to({scaleX:0.1231,scaleY:0.1231,x:366.5,y:235.9},0).wait(1).to({scaleX:0.0615,scaleY:0.0615,x:375.85,y:233.65},0).wait(1).to({scaleX:0,scaleY:0,x:-385.25,y:-231.4},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28998,-1775.5,41085,8361);


(lib.contractedforms_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.so();
	this.instance.setTransform(376.8,283.55,60,60,0,0,0,236.8,25.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:178.6,regY:49,scaleX:51.2577,scaleY:51.2577,x:-2594.15,y:1467.45},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:-2113.9,y:1281.4,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:-1674.4,y:1111.6,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:-1275.35,y:957.9,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:-917.3,y:820.4,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:-599.75,y:699,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:-322.95,y:593.75,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:-86.65,y:504.25},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:109.2,y:430.8},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:263.95,y:373.65},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:378.3,y:332.6},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:451.85,y:307.75},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:484.7,y:299},0).wait(1).to({regX:252.4,regY:41.6,scaleX:0.25,scaleY:0.25,x:508.7,y:278.25},0).wait(1).to({regX:178.6,regY:49,x:490.2,y:280.1},0).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23611.2,-8182.4,40986,19701);


(lib.auxiliaryverbs_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.she();
	this.instance.setTransform(376.8,271.1,60,60,0,0,0,238.1,27.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:307.3,regY:38.2,scaleX:51.2577,scaleY:51.2577,x:3923.7,y:834.95},0).wait(1).to({scaleX:43.2156,scaleY:43.2156,x:3367.05,y:746.5,alpha:0.0024},0).wait(1).to({scaleX:35.8736,scaleY:35.8736,x:2858.9,y:665.7,alpha:0.0194},0).wait(1).to({scaleX:29.2271,scaleY:29.2271,x:2398.8,y:592.6,alpha:0.0819},0).wait(1).to({scaleX:23.2853,scaleY:23.2853,x:1987.5,y:527.25,alpha:0.25},0).wait(1).to({scaleX:18.039,scaleY:18.039,x:1624.35,y:469.55,alpha:0.6223},0).wait(1).to({scaleX:13.4928,scaleY:13.4928,x:1309.6,y:419.55,alpha:1},0).wait(1).to({scaleX:9.6468,scaleY:9.6468,x:1043.3,y:377.2},0).wait(1).to({scaleX:6.4963,scaleY:6.4963,x:825.15,y:342.55},0).wait(1).to({scaleX:4.0505,scaleY:4.0505,x:655.75,y:315.65},0).wait(1).to({scaleX:2.3002,scaleY:2.3002,x:534.5,y:296.35},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:461.65,y:284.8},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:437.3,y:281},0).wait(1).to({regX:252.4,regY:41.5,scaleX:0.27,scaleY:0.27,x:375.05,y:271.15},0).wait(1).to({regX:307.3,regY:38.2,x:389.8,y:270.2},0).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13909.2,-8917.9,36876,19701);


(lib.angliyskiy_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grammar_fly
	this.instance = new lib.angliyskiy();
	this.instance.setTransform(306.15,271.15,60,60,0,0,0,251.8,40.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).wait(1).to({regX:312,regY:34.7,scaleX:51.166,scaleY:51.166,x:3386.65,y:-35.85},0).wait(1).to({scaleX:43.0395,scaleY:43.0395,x:2897.75,y:12.9,alpha:0.0024},0).wait(1).to({scaleX:35.6205,scaleY:35.6205,x:2451.35,y:57.45,alpha:0.0194},0).wait(1).to({scaleX:28.9043,scaleY:28.9043,x:2047.25,y:97.75,alpha:0.0819},0).wait(1).to({scaleX:22.9001,scaleY:22.9001,x:1685.95,y:133.8,alpha:0.25},0).wait(1).to({scaleX:17.5988,scaleY:17.5988,x:1366.9,y:165.6,alpha:0.6223},0).wait(1).to({scaleX:13.005,scaleY:13.005,x:1090.5,y:193.1,alpha:1},0).wait(1).to({scaleX:9.1186,scaleY:9.1186,x:856.6,y:216.45},0).wait(1).to({scaleX:5.935,scaleY:5.935,x:664.95,y:235.5},0).wait(1).to({scaleX:3.4635,scaleY:3.4635,x:516.15,y:250.35},0).wait(1).to({scaleX:1.6949,scaleY:1.6949,x:409.65,y:260.95},0).wait(1).to({scaleX:0.6337,scaleY:0.6337,x:345.6,y:267.35},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:324.2,y:269.45},0).wait(1).to({regX:252.7,regY:41.1,scaleX:0.2832,scaleY:0.2832,x:307.4,y:271.15},0).wait(1).to({regX:312,regY:34.7,x:324.15,y:269.3},0).wait(2).to({x:324.2},0).wait(178));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14801.8,-4483.8,37440,8796);


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

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(48).to({_off:false},0).wait(74).to({regX:178.8,x:171.1},0).wait(1).to({regX:238.5,regY:400.5,x:166.1,y:308.95,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(16));

	// _
	this.instance_4 = new lib.right();
	this.instance_4.setTransform(215.35,216.9,0.0831,0.0831,0,0,0,235.3,400.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(60).to({_off:false},0).wait(68).to({regX:238.5,regY:400.5,x:215.55,y:216.85,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(11));

	// _
	this.instance_5 = new lib.right();
	this.instance_5.setTransform(170.4,104.95,0.0831,0.0831,0,0,180,230,400.9);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(71).to({_off:false},0).wait(61).to({regX:221.5,x:170.45},0).wait(1).to({regX:238.5,regY:400.5,x:169,y:104.85,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(6));

	// _
	this.instance_6 = new lib.right();
	this.instance_6.setTransform(215.35,-5.05,0.0831,0.0831,0,0,0,236,349.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(83).to({_off:false},0).wait(54).to({regY:340.7,y:-5.1},0).wait(1).to({regX:238.5,regY:400.5,x:215.5,y:-0.15,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-28.2,228.6,660.3000000000001);


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
p.nominalBounds = new cjs.Rectangle(-3,-2.1,26.6,26.6);


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

	this.actionFrames = [0,43,55,67,79,91,104,116,127,200,212,224,236,248,261,273,284,408,415,465,473,486,493,514,520,541,547,568,573,594,596,617,629,650,651,672,677,698,761,782,838,871,908,993,1021];
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
		
			if (frameNumber < 1122) {
				if(!soundIsOn)
				{
					_this.mutte.gotoAndStop(2);
				}
				else
				{
					_this.mutte.gotoAndStop(1);
				}
			}
			
			if (frameNumber < 1121) {
				if(!playback)
				{
					_this.pausing.gotoAndStop(2);
				}
				else
				{
					_this.pausing.gotoAndStop(1);
				}
			}
			
			if (frameNumber == 1121)
			{
				_this.pausing.removeEventListener('click', changePlayback.bind(_this) );
				_this.bigStop.removeEventListener('click', changePlayback.bind(_this) );
				
			}
		
			if (frameNumber == 1122)
			{
				if (iter) {
					flain();
					ambulance_on();
					iter = false;
				}
		
				_this.stop();
					
			}
			
			if (frameNumber == 1123)
			{
		
				_this.mutte.removeEventListener('click', changeSound.bind(_this) );
				_this.again.removeEventListener('click', repeat.bind(_this) );
		
				_this.gotoAndPlay(1);
					
			}
			
			if (frameNumber == 1155) {
		
				_this.stop();
			}
			
			if (frameNumber==1154) {
		
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
			if (frameNumber == 1155) {
				_this.videoplay.addEventListener("click", repeat.bind(_this) );
				_this.gotoAndPlay(1);
			}
		
			if (frameNumber < 1122)
			{
				_this.stop();
				_this.pausing.gotoAndStop(1);
				_this.gotoAndPlay(1);
			}
			else
			{
				if (frameNumber == 1122) {
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
			if ('localStorage' in window && localStorage['counter'] < 2){
				_this.play();
			} else {
				_this.gotoAndPlay(1125);
			}
		}
		
		//_this.gotoAndPlay(948);
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
		playSound("step2");
	}
	this.frame_127 = function() {
		playSound("step3");
	}
	this.frame_200 = function() {
		playSound("step2");
	}
	this.frame_212 = function() {
		playSound("step3");
	}
	this.frame_224 = function() {
		playSound("step4");
	}
	this.frame_236 = function() {
		playSound("step3");
	}
	this.frame_248 = function() {
		playSound("step6");
	}
	this.frame_261 = function() {
		playSound("step27");
	}
	this.frame_273 = function() {
		playSound("step2");
	}
	this.frame_284 = function() {
		playSound("step3");
	}
	this.frame_408 = function() {
		playSound("brokenglass9");
	}
	this.frame_415 = function() {
		playSound("flyingpast");
	}
	this.frame_465 = function() {
		playSound("flyingpast4");
	}
	this.frame_473 = function() {
		playSound("win6");
	}
	this.frame_486 = function() {
		playSound("win6");
	}
	this.frame_493 = function() {
		playSound("flyingpast4");
	}
	this.frame_514 = function() {
		playSound("win6");
	}
	this.frame_520 = function() {
		playSound("flyingpast4");
	}
	this.frame_541 = function() {
		playSound("win6");
	}
	this.frame_547 = function() {
		playSound("flyingpast4");
	}
	this.frame_568 = function() {
		playSound("win6");
	}
	this.frame_573 = function() {
		playSound("flyingpast4");
	}
	this.frame_594 = function() {
		playSound("win6");
	}
	this.frame_596 = function() {
		playSound("flyingpast4");
	}
	this.frame_617 = function() {
		playSound("win6");
	}
	this.frame_629 = function() {
		playSound("flyingpast4");
	}
	this.frame_650 = function() {
		playSound("win2");
	}
	this.frame_651 = function() {
		playSound("flyingpast4");
	}
	this.frame_672 = function() {
		playSound("win2");
	}
	this.frame_677 = function() {
		playSound("flyingpast4");
	}
	this.frame_698 = function() {
		playSound("win2");
	}
	this.frame_761 = function() {
		playSound("flyingpast4");
	}
	this.frame_782 = function() {
		playSound("win6");
	}
	this.frame_838 = function() {
		playSound("flyingpast4");
	}
	this.frame_871 = function() {
		playSound("flyingpast4");
	}
	this.frame_908 = function() {
		playSound("flyingpast4");
	}
	this.frame_993 = function() {
		playSound("flyingpast");
	}
	this.frame_1021 = function() {
		playSound("voltaicarc");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(43).call(this.frame_43).wait(12).call(this.frame_55).wait(12).call(this.frame_67).wait(12).call(this.frame_79).wait(12).call(this.frame_91).wait(13).call(this.frame_104).wait(12).call(this.frame_116).wait(11).call(this.frame_127).wait(73).call(this.frame_200).wait(12).call(this.frame_212).wait(12).call(this.frame_224).wait(12).call(this.frame_236).wait(12).call(this.frame_248).wait(13).call(this.frame_261).wait(12).call(this.frame_273).wait(11).call(this.frame_284).wait(124).call(this.frame_408).wait(7).call(this.frame_415).wait(50).call(this.frame_465).wait(8).call(this.frame_473).wait(13).call(this.frame_486).wait(7).call(this.frame_493).wait(21).call(this.frame_514).wait(6).call(this.frame_520).wait(21).call(this.frame_541).wait(6).call(this.frame_547).wait(21).call(this.frame_568).wait(5).call(this.frame_573).wait(21).call(this.frame_594).wait(2).call(this.frame_596).wait(21).call(this.frame_617).wait(12).call(this.frame_629).wait(21).call(this.frame_650).wait(1).call(this.frame_651).wait(21).call(this.frame_672).wait(5).call(this.frame_677).wait(21).call(this.frame_698).wait(63).call(this.frame_761).wait(21).call(this.frame_782).wait(56).call(this.frame_838).wait(33).call(this.frame_871).wait(37).call(this.frame_908).wait(85).call(this.frame_993).wait(28).call(this.frame_1021).wait(134));

	// press_btn
	this.bigStop = new lib.button_all();
	this.bigStop.name = "bigStop";
	this.bigStop.setTransform(1261.45,357.05,1.1289,1,0,0,0,1069.9,604.5);
	new cjs.ButtonHelper(this.bigStop, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.bigStop).to({_off:true},1121).wait(34));

	// arrow
	this.instance = new lib.arrow("synched",0);
	this.instance.setTransform(1637,600.6,0.69,0.69,0,0,0,26.4,81);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1060).to({_off:false},0).wait(1).to({regX:26.5,rotation:0.701,y:599.55},0).wait(1).to({rotation:2.8698,x:1636.9,y:596.4},0).wait(1).to({rotation:6.4624,x:1636.65,y:591.25},0).wait(1).to({rotation:11.479,x:1636.35,y:584.05},0).wait(1).to({rotation:17.9414,x:1635.85,y:574.9},0).wait(1).to({rotation:25.8497,x:1635.05,y:563.75},0).wait(1).to({rotation:35.1818,x:1634,y:550.85},0).wait(1).to({rotation:45.9598,x:1632.5,y:536.05},0).wait(1).to({rotation:58.1618,x:1630.6,y:519.65},0).wait(1).to({rotation:71.8095,x:1628.05,y:501.55},0).wait(1).to({rotation:86.9031,x:1624.9,y:482},0).wait(1).to({rotation:103.4206,x:1620.9,y:461.2},0).wait(1).to({rotation:121.362,x:1616.05,y:439.1},0).wait(1).to({rotation:140.7712,x:1610.1,y:416},0).wait(1).to({rotation:161.6043,x:1603.05,y:392},0).wait(1).to({rotation:173.9525,x:1594.7,y:367.4},0).wait(1).to({rotation:170.3747,x:1584.95,y:342.3},0).wait(1).to({rotation:166.582,x:1573.7,y:316.95},0).wait(1).to({rotation:162.5677,x:1560.85,y:291.5},0).wait(1).to({rotation:158.3418,x:1546.25,y:266.25},0).wait(1).to({rotation:153.8944,x:1529.85,y:241.45},0).wait(1).to({rotation:149.2353,x:1511.6,y:217.5},0).wait(1).to({rotation:144.3547,x:1491.45,y:194.45},0).wait(1).to({rotation:139.2592,x:1469.25,y:172.8},0).wait(1).to({rotation:133.9487,x:1445.1,y:152.75},0).wait(1).to({rotation:128.42,x:1419.05,y:134.8},0).wait(1).to({rotation:122.6731,x:1391.1,y:119.2},0).wait(1).to({rotation:116.7112,x:1361.25,y:106.35},0).wait(1).to({rotation:110.5311,x:1329.75,y:96.55},0).wait(1).to({rotation:104.1328,x:1296.7,y:90.4},0).wait(1).to({rotation:97.5757,x:1262.55,y:88.3},0).wait(1).to({rotation:91.1773,x:1229.25,y:90.3},0).wait(1).to({rotation:84.9972,x:1197.4,y:96.05},0).wait(1).to({rotation:79.0353,x:1167.15,y:105.35},0).wait(1).to({rotation:73.2884,x:1138.45,y:117.65},0).wait(1).to({rotation:67.7597,x:1111.65,y:132.7},0).wait(1).to({rotation:62.4492,x:1086.75,y:150.15},0).wait(1).to({rotation:57.3537,x:1063.65,y:169.65},0).wait(1).to({rotation:52.4731,x:1042.5,y:190.85},0).wait(1).to({rotation:47.814,x:1023.2,y:213.45},0).wait(1).to({rotation:43.3666,x:1005.7,y:237.15},0).wait(1).to({rotation:39.1407,x:990,y:261.6},0).wait(1).to({rotation:35.1265,x:976,y:286.55},0).wait(1).to({rotation:31.3337,x:963.6,y:311.8},0).wait(1).to({rotation:27.7559,x:952.75,y:337},0).wait(1).to({rotation:24.3964,x:943.25,y:361.95},0).wait(1).to({rotation:21.2518,x:935.15,y:386.5},0).wait(1).to({rotation:18.3221,x:928.15,y:410.2},0).wait(1).to({rotation:15.614,x:922.25,y:433.05},0).wait(1).to({rotation:13.1208,x:917.3,y:454.75},0).wait(1).to({rotation:10.8425,x:913.25,y:475.2},0).wait(1).to({rotation:8.7824,x:909.9,y:494.2},0).wait(1).to({rotation:6.9406,x:907.25,y:511.55},0).wait(1).to({rotation:5.3138,x:905.15,y:527.25},0).wait(1).to({rotation:3.9051,x:903.5,y:541},0).wait(1).to({rotation:2.7114,x:902.15,y:552.9},0).wait(1).to({rotation:1.736,x:901.25,y:562.7},0).wait(1).to({rotation:0.9788,x:900.6,y:570.4},0).wait(1).to({rotation:0.4365,x:900.1,y:576},0).wait(1).to({rotation:0.1091,x:899.85,y:579.35},0).wait(1).to({rotation:0.0033,x:899.8,y:580.45},0).wait(1).to({regY:81.1,rotation:0,y:618.85},0).to({_off:true},1).wait(32));

	// play_pause_copy_2
	this.videoplay = new lib.playbtn2();
	this.videoplay.name = "videoplay";
	this.videoplay.setTransform(1496.2,30.85,0.86,0.86);
	this.videoplay._off = true;
	new cjs.ButtonHelper(this.videoplay, 0, 1, 2, false, new lib.playbtn2(), 3);

	this.timeline.addTween(cjs.Tween.get(this.videoplay).wait(1121).to({_off:false},0).wait(34));

	// play_pause_copy
	this.pausing = new lib.play_pause();
	this.pausing.name = "pausing";
	this.pausing.setTransform(1516.3,50.95,0.86,0.86,0,0,0,23.4,23.4);

	this.timeline.addTween(cjs.Tween.get(this.pausing).to({_off:true},1121).wait(34));

	// refresh
	this.again = new lib.repeat();
	this.again.name = "again";
	this.again.setTransform(1348.85,30.8,1,0.9995);
	new cjs.ButtonHelper(this.again, 0, 1, 2, false, new lib.repeat(), 3);

	this.timeline.addTween(cjs.Tween.get(this.again).to({_off:true},1121).wait(34));

	// sounding
	this.mutte = new lib.sounding();
	this.mutte.name = "mutte";
	this.mutte.setTransform(1442.3,51.15,1.96,1.96,0,0,0,10.2,10.7);

	this.timeline.addTween(cjs.Tween.get(this.mutte).wait(1155));

	// fill_url
	this.instance_1 = new lib.urlpsd("synched",0);
	this.instance_1.setTransform(1261.5,344.85,0.6736,0.6736,0,0,0,424.5,433.7);
	this.instance_1.alpha = 0.0195;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1093).to({_off:false},0).wait(1).to({regX:426,regY:246.5,x:1262.45,y:218.7,alpha:0.0526},0).wait(1).to({alpha:0.0853},0).wait(1).to({alpha:0.1179},0).wait(1).to({alpha:0.1505},0).wait(1).to({alpha:0.1832},0).wait(1).to({alpha:0.2158},0).wait(1).to({alpha:0.2484},0).wait(1).to({alpha:0.2811},0).wait(1).to({alpha:0.3137},0).wait(1).to({alpha:0.3463},0).wait(1).to({alpha:0.3789},0).wait(1).to({alpha:0.4116},0).wait(1).to({alpha:0.4442},0).wait(1).to({alpha:0.4768},0).wait(1).to({alpha:0.5095},0).wait(1).to({alpha:0.5421},0).wait(1).to({alpha:0.5747},0).wait(1).to({alpha:0.6074},0).wait(1).to({alpha:0.64},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:424.8,regY:433.8,x:1261.5,y:344.85,alpha:0.8906},0).wait(22).to({regX:424.5,regY:433.7,alpha:0},0).wait(1).to({regX:426,regY:246.5,x:1262.45,y:218.7,alpha:0.0711},0).wait(1).to({alpha:0.1422},0).wait(1).to({alpha:0.2133},0).wait(1).to({alpha:0.2844},0).wait(1).to({alpha:0.3556},0).wait(1).to({alpha:0.4267},0).wait(1).to({alpha:0.4978},0).wait(1).to({alpha:0.5689},0).wait(1).to({alpha:0.64},0).wait(1));

	// url
	this.instance_2 = new lib.urlpsd("synched",0);
	this.instance_2.setTransform(1262.6,317.5,0.2,0.2,0,0,0,424.5,433);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1010).to({_off:false},0).wait(1).to({regX:426,regY:246.5,scaleX:0.3391,scaleY:0.3391,x:1262.4,y:269.4,alpha:0.1113},0).wait(1).to({scaleX:0.439,scaleY:0.439,x:1262.15,y:260.65,alpha:0.2225},0).wait(1).to({scaleX:0.4682,scaleY:0.4682,x:1262.2,y:255.5,alpha:0.3338},0).wait(1).to({scaleX:0.4956,scaleY:0.4956,y:250.65,alpha:0.445},0).wait(1).to({scaleX:0.5212,scaleY:0.5212,x:1262.25,y:246.15,alpha:0.5562},0).wait(1).to({scaleX:0.5453,scaleY:0.5453,x:1262.3,y:241.85,alpha:0.6675},0).wait(1).to({scaleX:0.5679,scaleY:0.5679,y:237.9,alpha:0.7788},0).wait(1).to({scaleX:0.589,scaleY:0.589,x:1262.35,y:234.15,alpha:0.89},0).wait(1).to({scaleX:0.6087,scaleY:0.6087,x:1262.4,y:230.65},0).wait(1).to({scaleX:0.6271,scaleY:0.6271,y:227.4},0).wait(1).to({scaleX:0.6442,scaleY:0.6442,x:1262.45,y:224.35},0).wait(1).to({scaleX:0.6602,scaleY:0.6602,y:221.5},0).wait(1).to({scaleX:0.6736,scaleY:0.6736,y:219.15},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:424.8,regY:433.8,x:1261.5,y:344.85,alpha:0.8906},0).to({_off:true},16).wait(61));

	// rise_up_face
	this.instance_3 = new lib.face("synched",0);
	this.instance_3.setTransform(1262.9,395.95,1.07,1.07,0,0,0,0.2,0.2);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1010).to({_off:false},0).wait(1).to({regX:0,regY:0,x:1262.7,y:395.75,alpha:0.1111},0).wait(1).to({alpha:0.2222},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.4444},0).wait(1).to({alpha:0.5556},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.7778},0).wait(1).to({alpha:0.8889},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:0.2,regY:0.2,scaleX:1.0699,scaleY:1.0699,x:1262.85,y:395.9},0).wait(77));

	// brain
	this.instance_4 = new lib.Symbol3();
	this.instance_4.setTransform(1266.05,223.85,1,1,0,0,0,146.2,78.9);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1024).to({_off:false},0).wait(1).to({alpha:0.0825},0).wait(1).to({alpha:0.165},0).wait(1).to({alpha:0.2475},0).wait(1).to({alpha:0.33},0).wait(1).to({alpha:0.2475},0).wait(1).to({alpha:0.165},0).wait(1).to({alpha:0.0825},0).wait(1).to({alpha:0},0).wait(1).to({alpha:0.1125},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.3375},0).wait(1).to({alpha:0.45},0).wait(1).to({alpha:0.3375},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.1125},0).wait(1).to({alpha:0},0).wait(1).to({alpha:0.185},0).wait(1).to({alpha:0.37},0).wait(1).to({alpha:0.555},0).wait(1).to({alpha:0.74},0).wait(1).to({alpha:0.6325},0).wait(1).to({alpha:0.525},0).wait(1).to({alpha:0.4175},0).wait(1).to({alpha:0.31},0).wait(1).to({alpha:0.54},0).wait(1).to({alpha:0.77},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.85},0).wait(1).to({alpha:0.7},0).wait(1).to({alpha:0.545},0).wait(1).to({alpha:0.39},0).wait(68).to({alpha:0.1914},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.26},0).wait(1).to({alpha:0.295},0).wait(1).to({alpha:0.33},0).wait(1).to({x:1266,alpha:0.2475},0).wait(1).to({alpha:0.165},0).wait(1).to({x:1265.95,alpha:0.0825},0).wait(1).to({alpha:0},0).wait(1).to({alpha:0.1125},0).wait(1).to({alpha:0.225},0).wait(1).to({alpha:0.3375},0).wait(1).to({alpha:0.45},0).wait(1).to({alpha:0.38},0).wait(1).to({alpha:0.31},0).wait(1).to({alpha:0.24},0).wait(1).to({alpha:0.17},0).wait(1).to({alpha:0.3125},0).wait(1).to({alpha:0.455},0).wait(1).to({alpha:0.5975},0).wait(1).to({alpha:0.74},0).wait(1).to({alpha:0.6575},0).wait(1).to({alpha:0.575},0).wait(1).to({alpha:0.4925},0).wait(1).to({alpha:0.41},0).wait(1).to({alpha:0.5633},0).wait(1).to({alpha:0.7167},0).wait(1).to({alpha:0.87},0).wait(1).to({alpha:0.825},0).wait(1).to({alpha:0.78},0).wait(1).to({alpha:0.555},0).wait(1).to({alpha:0.33},0).wait(1));

	// gen_2
	this.instance_5 = new lib.gen();
	this.instance_5.setTransform(1409.9,353.5,1.2,1.2,0,0,0,567.1,294.6);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(470).to({_off:false},0).wait(6).to({regX:567.7,regY:294.5,x:1410.6,y:353.4},0).wait(1).to({x:1407.25,y:353.6},0).wait(1).to({x:1387.75,y:354.9},0).wait(1).to({x:1339.4,y:358.15},0).wait(1).to({x:1267.6,y:360.85},0).wait(1).to({x:1189.4,y:346.35},0).wait(1).to({x:1146.85,y:291.55},0).wait(1).to({x:1129.6,y:232.7},0).wait(1).to({x:1120.8,y:191.35},0).wait(1).to({x:1117.45,y:174.4},0).wait(1).to({x:1116.9,y:171.5},0).wait(1).to({x:1116.85,y:171.35},0).wait(1).to({regX:567.1,regY:294.6,x:1116.15,y:171.45},0).wait(15).to({regX:567.6,x:1116.2},0).wait(1).to({regX:567.7,regY:294.5,x:1116.3,y:171.35},0).wait(1).to({x:1116.7,y:173.85},0).wait(1).to({x:1119.05,y:189.95},0).wait(1).to({x:1126.2,y:240.9},0).wait(1).to({x:1139.2,y:333.8},0).wait(1).to({x:1171.65,y:422.5},0).wait(1).to({x:1255.9,y:421.95},0).wait(1).to({x:1337.05,y:397.5},0).wait(1).to({x:1381.8,y:383.65},0).wait(1).to({x:1396.05,y:379.3},0).wait(1).to({x:1398.25,y:378.65},0).wait(1).to({x:1398.3,y:378.6},0).wait(1).to({regX:567.6,x:1398.2,y:378.65},0).wait(14).to({regY:294.6,y:378.7},0).wait(1).to({regX:567.7,regY:294.5,x:1398.3,y:378.55},0).wait(1).to({x:1396.3,y:381.5},0).wait(1).to({x:1385.55,y:397.3},0).wait(1).to({x:1361.75,y:433},0).wait(1).to({x:1328,y:482.9},0).wait(1).to({x:1281.85,y:528.45},0).wait(1).to({x:1225.8,y:527.45},0).wait(1).to({x:1176.5,y:504.35},0).wait(1).to({x:1140.75,y:483.85},0).wait(1).to({x:1124.55,y:474.15},0).wait(1).to({x:1121.55,y:472.3},0).wait(1).to({x:1121.4,y:472.2},0).wait(1).to({regX:567.6,regY:294.6,x:1121.3,y:472.3},0).wait(13).to({x:1121.25},0).wait(1).to({regX:567.7,regY:294.5,x:1121.35,y:472.1},0).wait(1).to({x:1121.2,y:470.4},0).wait(1).to({x:1119.95,y:458.85},0).wait(1).to({x:1117.25,y:422.5},0).wait(1).to({x:1123.1,y:351.45},0).wait(1).to({x:1196.5,y:266.7},0).wait(1).to({x:1300.8,y:234.1},0).wait(1).to({x:1365.9,y:224.3},0).wait(1).to({x:1388.1,y:221.95},0).wait(1).to({x:1391.45,y:221.6},0).wait(1).to({x:1391.65,y:221.55},0).wait(1).to({regX:567.6,regY:294.6,x:1391.55,y:221.65},0).wait(13).to({regY:294.1,y:222.1},0).wait(1).to({regX:567.7,regY:294.5,x:1391.75,y:222.8},0).wait(1).to({x:1394.25,y:227.35},0).wait(1).to({x:1406.35,y:249.55},0).wait(1).to({x:1430.95,y:295.7},0).wait(1).to({x:1462.85,y:368},0).wait(1).to({x:1466.95,y:459.2},0).wait(1).to({x:1426.3,y:507.9},0).wait(1).to({x:1382.45,y:531.75},0).wait(1).to({x:1356.8,y:541.6},0).wait(1).to({x:1351.15,y:543.5},0).wait(1).to({x:1350.75,y:543.6},0).wait(1).to({regY:294.4,y:542.6},0).wait(12).to({regX:567.6,y:542.65},0).wait(1).to({regX:567.7,regY:294.5,x:1350.8,y:542.75},0).wait(1).to({x:1346.65,y:544.05},0).wait(1).to({x:1323.25,y:551.1},0).wait(1).to({x:1270.05,y:562.9},0).wait(1).to({x:1207.45,y:547.1},0).wait(1).to({x:1166.7,y:477.15},0).wait(1).to({x:1139.7,y:423.85},0).wait(1).to({x:1127.8,y:402.45},0).wait(1).to({x:1125.65,y:398.75},0).wait(1).to({x:1125.55,y:398.6},0).wait(1).to({regX:567.4,regY:294.4,x:1125.4,y:398.7},0).wait(12).to({x:1125.45,y:398.75},0).wait(1).to({regX:567.7,regY:294.5,x:1125.8},0).wait(1).to({x:1126.2,y:394.4},0).wait(1).to({x:1128.25,y:368.4},0).wait(1).to({x:1129.7,y:309.45},0).wait(1).to({x:1141.9,y:301.8},0).wait(1).to({x:1256.15,y:394.4},0).wait(1).to({x:1363.85,y:439.75},0).wait(1).to({x:1404.9,y:452.1},0).wait(1).to({x:1411.6,y:453.9},0).wait(1).to({x:1411.85,y:453.95},0).wait(1).to({regX:567.1,regY:294.4,x:1411.4,y:453.75},0).wait(13).to({y:453.85},0).wait(1).to({regX:567.7,regY:294.5,x:1411.9,y:454.1},0).wait(1).to({x:1403.65,y:460.05},0).wait(1).to({x:1356.15,y:487.8},0).wait(1).to({x:1267.05,y:443.25},0).wait(1).to({x:1177.95,y:300.1},0).wait(1).to({x:1130.5,y:267.3},0).wait(1).to({x:1122.15,y:263.1},0).wait(1).to({x:1121.95,y:263},0).wait(1).to({regX:567.1,regY:294.4,x:1121.2,y:262.85},0).wait(13).to({regX:566.1,regY:294.3,x:1121.3},0).wait(1).to({regX:567.7,regY:294.5,x:1124.05,y:262.75},0).wait(1).to({x:1149.6,y:249.95},0).wait(1).to({x:1277,y:163.6},0).wait(1).to({x:1382.6,y:207.8},0).wait(1).to({x:1403.05,y:225.7},0).wait(1).to({x:1403.75,y:226.3},0).wait(1).to({regX:566.2,regY:294.3,x:1401.65,y:226.1},0).wait(15).to({regX:565.8,regY:293.8,x:1401.85,y:226.4},0).wait(1).to({regX:567.7,regY:294.5,x:1404.1,y:227.25,alpha:0.9333},0).wait(1).to({x:1404.15,y:227.45,alpha:0.8667},0).wait(1).to({y:228.8,alpha:0.8},0).wait(1).to({x:1404.1,y:233.65,alpha:0.7333},0).wait(1).to({x:1403.65,y:246.5,alpha:0.6667},0).wait(1).to({x:1400,y:273.6,alpha:0.6},0).wait(1).to({x:1380.05,y:318.75,alpha:0.5333},0).wait(1).to({x:1310.9,y:361.7,alpha:0.4667},0).wait(1).to({x:1247.2,y:374.1,alpha:0.4},0).wait(1).to({x:1212.05,y:377.6,alpha:0.3333},0).wait(1).to({x:1196,y:378.75,alpha:0.2667},0).wait(1).to({x:1190,y:379.15,alpha:0.2},0).wait(1).to({x:1188.4,y:379.25,alpha:0.1333},0).wait(1).to({x:1188.15,alpha:0.0667},0).wait(1).to({x:1188.1,alpha:0},0).to({_off:true},1).wait(60).to({_off:false,regX:567.4,regY:294.6,x:1002,y:526.2},0).wait(1).to({regX:567.7,regY:294.5,x:1002.55,alpha:0.125},0).wait(1).to({x:1011,y:530.5,alpha:0.25},0).wait(1).to({x:1066.85,y:555.4,alpha:0.375},0).wait(1).to({x:1244.75,y:580.65,alpha:0.5},0).wait(1).to({x:1377.95,y:500.55,alpha:0.625},0).wait(1).to({x:1406.3,y:460.85,alpha:0.75},0).wait(1).to({x:1410.2,y:454.3,alpha:0.875},0).wait(1).to({x:1410.3,y:454.15,alpha:1},0).wait(1).to({regX:567.8,regY:294.6,x:1409.8,y:454.2},0).wait(9).to({regX:567.1,x:1409.95},0).wait(1).to({regX:567.7,regY:294.5,x:1410.5,y:454.15},0).wait(1).to({x:1404.1,y:457.4},0).wait(1).to({x:1364.35,y:475.95},0).wait(1).to({x:1257.7,y:490.75},0).wait(1).to({x:1163.8,y:421.1},0).wait(1).to({x:1131.95,y:387.7},0).wait(1).to({x:1126.85,y:382.25},0).wait(1).to({x:1126.7,y:382.1},0).wait(1).to({regX:567.5,regY:294.6,x:1125.9,y:382.2},0).wait(9).to({regX:566.4,x:1126},0).wait(1).to({regX:567.7,regY:294.5,x:1127.65,y:381.9},0).wait(1).to({x:1131.9,y:374.2},0).wait(1).to({x:1156.95,y:326.3},0).wait(1).to({x:1223.25,y:215},0).wait(1).to({x:1338.7,y:207.2},0).wait(1).to({x:1393.95,y:222.9},0).wait(1).to({x:1403.3,y:225.85},0).wait(1).to({x:1403.55,y:225.95},0).wait(1).to({regX:566.8,regY:294.7,x:1402,y:226.2},0).wait(9).to({regX:566.1,regY:293.3,x:1402.1,y:226.75},0).wait(1).to({regX:567.7,regY:294.5,x:1403.9,y:228.35},0).wait(1).to({x:1399.35,y:233.6},0).wait(1).to({x:1371.75,y:266.2},0).wait(1).to({x:1294.1,y:337.1},0).wait(1).to({x:1184.2,y:330.3},0).wait(1).to({x:1136.85,y:315.1},0).wait(1).to({x:1128.95,y:312.35},0).wait(1).to({x:1128.75,y:312.3},0).wait(1).to({regX:566.3,regY:294.2,x:1126.65,y:310.25},0).wait(9).to({regY:293.9,x:1126.7,y:310.4},0).wait(1).to({regX:567.7,regY:294.5,x:1128.35,y:311.1,alpha:0.8},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(305));

	// po_angliyski
	this.instance_6 = new lib.imperativemood_2("synched",0);
	this.instance_6.setTransform(972.85,17.7,1.2,1.2,0,0,0,0.1,0);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(908).to({_off:false},0).to({_off:true},71).wait(176));

	// ushel___
	this.instance_7 = new lib.do_support_2("synched",0,false);
	this.instance_7.setTransform(943.05,-24.6,1.2,1.2);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(871).to({_off:false},0).to({_off:true},71).wait(213));

	// esli_angliyskiy
	this.instance_8 = new lib.wh_movement_2("synched",0);
	this.instance_8.setTransform(300.35,-153.7,1.2,1.2);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(838).to({_off:false},0).to({_off:true},71).wait(246));

	// angliyskiy
	this.instance_9 = new lib.angliyskiy_2("synched",0);
	this.instance_9.setTransform(1011.7,-104,1.2,1.2);

	this.instance_10 = new lib.angliyskiy();
	this.instance_10.setTransform(1381.4,220.95,0.336,0.336,0,0,0,252.7,41.4);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9}]},677).to({state:[{t:this.instance_10}]},30).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},22).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[]},1).wait(372));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(707).to({_off:false},0).wait(1).to({regX:312,regY:34.7,x:1401.3,y:218.65},0).wait(1).to({x:1401.35,y:218.7},0).wait(1).to({x:1401.45},0).wait(1).to({x:1401.95},0).wait(1).to({x:1403.25,y:218.8},0).wait(1).to({x:1406.1,y:218.95},0).wait(1).to({x:1411.55,y:219.25},0).wait(1).to({x:1421.05,y:219.75},0).wait(1).to({x:1436.25,y:220.65},0).wait(1).to({x:1458.55,y:222.1},0).wait(1).to({x:1487.9,y:224.55},0).wait(1).to({x:1519.75,y:229.2},0).wait(1).to({x:1537.35,y:239.65},0).wait(1).to({x:1519.8,y:256.85},0).wait(1).to({x:1487.95,y:273.7},0).wait(1).to({x:1458.55,y:287.35},0).wait(1).to({x:1436.25,y:297.35},0).wait(1).to({x:1421.1,y:304.05},0).wait(1).to({x:1411.55,y:308.2},0).wait(1).to({x:1406.1,y:310.6},0).wait(1).to({x:1403.25,y:311.85},0).wait(1).to({x:1401.95,y:312.4},0).wait(1).to({x:1401.5,y:312.6},0).wait(1).to({x:1401.35,y:312.65},0).wait(2).to({x:1401.3},0).wait(1).to({regX:252.7,regY:41.5,x:1381.35,y:314.9},0).wait(1).to({regX:312,regY:34.7,x:1401.25,y:312.55},0).wait(1).to({x:1401.2,y:312.5},0).wait(1).to({x:1400.85,y:311.85},0).wait(1).to({x:1399.4,y:309.6},0).wait(1).to({x:1395.5,y:303.45},0).wait(1).to({x:1386.95,y:289.9},0).wait(1).to({x:1370.25,y:263.55},0).wait(1).to({x:1353.6,y:237.25},0).wait(1).to({x:1345.05,y:223.7},0).wait(1).to({x:1341.15,y:217.55},0).wait(1).to({x:1339.75,y:215.3},0).wait(1).to({x:1339.35,y:214.65},0).wait(1).to({x:1339.3,y:214.6},0).wait(1).to({x:1339.25,y:214.55},0).wait(1).to({regX:252.7,regY:41.6,x:1319.3,y:216.95},0).wait(22).to({regX:252.6},0).wait(1).to({regX:312,regY:34.7,x:1339.25,y:214.55,alpha:0.8571},0).wait(1).to({alpha:0.7143},0).wait(1).to({alpha:0.5714},0).wait(1).to({alpha:0.4286},0).wait(1).to({alpha:0.2857},0).wait(1).to({alpha:0.1429},0).wait(1).to({alpha:0},0).wait(4).to({_off:true},1).wait(372));

	// svoi
	this.instance_11 = new lib.svoi("synched",0);
	this.instance_11.setTransform(1247.4,205.7,60,60,0,0,0,283.4,-24.3);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(658).to({_off:false},0).wait(1).to({regX:114.5,regY:27.3,scaleX:51.4205,scaleY:51.4205,x:-7437.25,y:2859},0).wait(1).to({scaleX:43.528,scaleY:43.528,x:-6104.05,y:2451.7,alpha:0.0024},0).wait(1).to({scaleX:36.3226,scaleY:36.3226,x:-4886.9,y:2079.9,alpha:0.0194},0).wait(1).to({scaleX:29.7998,scaleY:29.7998,x:-3785.1,y:1743.35,alpha:0.0819},0).wait(1).to({scaleX:23.9686,scaleY:23.9686,x:-2800.15,y:1442.45,alpha:0.25},0).wait(1).to({scaleX:18.82,scaleY:18.82,x:-1930.5,y:1176.8,alpha:0.6223},0).wait(1).to({scaleX:14.3585,scaleY:14.3585,x:-1176.95,y:946.6,alpha:1},0).wait(1).to({scaleX:10.584,scaleY:10.584,x:-539.25,y:751.8},0).wait(1).to({scaleX:7.4922,scaleY:7.4922,x:-16.9,y:592.3},0).wait(1).to({scaleX:5.0918,scaleY:5.0918,x:388.65,y:468.4},0).wait(1).to({scaleX:3.3742,scaleY:3.3742,x:678.8,y:379.75},0).wait(1).to({scaleX:2.3435,scaleY:2.3435,x:852.95,y:326.6},0).wait(1).to({scaleX:2,scaleY:2,x:911,y:308.9},0).wait(1).to({regX:252.2,regY:40.8,scaleX:0.7227,scaleY:0.7234,x:1224.7,y:258.8},0).wait(1).to({regX:114.5,regY:27.3,x:1125.15,y:249},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:252.2,regY:41.4,x:1224.7,y:258.9},0).wait(1).to({regX:114.5,regY:27.3,x:1125.15,y:248.65},0).wait(1).to({x:1125.2,y:248.7},0).wait(1).to({x:1125.3},0).wait(1).to({x:1125.65},0).wait(1).to({x:1126.65},0).wait(1).to({x:1128.8,y:248.8},0).wait(1).to({x:1133.05,y:248.9},0).wait(1).to({x:1140.55,y:249.1},0).wait(1).to({x:1152.9,y:249.45},0).wait(1).to({x:1172.15,y:249.95},0).wait(1).to({x:1200.8,y:250.75},0).wait(1).to({x:1242,y:251.9},0).wait(1).to({x:1299.5,y:253.45},0).wait(1).to({x:1357,y:255.05},0).wait(1).to({x:1398.25,y:256.2},0).wait(1).to({x:1426.9,y:257},0).wait(1).to({x:1446.15,y:257.5},0).wait(1).to({x:1458.5,y:257.85},0).wait(1).to({x:1465.95,y:258.05},0).wait(1).to({x:1470.2,y:258.15},0).wait(1).to({x:1472.4,y:258.25},0).wait(1).to({x:1473.4},0).wait(1).to({x:1473.75},0).wait(1).to({x:1473.85},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:252.1,regY:41.3,scaleX:0.72,scaleY:0.72,x:1573.4,y:268.4},0).wait(1).to({regX:114.5,regY:27.3,x:1474.3,y:258.25},0).wait(1).to({y:258.3},0).wait(1).to({x:1474.25},0).wait(1).to({x:1474},0).wait(1).to({x:1473.35},0).wait(1).to({x:1471.9,y:258.4},0).wait(1).to({x:1469.1,y:258.5},0).wait(1).to({x:1464.1,y:258.75},0).wait(1).to({x:1455.95,y:259.15},0).wait(1).to({x:1443.2,y:259.75},0).wait(1).to({x:1424.15,y:260.65},0).wait(1).to({x:1396.8,y:261.95},0).wait(1).to({x:1369.5,y:263.3},0).wait(1).to({x:1350.45,y:264.2},0).wait(1).to({x:1337.7,y:264.8},0).wait(1).to({x:1329.55,y:265.2},0).wait(1).to({x:1324.55,y:265.4},0).wait(1).to({x:1321.75,y:265.55},0).wait(1).to({x:1320.3,y:265.65},0).wait(1).to({x:1319.65},0).wait(1).to({x:1319.4},0).wait(1).to({x:1319.35},0).wait(1).to({startPosition:0},0).wait(1).to({x:1319.3},0).wait(1).to({regX:252.1,regY:41.3,x:1418.4,y:275.75},0).wait(22).to({regY:41.2},0).wait(1).to({regX:114.5,regY:27.3,x:1330.75,y:265.7,alpha:0.8571},0).wait(1).to({x:1342.2,alpha:0.7143},0).wait(1).to({x:1353.6,alpha:0.5714},0).wait(1).to({x:1365.05,alpha:0.4286},0).wait(1).to({x:1376.45,alpha:0.2857},0).wait(1).to({x:1387.9,alpha:0.1429},0).wait(1).to({x:1399.3,alpha:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(372));

	// uderzhi
	this.instance_12 = new lib.uderzhi_2("synched",0);
	this.instance_12.setTransform(1126.65,113,1.2,1.2);

	this.instance_13 = new lib.uderzhi();
	this.instance_13.setTransform(1448.95,438.1,0.48,0.48,0,0,0,252.4,41.1);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12}]},629).to({state:[{t:this.instance_13}]},66).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},22).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[]},1).wait(374));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(695).to({_off:false},0).wait(1).to({regX:185.6,regY:67.7,x:1416.85,y:450.8},0).wait(1).to({y:450.85},0).wait(1).to({x:1416.7},0).wait(1).to({x:1416.05},0).wait(1).to({x:1414.3,y:450.95},0).wait(1).to({x:1410.5,y:451.15},0).wait(1).to({x:1403.25,y:451.45},0).wait(1).to({x:1391.1,y:451.8},0).wait(1).to({x:1372.65,y:451.85},0).wait(1).to({x:1347.7,y:450.65},0).wait(1).to({x:1318.55,y:445.85},0).wait(1).to({x:1292,y:432.7},0).wait(1).to({x:1280.8,y:402.2},0).wait(1).to({x:1293.55,y:357.45},0).wait(1).to({x:1313.55,y:316.6},0).wait(1).to({x:1331.3,y:283.9},0).wait(1).to({x:1344.5,y:259.95},0).wait(1).to({x:1353.3,y:243.75},0).wait(1).to({x:1358.8,y:233.6},0).wait(1).to({x:1361.95,y:227.75},0).wait(1).to({x:1363.55,y:224.7},0).wait(1).to({x:1364.3,y:223.3},0).wait(1).to({x:1364.6,y:222.8},0).wait(1).to({x:1364.65,y:222.65},0).wait(2).to({y:222.6},0).wait(1).to({regX:252.4,regY:41.1,x:1396.75,y:209.95},0).wait(1).to({regX:185.6,regY:67.7,x:1364.65,y:222.65},0).wait(1).to({x:1364.7,y:222.7},0).wait(2).to({y:222.85},0).wait(1).to({x:1364.75,y:223.25},0).wait(1).to({x:1364.9,y:224.1},0).wait(1).to({x:1365.2,y:225.75},0).wait(1).to({x:1365.75,y:228.65},0).wait(1).to({x:1366.55,y:233.45},0).wait(1).to({x:1367.9,y:240.95},0).wait(1).to({x:1369.85,y:252.1},0).wait(1).to({x:1372.65,y:268.15},0).wait(1).to({x:1375.5,y:284.25},0).wait(1).to({x:1377.45,y:295.4},0).wait(1).to({x:1378.8,y:302.9},0).wait(1).to({x:1379.6,y:307.7},0).wait(1).to({x:1380.15,y:310.6},0).wait(1).to({x:1380.4,y:312.25},0).wait(1).to({x:1380.55,y:313.1},0).wait(1).to({x:1380.65,y:313.5},0).wait(1).to({y:313.65},0).wait(4).to({regX:252.3,regY:41.1,x:1412.65,y:300.9},0).wait(23).to({regX:185.6,regY:67.7,x:1380.6,y:313.6,alpha:0.8571},0).wait(1).to({alpha:0.7143},0).wait(1).to({alpha:0.5714},0).wait(1).to({alpha:0.4286},0).wait(1).to({alpha:0.2857},0).wait(1).to({alpha:0.1429},0).wait(1).to({alpha:0},0).wait(4).to({_off:true},1).wait(374));

	// much_
	this.instance_14 = new lib.presentperfect_2("synched",0,false);
	this.instance_14.setTransform(963.6,141.2,1.2,1.2);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(761).to({_off:false},0).to({_off:true},51).wait(343));

	// so
	this.instance_15 = new lib.contractedforms_2_2("synched",0,false);
	this.instance_15.setTransform(539.8,64.5,1.2,1.2);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(596).to({_off:false},0).to({_off:true},37).wait(522));

	// him
	this.instance_16 = new lib.indirectquestions_2_2("synched",0);
	this.instance_16.setTransform(913.1,221.35,1.2,1.2,0,0,0,0,0.1);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(573).to({_off:false},0).to({_off:true},34).wait(548));

	// love
	this.instance_17 = new lib.relativepronouns_2("synched",0);
	this.instance_17.setTransform(1049.9,-106.15,1.2,1.2);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(547).to({_off:false},0).to({_off:true},39).wait(569));

	// she
	this.instance_18 = new lib.auxiliaryverbs_2("synched",0);
	this.instance_18.setTransform(656.25,173.75,1.2,1.2,0,0,0,0,0.1);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(520).to({_off:false},0).to({_off:true},40).wait(595));

	// doesnt
	this.instance_19 = new lib.pastcontinuous_2("synched",0);
	this.instance_19.setTransform(1095.75,61.95,1.2,1.2,0,0,0,0.1,0.1);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(493).to({_off:false},0).to({_off:true},41).wait(621));

	// Why
	this.instance_20 = new lib.futuresimple_2("synched",0);
	this.instance_20.setTransform(623,-170.6,1.2,1.2);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(465).to({_off:false},0).to({_off:true},42).wait(648));

	// generator_fraz
	this.instance_21 = new lib.generatorfraz_2("synched",0);
	this.instance_21.setTransform(2420.25,105.6,1.2,1.2);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(415).to({_off:false},0).to({_off:true},60).wait(680));

	// propadaut
	this.instance_22 = new lib.propadaut();
	this.instance_22.setTransform(1317,604.15,1.212,1.212,0,0,0,49.9,45.5);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(273).to({_off:false},0).wait(60).to({regX:49.8,regY:45.4,x:1317.1,y:604.05},0).wait(1).to({regX:15.8,regY:29.9,x:1275.85,y:585.25},0).wait(1).to({x:1276},0).wait(1).to({x:1277.1,y:585},0).wait(1).to({x:1280.85,y:584.05},0).wait(1).to({x:1290.35,y:581.35},0).wait(1).to({x:1307.65,y:574.25},0).wait(1).to({x:1326.75,y:555.75},0).wait(1).to({x:1323.8,y:507.1},0).wait(1).to({x:1307,y:441.35},0).wait(1).to({x:1307.65,y:399.85},0).wait(1).to({x:1313.05,y:378},0).wait(1).to({x:1316.75,y:368.1},0).wait(1).to({x:1318.35,y:364.45},0).wait(1).to({x:1318.8,y:363.45},0).wait(1).to({x:1318.85,y:363.3},0).wait(2).to({regX:49.9,regY:45.5,x:1360.1,y:382.1},0).wait(1).to({regX:15.8,regY:29.9,x:1318.7,y:363.15},0).wait(2).to({x:1318.6},0).wait(1).to({x:1318.1},0).wait(1).to({x:1316.8},0).wait(1).to({x:1313.95},0).wait(1).to({x:1308.4},0).wait(1).to({x:1298.6},0).wait(1).to({x:1282.5},0).wait(1).to({x:1260},0).wait(1).to({x:1243.9},0).wait(1).to({x:1234.1},0).wait(1).to({x:1228.55},0).wait(1).to({x:1225.7},0).wait(1).to({x:1224.4},0).wait(1).to({x:1223.9},0).wait(1).to({x:1223.8},0).wait(2).to({x:1223.75},0).wait(1).to({regX:50,regY:45.5,scaleX:1.2119,scaleY:1.2119,x:1265.25,y:382.05},0).wait(53).to({regX:49.9,regY:45.4,scaleX:1.212,scaleY:1.212,x:1265.2,y:382},0).wait(1).to({regX:15.8,regY:29.9,x:1223.8,y:363.2,alpha:0.875},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0},0).to({_off:true},1).wait(723));

	// znaniya
	this.instance_23 = new lib.znaniya();
	this.instance_23.setTransform(1465.6,203,0.6,0.6,0,0,0,270.2,40.1);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(285).to({_off:false},0).wait(48).to({regX:270.1},0).wait(1).to({regX:139.2,regY:93.8,x:1381.35,y:236.5},0).wait(1).to({x:1375.65,y:237.9},0).wait(1).to({x:1369.5,y:239.45},0).wait(1).to({x:1361.7,y:241.6},0).wait(1).to({x:1350.25,y:245.15},0).wait(1).to({x:1332.15,y:251.7},0).wait(1).to({x:1304.35,y:265.25},0).wait(1).to({x:1267.6,y:294.95},0).wait(1).to({x:1243.5,y:334},0).wait(1).to({x:1234.85,y:361.7},0).wait(1).to({x:1231.65,y:379.3},0).wait(1).to({x:1230.35,y:390.35},0).wait(1).to({x:1229.75,y:397.8},0).wait(1).to({x:1229.35,y:403.65},0).wait(1).to({x:1229.1,y:409.05},0).wait(1).to({x:1228.95,y:414.4},0).wait(1).to({regX:270.1,regY:40.1,x:1307.55,y:382.15},0).wait(1).to({regX:139.2,regY:93.8,x:1228.95,y:414.35},0).wait(1).to({x:1229},0).wait(1).to({x:1229.15},0).wait(1).to({x:1229.8},0).wait(1).to({x:1231.5},0).wait(1).to({x:1235.2},0).wait(1).to({x:1242.45},0).wait(1).to({x:1255.3},0).wait(1).to({x:1276.4},0).wait(1).to({x:1305.85},0).wait(1).to({x:1327},0).wait(1).to({x:1339.8},0).wait(1).to({x:1347.05},0).wait(1).to({x:1350.8},0).wait(1).to({x:1352.5},0).wait(1).to({x:1353.15},0).wait(1).to({x:1353.3},0).wait(3).to({regX:270.1,regY:40.1,x:1431.85,y:382.1},0).wait(5).to({regX:344.9,regY:108.9,x:1476.8,y:423.45},0).wait(1).to({regX:139.2,regY:93.8,x:1353.3,y:414.35},0).wait(1).to({rotation:-31.8795,x:1367.1,y:480.9},0).wait(1).to({rotation:-64.1932,x:1414.85,y:530.55},0).wait(1).to({rotation:-120.369,x:1551.3,y:554.45},0).wait(1).to({rotation:-134.544,x:1576.8,y:537.7},0).wait(1).to({rotation:-138.582,x:1583.25,y:531.85},0).wait(1).to({rotation:-133.599,x:1575.25,y:539},0).wait(1).to({rotation:-120.369,x:1551.3,y:554.45},0).wait(1).to({rotation:-90,x:1487.7,y:566.8},0).wait(1).to({rotation:-69.9862,x:1446,y:556.25},0).wait(1).to({rotation:-62,x:1430.8,y:548.1},0).wait(1).to({rotation:-68.2162,x:1442.5,y:554.65},0).wait(1).to({rotation:-77.1285,x:1460.4,y:561.7},0).wait(1).to({rotation:-90,x:1487.7,y:566.8},0).wait(1).to({rotation:-104,x:1517.8,y:565.35},0).wait(1).to({rotation:-107,x:1524.15,y:564.1},0).wait(1).to({rotation:-104,x:1517.8,y:565.35},0).wait(1).to({rotation:-90,x:1487.7,y:566.8},0).wait(1).to({rotation:-80.2433,x:1466.85,y:563.5},0).wait(1).to({rotation:-77.5558,x:1461.3,y:562},0).wait(1).to({rotation:-80.2433,x:1466.85,y:563.5},0).wait(1).to({rotation:-90,x:1487.7,y:566.8},0).wait(1).to({rotation:-95,x:1498.4,y:567.15},0).wait(1).to({rotation:-97,x:1502.75,y:567},0).wait(1).to({regX:344.4,regY:107.8,rotation:-95.9984,x:1496.85,y:443.4},0).wait(1).to({regX:139.2,regY:93.8,rotation:-95.9815,x:1501.3,y:571.4},0).wait(1).to({rotation:-95.926,x:1501.25,y:585.45},0).wait(1).to({rotation:-95.8333,x:1501,y:608.9},0).wait(1).to({rotation:-95.7038,x:1500.75,y:641.7},0).wait(1).to({rotation:-95.5372,x:1500.35,y:683.9},0).wait(1).to({rotation:-95.3333,x:1499.95,y:735.55},0).wait(1).to({rotation:-95.0927,x:1499.4,y:796.5,alpha:0.5},0).wait(1).to({rotation:-95,x:1499.15,y:814.45,alpha:0},0).wait(1).to({y:810},0).to({_off:true},1).wait(745));

	// bf2
	this.instance_24 = new lib.big_foots("synched",0);
	this.instance_24.setTransform(1488.8,547.1,1.2,1.2,0,0,0,556.8,454.7);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(273).to({_off:false},0).to({_off:true},60).wait(822));

	// steps2
	this.instance_25 = new lib.step_sound("synched",0,false);
	this.instance_25.setTransform(1395.8,415.15,1.2,1.2,0,0,0,483.4,345.2);
	this.instance_25.alpha = 0.4883;
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(188).to({_off:false},0).to({_off:true},138).wait(829));

	// uhodit
	this.instance_26 = new lib.uhodit();
	this.instance_26.setTransform(1276.1,564.15,1.212,1.212,0,0,0,50,45.5);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(113).to({_off:false},0).wait(60).to({regX:50.1,regY:45.4,x:1276.2,y:564.05},0).wait(1).to({regX:44,regY:65.1,x:1268.8,y:587.9},0).wait(1).to({x:1268.95},0).wait(1).to({x:1270.05,y:587.65},0).wait(1).to({x:1273.85,y:586.75},0).wait(1).to({x:1283.75,y:584.15},0).wait(1).to({x:1303.25,y:577.75},0).wait(1).to({x:1331.75,y:562.35},0).wait(1).to({x:1356.7,y:522.75},0).wait(1).to({x:1367.95,y:466.05},0).wait(1).to({x:1377.95,y:427.65},0).wait(1).to({x:1385.55,y:406.5},0).wait(1).to({x:1389.65,y:396.75},0).wait(1).to({x:1391.3,y:393.1},0).wait(1).to({x:1391.75,y:392.1},0).wait(1).to({x:1391.8,y:391.95},0).wait(2).to({regX:50.1,regY:45.4,x:1399.2,y:368},0).wait(1).to({regX:44,regY:65.1,x:1391.8,y:391.85},0).wait(2).to({x:1391.65},0).wait(1).to({x:1391,y:391.9},0).wait(1).to({x:1389.35},0).wait(1).to({x:1385.6},0).wait(1).to({x:1378.35},0).wait(1).to({x:1365.55},0).wait(1).to({x:1344.5},0).wait(1).to({x:1315.15},0).wait(1).to({x:1294.1},0).wait(1).to({x:1281.3},0).wait(1).to({x:1274.05},0).wait(1).to({x:1270.35},0).wait(1).to({x:1268.65},0).wait(1).to({x:1268},0).wait(1).to({x:1267.85},0).wait(2).to({x:1267.8},0).wait(1).to({regX:50.1,regY:45.4,scaleX:1.2119,scaleY:1.2119,x:1275.2,y:368},0).wait(51).to({scaleX:1.212,scaleY:1.212,x:1275.25},0).wait(1).to({regX:44,regY:65.1,x:1267.85,y:391.85,alpha:0.9333},0).wait(1).to({alpha:0.8667},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.7333},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.5333},0).wait(1).to({alpha:0.4667},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2667},0).to({_off:true},1).wait(882));

	// angliiskiy
	this.instance_27 = new lib.angliiskiy();
	this.instance_27.setTransform(1483.7,198,0.8,0.8,0,0,0,270.2,40);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(125).to({_off:false},0).wait(49).to({regX:125.3,regY:74.4,x:1362.1,y:226.8},0).wait(1).to({x:1356.4,y:228.25},0).wait(1).to({x:1350.15,y:230},0).wait(1).to({x:1342.3,y:232.45},0).wait(1).to({x:1330.65,y:236.7},0).wait(1).to({x:1312.1,y:245.05},0).wait(1).to({x:1283.15,y:262.9},0).wait(1).to({x:1243.9,y:302.1},0).wait(1).to({x:1217.25,y:350.65},0).wait(1).to({x:1207.45,y:382.65},0).wait(1).to({x:1203.8,y:402},0).wait(1).to({x:1202.3,y:413.75},0).wait(1).to({x:1201.6,y:421.55},0).wait(1).to({x:1201.2,y:427.6},0).wait(1).to({x:1200.95,y:433.05},0).wait(1).to({x:1200.75,y:438.45},0).wait(1).to({regX:270.2,regY:40,x:1316.7,y:410.95},0).wait(1).to({regX:125.3,regY:74.4,x:1200.75,y:438.4},0).wait(1).to({x:1200.8},0).wait(1).to({x:1201},0).wait(1).to({x:1201.7},0).wait(1).to({x:1203.65},0).wait(1).to({x:1208},0).wait(1).to({x:1216.4},0).wait(1).to({x:1231.25},0).wait(1).to({x:1255.7},0).wait(1).to({x:1289.8},0).wait(1).to({x:1314.25},0).wait(1).to({x:1329.1},0).wait(1).to({x:1337.5},0).wait(1).to({x:1341.8},0).wait(1).to({x:1343.75},0).wait(1).to({x:1344.5},0).wait(1).to({x:1344.7},0).wait(3).to({regX:270.1,regY:40,x:1460.55,y:410.9},0).wait(51).to({y:410.95},0).wait(1).to({regX:125.3,regY:74.4,x:1344.75,y:438.4,alpha:0.9333},0).wait(1).to({alpha:0.8667},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.7333},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.5333},0).wait(1).to({alpha:0.4667},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.2667},0).to({_off:true},1).wait(882));

	// bf1
	this.instance_28 = new lib.big_foots("synched",0);
	this.instance_28.setTransform(1472.25,547.1,1.2,1.2,0,0,0,556.6,454.7);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(113).to({_off:false},0).to({_off:true},66).wait(976));

	// steps1
	this.instance_29 = new lib.step_sound("synched",0);
	this.instance_29.setTransform(1395.45,415.45,1.2,1.2,0,0,0,483.1,345.4);
	this.instance_29.alpha = 0.4883;
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(31).to({_off:false},0).to({_off:true},153).wait(971));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-47651.9,-10167.7,80679.20000000001,31257.4);
// library properties:
lib.properties = {
	id: 'AEE097CEFB9D2345A5FAE086D49C4CB7',
	width: 2525,
	height: 720,
	fps: 29.97,
	color: "#323232",
	opacity: 1.00,
	manifest: [
		{src:"../images/CachedBmp_2.png?58", id:"CachedBmp_2"},
		{src:"../images/generator_fraz_promo_atlas_1.png?58", id:"generator_fraz_promo_atlas_1"},
		{src:"../sounds/brokenglass9.mp3", id:"brokenglass9"},
		{src:"../sounds/flyingpast.mp3", id:"flyingpast"},
		{src:"../sounds/step6.mp3", id:"step6"},
		{src:"../sounds/voltaicarc.mp3", id:"voltaicarc"},
		{src:"../sounds/step2.mp3", id:"step2"},
		{src:"../sounds/step27.mp3", id:"step27"},
		{src:"../sounds/flyingpast4.mp3", id:"flyingpast4"},
		{src:"../sounds/step4.mp3", id:"step4"},
		{src:"../sounds/step3.mp3", id:"step3"},
		{src:"../sounds/win6.mp3", id:"win6"},
		{src:"../sounds/win2.mp3", id:"win2"}
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