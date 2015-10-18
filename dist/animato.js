(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Animato=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){currentQueue[queueIndex].run()}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;clearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},{}],2:[function(require,module,exports){var Raf=require("raf");function Animato(from,to,time,step,complete){if(arguments.length===1&&from&&typeof from.from==="object"&&typeof from.to==="object"){return new Animato(from.from,from.to,from.duration,from.step,from.complete)}if(this.constructor!==Animato){return new Animato(from,to,time,step,complete)}this._from=from;this._inter={};this._to=to||null;this._duration=time||200;this._step=step||function(){};this._complete=function(){};if(typeof complete==="function"){this.start(complete)}}Animato.prototype.to=function(to){this._to=to;return this};Animato.prototype.duration=function(duration){this._duration=duration;return this};Animato.prototype.step=function(fn){this._step=fn;return this};Animato.prototype.complete=function(fn){this._complete=fn;return this};Animato.prototype.start=function(fn){var self=this;self.deltas={};for(var k in self._from){if(!self._from.hasOwnProperty(k))continue;self.deltas[k]=self._to[k]-self._from[k]}if(typeof fn==="function"){this._complete=fn}self._step(self._from);return Raf(function tick(delta){var proc=delta/self._duration,k;for(k in self._from){if(!self._from.hasOwnProperty(k))continue;self._inter[k]=self._from[k]+self.deltas[k]*proc}if(proc>=1){self._step(self._to);return self._complete()}self._step(self._inter);Raf(tick)})};Animato.Frames=function(from,to,count){if(this.constructor!==Animato.Frames){return new Animato.Frames(from,to,count)}this._from=from;this._to=to;this._count=count;this._step=function(){};this._complete=function(){};this._duration=200};Animato.Frames.prototype.toArray=function(){var frames=[this._from],deltas={},steps={},inter={},k=null;for(k in this._from){if(!this._from.hasOwnProperty(k))continue;steps[k]=(deltas[k]=this._to[k]-this._from[k])/this._count}for(var i=1;i<this._count;++i){inter={};for(k in this._from){if(!this._from.hasOwnProperty(k))continue;inter[k]=this._from[k]+steps[k]*i}frames.push(inter)}frames.push(this._to);return frames};Animato.Frames.prototype.step=function(fn){this._step=fn||this._step;return this};Animato.Frames.prototype.duration=function(duration){this._duration=duration;return this};Animato.Frames.prototype.start=function(fn){var self=this,frames=this.toArray(),delay=this._duration/this._count,index=-1,interval=setInterval(function(){var frame=frames[--index];if(!frame){return self._complete()}self._step(frame)},delay);self._complete=fn||self._complete};module.exports=Animato},{raf:3}],3:[function(require,module,exports){var now=require("performance-now"),global=typeof window==="undefined"?{}:window,vendors=["moz","webkit"],suffix="AnimationFrame",raf=global["request"+suffix],caf=global["cancel"+suffix]||global["cancelRequest"+suffix];for(var i=0;i<vendors.length&&!raf;i++){raf=global[vendors[i]+"Request"+suffix];caf=global[vendors[i]+"Cancel"+suffix]||global[vendors[i]+"CancelRequest"+suffix]}if(!raf||!caf){var last=0,id=0,queue=[],frameDuration=1e3/60;raf=function(callback){if(queue.length===0){var _now=now(),next=Math.max(0,frameDuration-(_now-last));last=next+_now;setTimeout(function(){var cp=queue.slice(0);queue.length=0;for(var i=0;i<cp.length;i++){if(!cp[i].cancelled){try{cp[i].callback(last)}catch(e){setTimeout(function(){throw e},0)}}}},Math.round(next))}queue.push({handle:++id,callback:callback,cancelled:false});return id};caf=function(handle){for(var i=0;i<queue.length;i++){if(queue[i].handle===handle){queue[i].cancelled=true}}}}module.exports=function(fn){return raf.call(global,fn)};module.exports.cancel=function(){caf.apply(global,arguments)}},{"performance-now":4}],4:[function(require,module,exports){(function(process){(function(){var getNanoSeconds,hrtime,loadTime;if(typeof performance!=="undefined"&&performance!==null&&performance.now){module.exports=function(){return performance.now()}}else if(typeof process!=="undefined"&&process!==null&&process.hrtime){module.exports=function(){return(getNanoSeconds()-loadTime)/1e6};hrtime=process.hrtime;getNanoSeconds=function(){var hr;hr=hrtime();return hr[0]*1e9+hr[1]};loadTime=getNanoSeconds()}else if(Date.now){module.exports=function(){return Date.now()-loadTime};loadTime=Date.now()}else{module.exports=function(){return(new Date).getTime()-loadTime};loadTime=(new Date).getTime()}}).call(this)}).call(this,require("_process"))},{_process:1}]},{},[2])(2)});