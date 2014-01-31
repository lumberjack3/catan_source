var catan = catan || {};
catan.definitions = catan.definitions || {};
/*
Provides the input and output elements for somm display
**/
catan.definitions.DisplayElement.ChooserElement = ( function(){

	var NULL_VALUE = "none";
	function ChooserElement(value, options){
		this.setValue(value);
		this.setChooseButtons([]);
		this.setDisplayElems([]);
		this.setOptions(options);
		this.setView(this.buildView());
	}
	core.defineProperty(ChooserElement.prototype, "Value");//what you're choosing for. like wood.
	core.defineProperty(ChooserElement.prototype, "ChooseButtons");
	core.defineProperty(ChooserElement.prototype, "DisplayElems");
	core.defineProperty(ChooserElement.prototype, "Options");
	core.defineProperty(ChooserElement.prototype, "View");
    
    ChooserElement.prototype.getSelected = function(){
		for(index in this.getChooseButtons()){
			if(this.getChooseButtons()[index].checked)
				return this.getDisplayElems()[index].textContent;
		}
	}            
	
	ChooserElement.prototype.hide = function(){
		for(index in this.getDisplayElems()){
			this.getDisplayElems()[index].setAttribute("style","visibility:hidden");
		}
	}
	ChooserElement.prototype.show = function(){
		for(index in this.getDisplayElems()){
			this.getDisplayElems()[index].setAttribute("style","visibility:visible");
		}
	}
	ChooserElement.prototype.choose = function(button, action){
		if(button.checked && action != undefined)
			action();
	}
	ChooserElement.prototype.reset = function(){
		var buttons = this.getChooseButtons();
		for(index in buttons){
			if(this.getDisplayElems()[index].textContent == NULL_VALUE)
				buttons[index].click()
		}
		console.log(buttons);
	}
                
	ChooserElement.prototype.buildView= function(){
		
		var optionArray = this.getOptions();
		//for each in array, make a button with the given name and value, and set onchange to be an anon fxn: this.choose(button)
		var mainDiv = document.createElement("div");
			mainDiv.setAttribute("class","mx-container");
					
		for(index in optionArray){
			var label = optionArray[index].label;
			var select = optionArray[index].selected;
			var color = optionArray[index].color;
			var action = optionArray[index].action;
						
			var buttonDiv = document.createElement("div");
				buttonDiv.setAttribute("class","mutex-small");
				if(color!=undefined)
					buttonDiv.setAttribute("class","mutex-large");
						
			var radioButton = document.createElement("input");
				radioButton.setAttribute("type","radio");
				radioButton.setAttribute("name","mx-"+this.getValue());
				radioButton.setAttribute("id","button-"+this.getValue()+index);
				radioButton.setAttribute("value", index);
				radioButton.checked = select;
				radioButton.onchange = core.makeAnonymousAction(this, this.choose, [radioButton, action]);
				buttonDiv.appendChild(radioButton);
				this.getChooseButtons().push(radioButton);
						
			var buttonLabel = document.createElement("label");
				if(color!=undefined)
					buttonLabel.setAttribute("class",color);
				buttonLabel.setAttribute("for","button-"+this.getValue()+index);
				buttonLabel.unselectable = true;
				buttonLabel.textContent = label;
				buttonDiv.appendChild(buttonLabel);
				this.getDisplayElems().push(buttonLabel);
				mainDiv.appendChild(buttonDiv);
		}	
		return mainDiv;
	}
                
	return ChooserElement;
}());

