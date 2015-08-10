/**
 * 
 */

var config=require('./server.json');
if(config.serverPort!==false){

	(function(){

		var Server=require('tinywebjs');
		new Server({
			port:config.serverPort,
			documentRoot:__dirname+'/html/'
		});

	})();
}


var robot = require("robotjs");

if(config.websocketPort!==false){

	(function(){

		var WebSocketServer=require('tinywebsocketjs');
		var wsserver=new WebSocketServer({
			port:config.websocketPort
		});
		
		
		wsserver.addTask('press_key', function(options, callback){
			var key=options.args.key;
			console.log('recieved key: '+key);
			robot.keyTap(key);
		}).addTask('press_keys', function(options, callback){
			var keys=options.args.keys;
			console.log('recieved keys: '+keys);
			robot.typeString(keys);
		});

	})();
	

}


