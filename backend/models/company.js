const mongoose =require('mongoose');
const uniqueValidator =require("mongoose-unique-validator");

const companySchema=mongoose.Schema(
    {
        companyname:{type:String,required:true},
        code:{type:String,required:true , unique:true},
        country:{type:String,required:true},
    }
);
companySchema.plugin(uniqueValidator);


module.exports=mongoose.model('Company',companySchema);