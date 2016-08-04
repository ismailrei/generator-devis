var querystring = require('querystring');   
   	http = require("http"),
   	fs=require("fs"),
   	m=require("./libs/functions");
var main=function()
{       var options,
            seneca=this,
            cookie;

        seneca.add({role:"model",action:"Initialise"},function(args,done){
            options=args.options;
                    });
        seneca.add({role:"model",action:"PUT"},function(args,done){//for update
            if(args.table) options['link']=options['path']+"/"+args.table;
            m.Post(options,args.Add,done);
            });

        seneca.add({role:"model",action:"GET"},function(args,done){//for query(FOR TEST ONLY)
            var res="",
                toReplace=["[","]"],
                transmission={Response:"",stric:{result:false}};

            if(args.conditions) res=m.Conditions(args.conditions);

            m.GET(m.Link(options,args.table+"/?$asArray=true"+res),toReplace,done,transmission);
            
        });

        seneca.add({role:"model",action:"DELETE"},function(args,done){//for update
           
           m.GET(m.Link(options,args.table+"/?$filter=\"ID="+args.ID+"\"&"+options.delete),"undefined",done,{Response:"Success"});
        });
        
        seneca.add({role:"model",action:"POST"},function(args,done){
            args.table?options['link']=options['path']+"/"+args.table:
                      (options["link"]=args.link);
                      
            m.Post(options,args.Add,done,args.opt);
        });
}
module.exports=main;
var seneca=require("seneca")();
    seneca.use("main"),
    seneca.use("../transport/main")
    seneca.listen({type:"unix_socket",path:'/tmp/redis.sock'});
/*fs.readFile('./confs/interface.json', 'utf8', function (err, data){
	
			   obj = JSON.parse(data);
			   if(obj.client)
			   {
				var seneca=require("seneca")();
				seneca.use('main');
			   	seneca.listen(obj.client);
			   	
			   	}
});*/