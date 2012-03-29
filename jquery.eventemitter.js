(function($) {// secure $ jQuery alias
/*******************************************************************************************/
// Copyright (c) 2011, Larry (http://larionov.biz)
// Liscensed under the BSD License (BSD-LICENSE.txt)
// Created: 2011-03-01
// Modified: 2011-06-17
/*******************************************************************************************/

$.EventEmitter = function() {};
/**
 * @param {Object} object
 * @param {String} event
 * @param {Function} fn
 * @return {$.EventEmitter}
 */
$.EventEmitter.prototype.bind = function(event, fn) {
	if (!this.EventEmitters) {
		this.EventEmitters = {};
	}
	var self = this;
	if (typeof event == 'string' && fn instanceof Function) {
		$.each(event.split(' '), function (i, eventName) {
			if (self.EventEmitters[eventName] == undefined || !$.isArray(self.EventEmitters[eventName])) {
				self.EventEmitters[eventName] = [];
			}
			self.EventEmitters[eventName].push(fn);
		});
	}
	return this;
};
/**
 * @param {String} event
 * @param {Function} fn Optional
 * @return {$.EventEmitter}
 */
$.EventEmitter.prototype.unbind = function(event, fn) {
	if (!this.EventEmitters) {
		this.EventEmitters = {};
	}
	var self = this;
	if (typeof event == 'string') {
		$.each(event.split(' '), function (index, eventName) {
			if (fn instanceof Function && $.isArray(self.EventEmitters[eventName])) {
				for (var i = 0, count = self.EventEmitters[eventName].length; i < count; i++) {

				}
			} else {
				self.EventEmitters[eventName] = [];
			}
		});
	}
	return this;
};
/**
 * @param {String} event
 * @param {Boolean} checkReturn Optional
 * @return {Boolean}
 */
$.EventEmitter.prototype.trigger = function(event, checkReturn, args) {
	if (!this.EventEmitters) {
		this.EventEmitters = {};
	}
	var self = this, ret, events;
	checkReturn = checkReturn || false;
	args = $.isArray(args)? args: ($.isArray(checkReturn)? checkReturn: []);
	if (typeof event == 'string') {
		events = event.split(' ');
		for (var index = events.length - 1; index >= 0; index--) {
			if ($.isArray(self.EventEmitters[events[index]])) {
				for (var i = self.EventEmitters[events[index]].length - 1; i >= 0; i--) {
					if (self.EventEmitters[events[index]][i] instanceof Function) {
						ret = self.EventEmitters[events[index]][i].apply(self, args);
						if (checkReturn && (ret === false)) {
							return false;
						}
					}
				}
			}
		}
	}
	return true;
};
$.EventEmitter.applyTo = function(dst) {
	var Tmp = function() {};
	Tmp.prototype = $.EventEmitter.prototype;
	dst.prototype = new Tmp();
	dst.prototype.constructor = $.EventEmitter;
	return dst;
};
})(jQuery);
