/**
 * 
 */
var Keyboard=(function(){
	
	

	var _rb=require('robotjs');
	var _modifiers=[];
	var _keys=[];
	
	

	
	function _hasModifiers(){
		return !!_modifiers.length;
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

		if(_isModifier(key)){
			var i=_modifiers.indexOf(key);	
			_modifiers.splice(i, 1);
		}else{
			i=_keys.indexOf(key);
			_keys.splice(i, 1);
		}
		
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
		if(_hasModifiers()){
			_rb.keyToggle(key, true, _modifiers);
		}else{
			_rb.keyToggle(key, true);
		}
		
		_setPressed(key);
		return me;
	}

	Keyboard.prototype.release=function(key){
		var me=this;
		if(!_isPressed(key)){
			throw new Error('Key is not pressed: '+key);
		}
		
		_setReleased(key);
		if(_hasModifiers()){
			_rb.keyToggle(key, false, _modifiers);
		}else{
			_rb.keyToggle(key, false);
		}

		return me;
		
	}

	

	
	
	
	return Keyboard;
	

})();


module.exports=new Keyboard();

