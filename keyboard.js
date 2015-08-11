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
		
		clearTimeout(i);
		me.rb.keyToggle(key, false);
		if((typeof cb)=='function')cb();
	},time);
}

module.exports=Keyboard;