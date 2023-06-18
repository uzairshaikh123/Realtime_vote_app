const express = require("express")
const http = require("http")
const app = express()
app.use(express.json())
const { Server } = require("socket.io")
const { connection } = require("./db")
const { voteModel } = require("./Models/voteModel")
const server = http.createServer(app)
const io = new Server(server)


app.get("/", (req, res) => {
    res.send("hello")
})
// app.post("/vote", async (req, res) => {

//     try {
//         let newvote = new voteModel(req.body)
//         await newvote.save()
//         res.send({ "msg": `Vote is done`})
        

//     } catch (error) {
//         console.log(error.message)
//     }

// })



io.on("connection", async (socket) => {
    console.log('user is connected')
    const data = await voteModel.aggregate([{$group:{_id:"$party_name",count:{$count:{}}}}])
    io.emit("allvotes", data)
    socket.on("hello", (msg) => {
        console.log(msg)
    })
    socket.on("vote", async (party, voter_id) => {
        let findvoter = await voteModel.find({voter_id})
        if(findvoter.length>0){
            socket.emit("error","Voter_id is already exist")
        }else{
            
            const newvote = voteModel({voter_id,party_name:party})
            await newvote.save()
            socket.emit("success","Vote is successfully done")
            // const total = await voteModel.find({})
            const data = await voteModel.aggregate([{$group:{_id:"$party_name",count:{$count:{}}}}])
            io.emit("allvotes", data)
        }

    })

    socket.emit("customEvent", 'This is how you can create a custom evetns!');
    socket.on("disconnect", () => {
        console.log('user is disconneted')
    })


})



server.listen("8080", async () => {
    try {
        await connection
        console.log('mongo is connected')
        console.log('server is running')
    } catch (error) {

    }
})

