var db = Titanium.Database.open('items'); // list of items
db.execute('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, itemName TEXT, itemLevel TEXT, toon TEXT)');
var chars = Titanium.Database.open('roster'); // list of characters
chars.execute('CREATE TABLE IF NOT EXISTS roster (id INTEGER PRIMARY KEY, name TEXT, realm TEXT)');
var table = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED	
});
var currentToon = null;
var editing = false;
var currentID = 0;
var remoteResponse = function(){
	json = JSON.parse(this.responseText);
	var nCount = 0;
	for(n in json.items)
	{
		var name = json.items[n].name;
		var level = json.items[n].itemLevel;
		nCount++;
		if(nCount > 2) //had to add this due to the data structure from the WoW API; the first two items in json.items are, counterintuitively, not items.
		{
			db.execute('INSERT INTO  (itemName, itemLevel, toon) VALUES(?, ?, ?)', name, level, currentToon);
		}
		
	};
};
var remoteError = function(e){
	Ti.API.debug(this.status);
	Ti.API.debug(this.responseText);
	Ti.API.debug(e.error);
	alert("Character does not exist.");
};
var xhr = Ti.Network.createHTTPClient({
	onload: remoteResponse,
	onError: remoteError,
	timeout: 5000
});
var saveCharacter = function(){
	if(editing === true)
	{
		chars.execute('UPDATE roster SET name=?, realm=? WHERE id=?',characterNameInput.value, realmInput.value, currentToon);
	}
	else
	{
		chars.execute('INSERT INTO roster (name, realm) VALUES(?, ?)', characterNameInput.value, realmInput.value);
	};
	navGroup.closeWindow(editCharacter);
	drawList();
};
var characterEquipment = Ti.UI.createWindow({
	backgroundColor : "#606060",
	layout: "vertical"
});

//fill in equipment page code here


var editCharacter = Ti.UI.createWindow({
	backgroundColor : "#606060",
	layout: "vertical"
});
var characterNameInput = Ti.UI.createTextField({
	left: 15,
	right: 15,
	top: 10,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	backgroundColor: "#FFF",
	hintText: "Character Name"
	
});
var realmInput = Ti.UI.createTextField({
	left: 15,
	right: 15,
	top: 10,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	backgroundColor: "#FFF",
	hintText: "Realm"	
});
var goButton = Ti.UI.createView({
	top: 15,
	bottom: 15,
	left: 15,
	right: 15,
	height: 50,
	backgroundColor: "#FFF"
});
var goLabel = Ti.UI.createLabel({
	text: "Done"
});
goButton.add(goLabel);
editCharacter.add(characterNameInput);
editCharacter.add(realmInput);
editCharacter.add(goButton);
goButton.addEventListener('click', saveCharacter);

var viewItems = function(event){
	var realm = this.realm;
	var charName = this.title;
	xhr.open('GET', "http://us.battle.net/api/wow/character/"+ realm+ "/"+ charName + "/?fields=items");
	xhr.send();
};
var newCharacter = function(){
	var characters = chars.execute('SELECT * FROM roster');
	characterNameInput.value = null;
	realmInput.value = null;
	editing = false;
	navGroup.openWindow(editCharacter);
	currentToon = characters.rowCount;
};
var editToon = function(event){
	characterNameInput.value = this.title;
	realmInput.value = this.realm;
	currentToon = this.toon;
	navGroup.openWindow(editCharacter);
};

var drawList = function(){
	var chunk = Ti.UI.createTableViewSection({
	headerTitle: "Characters"
	});
	var chunk2 = Ti.UI.createTableViewSection({
		headerTitle: "Add New Character"
	});
	var row = Ti.UI.createTableViewRow({
		title: "Add New",
		font: {fontSize: 16, fontFamily: 'Arial'},
		hasChild: true
	});
	row.addEventListener('click', newCharacter);
	chunk2.add(row);
	var characters = chars.execute('SELECT * FROM roster');
	while(characters.isValidRow())
		{
			var theRow = Ti.UI.createTableViewRow({
				title: characters.field(1),
				realm: characters.field(2),
				font: {fontSize: 16, fontFamily: 'Arial'},
				toon: characters.fieldByName('id'),
				hasChild: true
			});
			chunk.add(theRow);
			theRow.addEventListener('click', editToon);
			characters.next();
		};
		var section = [chunk, chunk2];
		table.setData(section);
};

scrollView.add(table);
drawList();
