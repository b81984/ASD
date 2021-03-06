
var db = Titanium.Database.open('items'); // list of items
//db.execute('DROP TABLE IF EXISTS items');
db.execute('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, itemName TEXT, itemLevel TEXT, toon TEXT)');
var chars = Titanium.Database.open('roster'); // list of characters
chars.execute('CREATE TABLE IF NOT EXISTS roster (id INTEGER PRIMARY KEY, name TEXT, realm TEXT)');
var table = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED	
});
var currentToon = 0;
var editing = false;
var currentID = 0;
var remoteResponse = function(){
	json = JSON.parse(this.responseText);
	var nCount = 0;
	var n = 0;
	for(n in json.items)
	{
		
		var name = json.items[n].name;
		var level = json.items[n].itemLevel;
		nCount++;
		if(nCount > 2) //had to add this due to the data structure from the WoW API; the first two items in json.items are, counterintuitively, not items.
		{
			db.execute('INSERT INTO items (itemName, itemLevel, toon) VALUES(?, ?, ?)', name, level, currentToon);
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
		xhr.open('GET', "http://us.battle.net/api/wow/character/"+ realmInput.value+ "/"+ characterNameInput.value + "?fields=items");
		xhr.send();
	};
	currentToon = characterNameInput.value;
	navGroup.closeWindow(editCharacter);
	drawList();
};
var deleteCharacter = function(){
	chars.execute('DELETE FROM roster WHERE id=?', currentID);
	var itemList = db.execute("SELECT * FROM items");
	var x = 0;
	while(itemList.isValidRow())
	{
		if(itemList.fieldByName('toon') === currentToon)
		{
			db.execute("DELETE FROM items WHERE id=?", x);
		};
		x++;
		itemList.next();
	};
	navGroup.closeWindow(characterView);
	drawList();
};
var characterView = Ti.UI.createWindow({
	backgroundColor : "#606060",
	layout: "vertical"
});
var nameLabel = Ti.UI.createLabel({
	text: null
});
var realmLabel = Ti.UI.createLabel({
	text: null
});
var deleteButton = Ti.UI.createView({
	left: 15,
	right: 15,
	top: 10,
	height: 50,
	backgroundColor: "#FFF"
});
var deleteLabel = Ti.UI.createLabel({
	text: "Delete"
});
var editButton = Ti.UI.createView({
	left: 15,
	right: 15,
	top: 10,
	height: 50,
	backgroundColor: "#FFF"
});
/*var editLabel = Ti.UI.createLabel({
	text: "Edit"
});*/
var itemsButton = Ti.UI.createView({
	left: 15,
	right: 15,
	top: 10,
	height: 50,
	backgroundColor: "#FFF"
});
var itemsLabel = Ti.UI.createLabel({
	text: "Items"
});
itemsButton.add(itemsLabel);
//editButton.add(editLabel);
var itemsTable = Ti.UI.createTableView({
	layout: "Vertical"
});
deleteButton.add(deleteLabel);
characterView.add(nameLabel);
characterView.add(realmLabel);
characterView.add(itemsButton);
//characterView.add(editButton);
characterView.add(deleteButton);

deleteButton.addEventListener('click', deleteCharacter);
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
var itemViewer = Ti.UI.createWindow({
	backgroundColor: "#606060",
	layout: "vertical"
});
goButton.add(goLabel);
editCharacter.add(characterNameInput);
editCharacter.add(realmInput);
editCharacter.add(goButton);
goButton.addEventListener('click', saveCharacter);

itemViewer.add(itemsTable);
var viewItems = function(event){
	var itemsList = db.execute("SELECT * FROM items");
	var tableChunk = Ti.UI.createTableViewSection({
	headerTitle: "Items"
	});
	while(itemsList.isValidRow()){
		if(itemsList.fieldByName('toon') === currentToon)
		{
			var theRow = Ti.UI.createTableViewRow({
				title: itemsList.fieldByName('itemName')+", iLVL: "+ itemsList.fieldByName('itemLevel'),
				font: {fontSize: 16, fontFamily: 'Arial'},
				hasChild: false
			});
			tableChunk.add(theRow);
		};
		itemsList.next();
	};
	var sections = [tableChunk];
	itemsTable.setData(sections);
	navGroup.openWindow(itemViewer);
};
itemsButton.addEventListener('click', viewItems);
var viewCharacter = function(event){
	nameLabel.text = this.title;
	realmLabel.text = this.realm;
	currentToon = this.title;
	currentID = this.toon;
	navGroup.openWindow(characterView);
};
var newCharacter = function(){
	var characters = chars.execute('SELECT * FROM roster');
	characterNameInput.value = null;
	realmInput.value = null;
	editing = false;
	navGroup.openWindow(editCharacter);
	currentID = characters.rowCount;
};
var editToon = function(event){
	characterNameInput.value = this.title;
	realmInput.value = this.realm;
	currentToon = this.title;
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
			theRow.addEventListener('click', viewCharacter);
			characters.next();
		};
		var section = [chunk, chunk2];
		table.setData(section);
};

scrollView.add(table);
drawList();
