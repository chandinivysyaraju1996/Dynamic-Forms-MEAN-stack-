const mongoose =require('mongoose');
const uniqueValidator =require("mongoose-unique-validator");
const employeeSchema=mongoose.Schema(
    {
        ename:{type:String,required:true},
        ecode:{type:String,required:true,unique:true},
        esalary:{type:String,required:true},
        epic:{type:String,required:true},
        companyid:{type:String, required:true}
    }
);

employeeSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Employee',employeeSchema);