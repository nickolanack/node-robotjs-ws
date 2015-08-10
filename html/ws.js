/**
 * 
 */

var WebsocketControlQuery=new Class({
		Implements:Events,
		initialize:function(url){

			var me=this;
			me._ws=false;
			
			me._handlers=[];
			me._timers=[];
			
			me._counter=0;

			try{

		
					var ws = new WebSocket(url);
					console.log('started websocket: ws');
					
					ws.onopen=function(){
						me._ws=ws;
						me.fireEvent('onConnect');
					}

					ws.onerror=function(){
						console.log('recieved error! ');			
					}

					ws.onmessage=function(message){
						me._handleMessage(message);
					};
				
			}catch(e){
				console.log('error connecting to websocket');
			}



		},
		execute:function(task, json, callback){
			var me=this;
			var id=me._counter;
			me._counter++;
			
			me._handlers['_'+id]=callback;	
			me._ws.send(JSON.stringify({id:id, task:task, json:json}));
			me._timerStart(id);
		},
		_timerStart:function(id){
			var me=this;
			//not supported by safari.
			if(window.performance){
				me._timers['_'+id]=window.performance.now();
			}
		},
		_timerStop:function(c){
			var me=this;
			var time=-1;
			if(window.performance){
				//not supported by safari.
				time=window.performance.now()-me._timers['_'+c];
				delete me._timers['_'+c];
			}
			return time;
		},
		_handleMessage:function(message){
			var me=this;
			
			var data=message.data;
			var i=data.indexOf(':');
			var id=data.substring(0,i);
			data=data.substring(i+1);
			
			
			if(!me._handlers['_'+id]){
				me.fireEvent(id, data);
				console.log("unhandled message: "+data)
				
			}else{
				var time=me._timerStop(id);
				me._handlers['_'+id](data);
				console.log('ws '+id+':'+time);
				
				delete me._handlers['_'+id];
			}
		}


	});