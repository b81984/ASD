var mainWindow = Ti.UI.createWindow({
	modal: true,
	title: "Objects"
});

var navWindow = Ti.UI.createWindow({
	title: "Objects",
	modal: true,
	backgroundColor: "#FFF"
});

var navGroup = Ti.UI.iOS.createNavigationWindow({
	window: navWindow
});
var scrollView = Ti.UI.createScrollView({
	layout: "vertical"
});
var object0 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object1 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object2 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object3 = Ti.UI.createView({
	height: 70,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object4 = Ti.UI.createView({
	height: 70,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object5 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object6 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object7 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object8 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});
var object9 = Ti.UI.createView({
	height: 50,
	top: 5,
	left: 5,
	right: 5,
	backgroundColor: "#606060",
	layout: "vertical"
});

var label0 = Ti.UI.createLabel({
	
});
var label1 = Ti.UI.createLabel({
	
});
var label2 = Ti.UI.createLabel({
	
});
var label3 = Ti.UI.createLabel({
	
});
var label4 = Ti.UI.createLabel({
	
});
var label5 = Ti.UI.createLabel({
	
});
var label6 = Ti.UI.createLabel({
	
});
var label7 = Ti.UI.createLabel({
	
});
var label8 = Ti.UI.createLabel({
	
});
var label9 = Ti.UI.createLabel({
	
});
var label10 = Ti.UI.createLabel({
	
});
var label11 = Ti.UI.createLabel({
	
});
object0.add(label0);
object0.add(label1);
object1.add(label2);
object1.add(label3);
object2.add(label4);
object2.add(label5);
object3.add(label6);
object3.add(label7);
object4.add(label8);
object4.add(label9);
scrollView.add(object0);
scrollView.add(object1);
scrollView.add(object2);
scrollView.add(object3);
scrollView.add(object4);
var objectDemoFile = require('objectDemo');

navWindow.add(scrollView);
mainWindow.add(navGroup);
navGroup.open();