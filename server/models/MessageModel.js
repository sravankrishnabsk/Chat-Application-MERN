const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    imageURL : {
        type: String,
        default: "",
    },
    vdeoURL : {
        type: String,
        default: ""
    },
    seen : {
        type: Boolean,
        default: false
    }
})

const MessageModel = mongoose.model('Message',MessageSchema);

module.exports = MessageModel;