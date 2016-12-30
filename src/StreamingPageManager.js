import DataStreamClient from './StreamPipeClient.js';

class StreamingPageManager {
	
	constructor(){
		this.requestParametersWithCallbacks = [];
		
		this.newPacketCallback  = this.newPacketCallback.bind(this);
		
		this.DataStreamClient = new DataStreamClient(this.newPacketCallback);
	}
	
	newPacketCallback(parameterList){
		for(var i = 0, len1 = this.requestParametersWithCallbacks.length;i<len1; i++){
			var name = this.requestParametersWithCallbacks[i].parameter;
			for (var y = 0, len2 = parameterList.length; y<len2;y++)
			{
				if(parameterList[y].Name === name){
					this.requestParametersWithCallbacks[i].callback(parameterList[y]);
					break;
				}
			}
		}
	}
	
	//Allows a component to suscribe to a parameter from the pod
	RequestParameterWithCallback(parameter, callback)
	{
		this.requestParametersWithCallbacks.push({parameter: parameter,callback: callback});
		this.requestParameterFromServer(parameter);
	}
	
	requestParameterFromServer(parameter){
		this.DataStreamClient.RequestParameter(parameter);
	}
} 

export default StreamingPageManager;
