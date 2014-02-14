var json,tempLabel0,tempLabel1;

var remoteResponse = function(){
//	Ti.API.debug(this.responseText);
	alert(this.responseText);
	//alert("1");
	json = JSON.parse(this.responseText);
	var nCount = 0;
	for(n in json.items)
	{
		var view = Ti.UI.createView({
			backgroundColor: "#606060",
			layout: 'vertical',
			top: 5,
			left: 5,
			right: 5,
			bottom: 5,
			height: 75
		});
	
		var label0 = Ti.UI.createLabel({
			text: "Item name: "+json.items[n].name
		});
		var label1 = Ti.UI.createLabel({
			text: "Item Level: "+ json.items[n].itemLevel
		});
		view.add(label0);
		view.add(label1);
		nCount++;
		if(nCount > 2)
		{
			scrollView.add(view);
		}
		
	};
	
	//head.text = json.items.head.name;
};

var remoteError = function(e){
	
	
};

var xhr = Ti.Network.createHTTPClient({
	onload: remoteResponse,
	onError: remoteError,
	timeout: 5000
});

xhr.open('GET', "http://us.battle.net/api/wow/character/Arthas/Dethcrash?fields=items");
xhr.send();


