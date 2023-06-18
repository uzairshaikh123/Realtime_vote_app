const mongoose = require("mongoose")


const voteSchema = mongoose.Schema({
    voter_id:String,
    party_name:String
})

const voteModel = mongoose.model("voterdata",voteSchema)


module.exports={
    voteModel
}