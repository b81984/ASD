var rectangle = {
	"title" : "Rectangle",
	"height": 5,
	"width" : 4,
	"contents": function(){
		var sendBack = "Name: "+rectangle.title+", Height: "+rectangle.height+", Width: "+rectangle.width;
		return(sendBack);
	},
	"perimeter": function(){
		return("Perimeter: "+ ((this.width*2)+(this.height*2)));
	}
};

var square = {
	"title" : "Square",
	"width" : 7,
	"contents" : function(){
		return("Name: "+this.title+", Width: "+this.width);
	},
	"area": function(){
		return("Area: "+(this.width*this.width));
	}
};

var circle = {
	"title" : "Circle",
	"radius": 4,
	"contents" : function(){
		return("Name: "+this.title+", Radius: "+this.radius);
	},
	"circumference": function(){
		return("Circumference: "+(2*3.14*this.radius));
	}
};

var book = {
	"title" : "Book",
	"author": "S.E. Hinton",
	"name" : "Outsiders",
	"contents" : function(){
		return("Name: "+this.title+", Title: "+this.name+", Author: "+this.author);
	},
	"quote" : function(){
		return("Stay Golden, Ponyboy");
	}
};

var game = {
	"title": "Game",
	"name" : "Elder Scrolls Online",
	"release": "April 4th",
	"contents" : function(){
		return("Name: "+this.title+", Title: "+this.name+", Release: "+this.release);
	},
	"wait": function(){
		var daysLeft = (28-6)+4;
		return("Only " + daysLeft+" left to wait!");
	}
};
label0.text = rectangle.contents();
label1.text = rectangle.perimeter();
label2.text = square.contents();
label3.text = square.area();
label4.text = circle.contents();
label5.text = circle.circumference();
label6.text = book.contents();
label7.text = book.quote();
label8.text = game.contents();
label9.text = game.wait();