//Nathan Lohse
// ASDI 1402
//2/13/2014
Titanium.UI.setBackgroundColor('#000');


var win1 = Titanium.UI.createWindow({  
    title:'Wow Items',
    backgroundColor:'#fff',
    modal: true
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
