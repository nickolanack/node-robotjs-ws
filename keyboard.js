/**
 * 
 */

function Keyboard(){
	
	var me=this;
	me.rb=require('robotjs');
	me._modifiers=[];
	me._keys=[];
	
	
};
Keyboard.prototype.tap=function(key){
	var me=this;
	me.press(key);
	me.release(key);
	return me;
}


Keyboard.prototype.press=function(key){
	var me=this;
	if(me.isPressed(key)){
		throw new Error('Key is already pressed: '+key);
	}
	
	me.rb.keyToggle(key, true, me._getModifiers());
	me._setPressed(key);
	return me;
}

Keyboard.prototype.release=function(key){
	var me=this;
	if(!me.isPressed(key)){
		throw new Error('Key is not pressed: '+key);
	}
	
	me._setReleased(key);
	me.rb.keyToggle(key, false, me._getModifiers());

	return me;
	
}

Keyboard.prototype.isPressed=function(key){
	if(key.length>1){
		return me._modifiers.indexOf(key)>=0;
	}else{
		return me._keys.indexOf(key)>=0;
	}
}

Keyboard.prototype._getModifiers=function(){
	var me=this;
	if(me._modifiers.length){
		return me._modifiers;
	}else{
		return null;
	}
}


module.exports=new Keyboard();

