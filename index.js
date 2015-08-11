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
		}).addTask('write_string', function(options){
			var string=options.args.string;
			console.log('recieved string: '+string);
			robot.typeString(string);
		});

	})();
	

}


