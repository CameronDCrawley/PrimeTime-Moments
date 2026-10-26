const mongoose = require('mongoose')
let momentsSchema = new mongoose.Schema({

    id:Number,
    playerName:String,
    date:String,
    moment:String,
    descriptionImg:String,
    image:String,
    sport:String,
    buyNow:String,
    bid:[String]


});

module.exports= mongoose.model('IconicMoment',momentsSchema,'iconicMoments')
