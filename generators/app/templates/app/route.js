var senecaRoute;
var colors=require("colors/safe");
function DELETE(req, res){
        senecaRoute.act({role:"model",action:"DELETE",ID:req.params.id,table:req.params.table},function(err,result){   
        error_test(result);
        //res.render('index.ejs');
        });
}

function GET (req, res){
    req.params.id?ID=req.params.id:ID=1000;
    var cond={ID};

    senecaRoute.act({role:"model",action:"GET",conditions:cond,table:req.params.table},function(err,pro){ 
        console.log(pro);
    });
}

function PUT(req,res)
{
    Post_Put("PUT",req,res);    
}

function POST(req,res)
{
    Post_Put("POST",req,res);         
}

function Post_Put(action,req,res)
{
    var Data={__ENTITIES:[req.body]};//without __KEY and __STAMP!!
    senecaRoute.act({role:"model",action:action,Add:req.body,table:req.params.table},function(err,result){    
        error_test(result);
    });
}
function error_test(result)
{
    var color,screen;
    result['Response']=="ERROR"?(console.log(colors.red(result['Response']))):
                                (console.log(colors.green("Success")));
}
module.exports=function test(r){
    senecaRoute=r.seneca;
    return {
    GET:GET,
    POST:POST,
    PUT:PUT,
    DELETE:DELETE
    }
}