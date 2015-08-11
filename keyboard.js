/**
 * 
 */

function Keyboard(){
	
	var me=this;
	me.rb=require('robotjs');
	
	
};
Keyboard.prototype.longPress=function(key, cb, time){
	var me=this;
	var i=setInterval(function(){
		
		me.rb.toggleKey(key, true);
		
	},250);
	
	setTimeout(function(){
		
		clearTimeout(i);
		me.rb.toggleKey(key, false);
		if((typeof cb)=='function')cb();
	},time);
}

module.exports=Keyboard;