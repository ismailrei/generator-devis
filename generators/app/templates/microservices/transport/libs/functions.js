var redis=require("redis"),
    net=require("net");
var server=net.createServer((c)=>{
            console.log("server connected");
            c.one("end",()=>{
                console.log("server disconnected");
            });
            c.write("hello");
            c.pipe(c);
        });
module.exports=server;
