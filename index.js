const express = require("express");

const app = express();

app.use(logger);

app.get("/books",(req,res)=>{
    return res.send({route:"/books"});
});

app.get("/libraries ",(req,res)=>{
    return res.send({ route: "/libraries", permission: true});
});

app.get("/authors",checkpermission("author"),(req,res)=>{
    return res.send({ route: "/authors", permission: true});
});


function checkpermission(permission){
    return function logger(req,res,next){
        if(permission === "librarian"){
            return next();
        }
        else if(permission === "author"){
            return next();
        }
        else{
            return res.send("not allowed");
        }
    }
}
function logger(req,res,next){
    if(req.path === "/books"){
        req.permission = "true";
    }
    else if(req.path === "/libraries"){
        req.permission = "libraries";
    }
    else{
        req.permission = "authors";
    }
    next();
}

app.listen(6001,() =>{
    console.log("listening on port 6000");
})