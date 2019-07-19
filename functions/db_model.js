const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Hp = new Schema({
    hp_brand: {
        type: String
    },
    hp_type: {
        type: String
    },
    hp_problem: {
        type: String
    },
    hp_fee: {
        type: Number
    },
    hp_owner: {
        type: String
    },
    datetime: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Hp', Hp)