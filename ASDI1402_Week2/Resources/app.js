// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


var win1 = Titanium.UI.createWindow({  
    title:'Wow Items',
    backgroundColor:'#fff'
});

var scrollView = Ti.UI.createScrollView({
	layout: "vertical"
});


var wowArmoryFile = require('wowArmory');
var head = Ti.UI.createLabel({
		text: null
	});
win1.add(scrollView);

win1.open();
