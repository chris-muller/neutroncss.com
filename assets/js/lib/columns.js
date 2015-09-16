'use strict';

var neutron = neutron || {};

neutron.columns = (function () {
	
	var column = {};
	column.number = 0;
	column.label = '';
	column.elements = {
		row: {},
		columns: {},
		input: {}
	};
	

	
	column.init = function(columnLabel, columnNumber) {
		column.number = columnNumber;
		column.label = columnLabel;
		column.columns = getColumnElements();
		
		setInputListener();
		
	}
	
	var changeColumnCount = function() {
		var currentCols = column.elements.columns.length;
	}
	
	var getColumnElements = function() {
		return document.querySelectorAll("[data-columns=" + column.label + ".col]");
	}
	
	var getColumnContainer = function() {
		return document.querySelector("[data-columns=" + column.label + ".row]");
	}
	
	var setInputListener = function() {
		var element = column.elements.input;
		neutron.listener.add(element, 'keyup', changeColumnCount);
	}
	
	return column;
	
})();
