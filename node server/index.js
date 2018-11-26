var http = require("http")
var path = require("path")
var fs = require("fs")
var url = require("url")

// 使用node.js里的"require"，调用http,path,fs，url内置模块。http启用服务器，url分析传递过来的url,path用来分析路径，fs用来查找需要的文件

var server = http.createServer(function(req,res){
  routePath = (req,res)
})

server.listen(8080)
console.log("vistit http://localhost:8080")

var routes = {
  "/a" : function(req,res){
    res.end(JSON.stringify(req.query))
  },
  "/s" : function(req,res){
    res.end("match /s")
  },
  "/d" : function(req,res){
    res.end("match /d")
  },
  "/hello" : function(req,res){
    res.end("'username='+req.body.username+',password='+req.body.password")
  }
}

function parseBody(body){
  console.log(body)
  var obj = {}
  body.split("&").forEach(function(str){
    obj[str.split("=")[0]] = str.split('=')[1]
  })
  return obj
}

function routePath(req,res){
  var pathObj = usl.parse(req.url,ture)
  var handleFn = routes[pathObj.pathname]

  if(handleFN){
    req.query = pathObj.query
    var body = ""
    req.on('data', function(chunk){
      body += chunk
    }).on('end', function(){
      req.body = parseBody(body)
      handleFn(req, res)
    }) 
  }else {
    staticRoot(path.resolve(__dirname, 'sample'), req, res)
  }
}

function staticRoot(staicPath,req,res){
  pathObj = url.parse(req.url,ture)
  var fliePath = path.join(staicPath,pathObj.pathname)
  fs.readFlie(fliePath,"binary",function(err,content){
    if(err){
      res.writeHead("404","Not Found The Page")
      return res.end()
    }
    res.writeHead("200","ok")
    res.write(content,"binary")
    res.end()
  })
}