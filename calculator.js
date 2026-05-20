let sumonpage=[];
let sumhistory=[]
const { NONAME } = require('dns');
const http = require('http');
const server = http.createServer((req , res)=>{
  const url=req.url.toLowerCase()
  if(url==="/"){
    res.setHeader("Content-Type", "text/html")
    res.write(`<h1> WELCOME TO HOMEPAGE </h1>`)
    res.write(`<a href="/calculator"> Calculator</a>`)
  }else if(url==="/calculator"){
    res.setHeader("Content-Type","text/html")
    res.write(`
      <form action="/submit" method="POST"> <input name="inp1" /> <input name="inp2" /> <button>SUM</button> 
       </form>
      <a href="/showsum">Show sum </a> 
    
      `)
      res.end()
}else if(url==="/submit" && req.method==="POST"){
  const sum=[]

  req.on("data",chunk=>{
    sum.push(chunk)

  })
  req.on("end",()=>{
    let final=0
    const body=Buffer.concat(sum).toString()
    const parsed= new URLSearchParams(body)
    for(let[name,val]of parsed){
      final=Number(val)
      sumonpage.push(final)

    }
    res.statusCode=302
    res.setHeader("Location","/calculator")
    res.end()

  })
}else if(url==="/showsum"){
  let numsum=0
  res.setHeader( "Content-Type","text/html") 
  for(let i=0 ; i< sumonpage.length ; i++){
    numsum+=sumonpage[i]
  }
  sumhistory.push(numsum)
  res.write(`<h3>${numsum}</h3>`)
  console.log("SUM :",numsum)
  sumonpage=[]
  res.write(`<a href="/"> Back to homepage</a>`)
  res.write(`<br>`)
  res.write(`<a href=/history> sum history </a>`)
  res.end()
  

}else if(url==="/history"){
  res.setHeader("Content-Type","text/html")
  for(let i=0; i<sumhistory.length; i++){
    res.write(`<li> SUM IS ${sumhistory}</li>`)

  }

  res.end()



}else{ 
  res.end("404 error")
}

})
const port=4006
server.listen(port ,()=>{
  console.log(`server runnning on http://localhost:${port}`)
})



function sayHi() {
  alert("Hello from JavaScript!");
}