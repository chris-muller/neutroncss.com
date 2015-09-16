'use strict';

var neutron = neutron || {};

neutron.listener = (function () {
	
	var listener = {};
	
	listener.add = function(element, eventName, handler) {

		if (element.addEventListener) {
			element.addEventListener(eventName, handler, false);
		}
		else if (element.attachEvent) {
			element.attachEvent('on' + eventName, handler);
		}
		else {
			element['on' + eventName] = handler;
		}
		
	}
	
	return listener;
	
})();
