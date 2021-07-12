var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bcrypt = require('bcrypt')

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    password:{type: String, minlength:5, required:true},
    age: Number,
    phone: {type: String, minlength:10, maxlength:13}
},{timestamps:true})

userSchema.pre('save', function(next){
    if(this.password & this.isModified('password')){
        bcrypt.hash(this.password, 10, (err,hashed)=>{
            if(err) return next(err)
            this.password = hashed
            next()
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('User', userSchema)