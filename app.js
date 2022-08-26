const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
})

app.post("/",function(req,res){
    console.log(req.body.cityName)
    const city=req.body.cityName
    const apiKey="568001f1f9955af4bf5f42737bb45b1e"

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey
    https.get(url,function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const wdata = JSON.parse(data)
            const hum=wdata.main.humidity
            const lalo=wdata.coord.lat
            const fig=wdata.weather[0].icon
            const imageurl="http://openweathermap.org/img/wn/"+fig+"@2x.png"
            res.write("<h1>The humidity is "+hum+" in "+city+"</h1>")
            res.write("The latitude is "+lalo+"</h1>")
            res.write("<img src= "+imageurl+" >")
            res.send()
        })
    })
})




app.listen("3000",function(req,res){
    console.log("Server is listening on port 3000")
})