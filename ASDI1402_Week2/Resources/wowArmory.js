var json,tempLabel0,tempLabel1;

var remoteResponse = function(){
//	Ti.API.debug(this.responseText);
	//alert(this.responseText);
	//alert("1");
	json = JSON.parse(this.responseText);
	var nCount = 0;
	for(n in json.items)
	{
		var view = Ti.UI.createView({
			backgroundColor: "#606060",
			layout: 'vertical',
			top: 15,
			left: 5,
			right: 5,
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
		if(nCount > 2) //had to add this due to the data structure from the WoW API; the first two items in json.items are, counterintuitively, not items.
		{
			scrollView.add(view);
		}
		
	};
};

var remoteError = function(e){
	Ti.API.debug(this.status);
	Ti.API.debug(this.responseText);
	Ti.API.debug(e.error);
	
};

var xhr = Ti.Network.createHTTPClient({
	onload: remoteResponse,
	onError: remoteError,
	timeout: 5000
});

xhr.open('GET', "http://us.battle.net/api/wow/character/Arthas/Dethcrash?fields=items");
xhr.send();


