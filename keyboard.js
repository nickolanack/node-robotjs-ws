/**
 * 
 */
var Keyboard=(function(){
	
	

	var _rb=require('robotjs');
	var _modifiers=[];
	var _keys=[];
	
	
	function _getModifiers(){
		
		if(_modifiers.length){
			return _modifiers.slice(0);
		}else{
			return null;
		}
	}
	
	var _modifiersList=['command', 'alt', 'shift', 'option' ,'control'];
	
	function _isModifier(key){
		return (_modifiersList.indexOf(key)>=0);
	}
	
	function _setPressed(key){
		if(_isModifier(key)){
			_modifiers.push(key);
		}else{
			_keys.push(key)
		}
	}
	
	function _setReleased(key){
		var i=-1;
		if(_isModifier(key)){
			i=_modifiers.indexOf(key);	
		}else{
			i=_keys.indexOf(key);
		}
		_modifiers.splice(i, 1);
	}
	
	function _isPressed(key){
		return (_modifiers.indexOf(key)>=0||_keys.indexOf(key)>=0);
	}
	
	
	
	
	function Keyboard(){

	};

	Keyboard.prototype.tap=function(key){
		var me=this;
		me.press(key);
		me.release(key);
		return me;
	}


	Keyboard.prototype.press=function(key){
		var me=this;
		if(_isPressed(key)){
			throw new Error('Key is already pressed: '+key);
		}
		
		_rb.keyToggle(key, true, _getModifiers());
		_setPressed(key);
		return me;
	}

	Keyboard.prototype.release=function(key){
		var me=this;
		if(!_isPressed(key)){
			throw new Error('Key is not pressed: '+key);
		}
		
		_setReleased(key);
		_rb.keyToggle(key, false, _getModifiers());

		return me;
		
	}

	

	
	
	
	return Keyboard;
	

})();


module.exports=new Keyboard();

