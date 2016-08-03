//Define variables
var app=require("express")(),
    colors=require("colors/safe"),
    data = require('./app/wakanda_config'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    senecaRoute = require('./app/root');

var bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    prefix="/wakandas",
    func=require("./app/route")({seneca:senecaRoute});
	
    //Initialisation of our model
    senecaRoute.act({role:"model",action:"Initialise",options:data.options[0]});
    var Data=['ismailrei','182290a+'];
    var ID=["Test"];
    senecaRoute.act({role:"auth",action:"login",Data:Data,options:data.options[0]},function(err,sessionID)
        {   
            console.log(colors.green(JSON.stringify(sessionID['WASID'])));
                
         });

senecaRoute.use('entity');
app.use(require("body-parser").json());

app.get(prefix+'/:table/:id',func.GET);

app.delete(prefix+'/:table/:id',func.DELETE);    

app.put(prefix+'/:table', urlencodedParser,func.PUT);

app.post(prefix+'/:table', urlencodedParser,func.POST);

app.use(senecaRoute.export('web'));

app.listen({
        type: 'http',
        port: '8888',
        host: '127.0.0.1',
        protocol: 'http'});