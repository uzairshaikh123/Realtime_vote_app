const mongoose=require("mongoose")


const connection = mongoose.connect("mongodb+srv://uzair:uzairshaikh@cluster0.hr4cear.mongodb.net/votedb?retryWrites=true&w=majority")

module.exports={
    connection
}