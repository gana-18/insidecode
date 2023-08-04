const mongoose=require('mongoose')

const userSchema =new mongoose.Schema({
    googleId:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        min:3,
        max:15,
    },
    firstName:{
        type:String,
        required:true,
        min:2,
        max:25,
    },
    lastName:{  
        type:String,
        required:true,
        min:2,
        max:25,
    },
    email:{
        type:String,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    profilePic:{
        type:String,
    },
    followers:{ 
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[],
    },
    bookmarks:{
        type:Map,
        of:Boolean,
        default:{},
    },
    job:{
        type:String,
        max:50,
    },
},{timestamps:true})
const User=mongoose.model('User',userSchema)
module.exports=User