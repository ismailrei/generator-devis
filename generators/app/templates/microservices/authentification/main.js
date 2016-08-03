var querystring = require('querystring');   
   	http = require("http"),
   	fs=require("fs"),
   	m=require("./libs/functions");
var main=function()
{
    var seneca=this;
    var options,buffer;
    seneca.add({role:"auth",action:"login"},function(args,done)
    {
        options=args.options;
        seneca.act({role:"model",action:"POST",link:m.Link(options,options.loginLink),opt:"login",Add:args.Data},function(err,pro){
           done(null,pro);
        });
    })
    seneca.add({role:"auth",action:"currentUser"},function(args,done)
    {
       var transmission={Response:""};
       m.GET(m.Link(options,options.currentUser),"undefined",done,transmission);
    })
    seneca.add({role:"auth",action:"currentUserBelongsTo"},function(args,done)
    {
       seneca.act({role:"model",action:"POST",link:m.Link(options,options.belongsTo),opt:"group",Add:args.ID},function(err,pro){
           done(null,pro);
        });
    })
    seneca.add({role:"auth",action:"logout"},function(args,done)
    {
        var transmission={Response:""};
        m.GET(m.Link(options,options.logout),"undefined",done,transmission);
    })
}



module.exports=main;
/*fs.readFile('./confs/interface.json', 'utf8', function (err, data){
	
			   obj = JSON.parse(data);
			   if(obj.client)
			   {
				var seneca=require("seneca")();
				seneca.use('main');
				
			   	seneca.listen(obj.client);
			   	
			   	}
});*/