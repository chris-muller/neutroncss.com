var neutron = neutron || {};

neutron.column = (function () {
	'use strict';
	
	var column = {};
	column.elements = document.querySelectorAll("#flexibility span");
	column.container = document.querySelector("#flexibility");
	column.input = document.querySelector("#column-input");
	column.number = column.elements.length || 0;
	
	column.init = function() {
		
		setInputListener();
		
	}
	
	var changeColumnCount = function() {
		var currentColCount = column.elements.length;
		var newColCount = column.input.value || 0;
		console.log('newColCount', newColCount);
		
		removeAllColumns();

		addColumns(newColCount);
		
		column.number = newColCount;
		

	}
	
	var setInputListener = function() {
		console.log('Setting listener...');
		
		column.input.addEventListener('keyup', changeColumnCount, false);

	}
	
	var addColumns = function(columnsToAdd) {


		
		var span = "<span></span>";
		var spanRepeat = "";
		
		for(var i = 0; i < columnsToAdd; i++){
			spanRepeat += span;
		}

		
		//var spanRepeat = new Array( columnsToAdd ).join( span );
		// var spanRepeat = (new Array(columnsToAdd + 1)).join(span);
		
		console.log('spanRepeat', spanRepeat);		
		
		column.container.innerHTML = spanRepeat;		
		
	}

	var removeAllColumns = function() {
		column.container.innerHTML = '';		
	}
	
	return column;
	
})();

var neutron = neutron || {};

neutron.tab = (function () {
	'use strict';

	// locally scoped Object
	var tab = {};
	tab.id = '';
	
	// return object of tab data
	var getDataStructure = function (elements) {
		var i;
		var data = {};
		
		data.tabs = [];
		data.pages = [];
		data.active = null;
			
		for (i = 0; i < elements.length; ++i) {
			var element = elements[i];


			var attribute = element.getAttribute("data-tabs");
			
			var attributeSplit = attribute.split('.');
			var attributeType = attributeSplit[1];
			var attributeValue = attributeSplit[2];
			
			switch (attributeType) {
				case "tab":
					data.tabs.push(attributeValue);
					break;
				case "page":
					data.pages.push(attributeValue);
					break;
			}
			
			if(typeof attributeSplit[3] !== 'undefined') {
				data.active = attributeSplit[2];
			}

		}
		
		return data;
		
	};
	
	var hideAllExceptActive = function(active) {
		console.log('Hide all except: ',active);
		var elements = getElements();
		
		var i;
		for (i = 0; i < elements.length; ++i) {
			var element = elements[i];

			var attribute = element.getAttribute("data-tabs");
			
			var attributeType = attribute.split('.')[1];
			var attributeValue = attribute.split('.')[2];
			
			if(attributeType == 'page') {
				if(attributeValue != active) {
					element.style.display = "none";
				} else {
					element.style.display = null
				}
			}
		}
	}
	
	var setOnClickEvents = function(elements) {

		for (var i = 0; i < elements.length; ++i) {
			var element = elements[i];

			var attribute = element.getAttribute("data-tabs");
			var attributeType = attribute.split('.')[1];

			if(attributeType === 'tab') {
				element.addEventListener('click', changeActiveTab, false);
			}
		}	
	}
	
	var removeActiveOnTab = function() {
		//var allElements = getElements();
		
		// Filter elements to only one that are active
		var attributeSelector = "[data-tabs$='.active'][data-tabs^='" + tab.id + "']";
		var element = document.querySelector(attributeSelector);
		
		var attr = element.getAttribute("data-tabs");
		attr = attr.substring(0, attr.length - 7);
		
		element.setAttribute("data-tabs", attr);
		
	}
	
	var changeActiveTab = function() {
		var attr = this.getAttribute("data-tabs").split('.');

		
		// remove any 'active' setting if set
		attr.splice(3, 1);
		
		// get label of active tab
		var activeTab = attr[2];
		
		// create new value for attribute
		var activeAttribute =  attr.join('.') + '.active';
		
		// Deactivate active tab
		removeActiveOnTab();
		
		// set clicked tab to be active
		this.setAttribute("data-tabs", activeAttribute);
		
		// After new active tab is set, re-hide elements
		hideAllExceptActive(activeTab);
		
	}

	var getElements = function() {
				
		var attributeSelector = "[data-tabs^=" + tab.id + "]";
	
		// Get matching tab elements
		return document.querySelectorAll(attributeSelector);

	}
	
	tab.init = function (tabId, options) {
		tab.id = tabId;

		// Get matching tab elements
		var elements = getElements();

		// Data structure of tabs
		var structure = getDataStructure(elements);

		// Hide all pages except for designated active page
		hideAllExceptActive(structure.active);
		
		// Set on click events
		setOnClickEvents(elements);
	
	};
	
	return tab;

})();