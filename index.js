/**
 * @module  audio-delay
 */

var inherits = require('inherits');
var PassThrough = require('stream').PassThrough;


function Sink (fn) {
	if (!(this instanceof Sink)) return new Sink(fn);

	if (fn instanceof Function) this.log = fn;

	PassThrough.call(this);
}


inherits(Sink, PassThrough);


Sink.prototype.log = function () {
	//supposed that is redefined
}


Sink.prototype._transform = function (chunk, enc, cb) {
	this.log(chunk);
	cb(null, chunk);
}


Sink.prototype._write = function (chunk, enc, cb) {
	var self = this;
	if (!self._readableState.pipesCount) {
		this.log(chunk);
		cb();
	} else {
		PassThrough.prototype._write.call(this, chunk, enc, cb);
	}
};


module.exports = Sink;