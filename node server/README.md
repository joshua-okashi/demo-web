var http = require("http")
var path = require("path")
var fs = require("fs")
var url = require("url")

// 使用node.js里的"require"，调用http,path,fs，url内置模块。http启用服务器，url分析传递过来的url,path用来分析路径，fs用来查找需要的文件

var sever = http.createServer(function(req,res){
  routePath = (req,res)
})

server.listen(8080)
console.log("vistit http://localhost:8080")

// 创建一个服务器server,用来处理用户请求和设置响应，监听窗口为8080

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

// 如果url请求里面带有 "/a","/s"等，便执行相关操作。

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

// 处理post请求

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

// staicRoot函数传入文件路径，请求，和响应3个值
// pathObj 获得请求的url
// fliePath 获得请求url文件的具体路径
/* fs.readFlie fs模块的readFlie读取文件异步方法，处理2个值，第一个是文件不存在时返回自定义状态；
   第二个是文件存在返回文件*/