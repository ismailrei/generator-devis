var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
   this.req="seneca=require('seneca')();";
	
   fs.readdirSync(srcpath).filter(function(file){
	   if(fs.statSync(path.join(srcpath, file)).isDirectory())
		   req+="\nseneca.use('../microservices/"+file+"/main');";
});

fs.readFile('app/client.json', 'utf8', (err, data)=>{
	obj = JSON.parse(data);
	for(var cl in obj){
		this.req+="\nseneca.client({type: '"+obj[cl].type+"'\,port: '"+obj[cl].port+"'\,host: '"+obj[cl].host+"'\,protocol: '"+obj[cl].protocol+"'});";	
	}
	 this.req+="\nmodule.exports=seneca;";  	
	 fs.writeFile("app/root.js",req, function(err) {
	   	if(err) {
	   		return console.log(err);
    			}
		console.log("The file was saved!"); 
  			});	  
	});
}
	   		
getDirectories('microservices');