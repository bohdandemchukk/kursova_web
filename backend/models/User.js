const { Schema, model, Types} = require('mongoose')


const schema = new Schema({
    email: {type: String, required:true, unique:true},
    password: {type:String, required:true},
    income: [{type: Types.ObjectId, ref: 'income'}]
})




module.exports = model('User', schema)

