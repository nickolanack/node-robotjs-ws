/**
 * 
 */

function Keyboard(){
	
	var me=this;
	me.rb=require('robotjs');
	
	
};
Keyboard.prototype.longKeyPress=function(key, cb, time){
	var me=this;
	var i=setInterval(function(){
		
		me.rb.keyToggle(key, true);
		
	},250);
	
	setTimeout(function(){
		
		clearInterval(i);
		me.rb.keyToggle(key, false);
		if((typeof cb)=='function')cb();
	},time);
	
	return me;
}


Keyboard.prototype.keyTapArray=function(keys, cb, delay){
	var me=this;
	var i=setInterval(function(){
		
		me.rb.keyTap(keys.shift());
		if(keys.length==0){
			clearInterval(i);
			if((typeof cb)=='function')cb();
		}
		
	},delay);
	
	return me;
}



//made this to test long key press with only two keyToggles
Keyboard.prototype.longKeyPressSimple=function(key, cb, time){
	var me=this;

	me.rb.keyToggle(key, true);

	setTimeout(function(){

		me.rb.keyToggle(key, false);
		if((typeof cb)=='function')cb();
	},time);
}



module.exports=Keyboard;