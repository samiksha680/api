const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    // User vhaneko model banako. 
        Username: {
            type: String
        },
        age:{
            type : String
        },
        address:{
            type : String
        },
        password:{
            type : String
        },
        
        number:{
            type : String
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
                
        }]
    })

    userSchema.statics.checkCrediantialsDb = async (Username, password) =>{

        const user1 = await User.findOne({Username : Username, password : password })
         return user1;
        }


        userSchema.methods.generateAuthToken = async function () {
            const user = this
           const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
           
           console.log(token);
            user.tokens = user.tokens.concat({ token :token })
            await user.save()
            return token
           }
           


     const User = mongoose.model('user', userSchema)


    module.exports = User