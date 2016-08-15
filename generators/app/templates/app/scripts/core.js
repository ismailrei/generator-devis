var fs = require('fs'),
    path = require('path');
var req="";


function getDirectories(microservice,resp,req) {
   req="core=require('seneca')()\n.use('../main')\n.use('../../transport/main')";
   resp=='Y'||resp=='y'?req+="\n.listen({type:'unix_socket',path:'/tmp/"+microservice+".sock'});\n":req+=";\n";
	
fs.readFile('microservices/'+microservice+'/confs/depencies.json', 'utf8', (err, data)=>{
	obj = JSON.parse(data);
	for(var cl in obj){
		req+="\core.client({type: '"+obj[cl].type+"'\,port: '"+obj[cl].path+"'});";	
	}
	 req+="\nmodule.exports=core;";  	
	 fs.writeFile('microservices/'+microservice+'/confs/core.js',req);	  
	});

}
getDirectories('authentification','Y',req);
   		
getDirectories('model','Y',req);


