const express = require("express");
const multer = require("multer");
const router = express.Router();
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const CompanyModel = require('../models/company');
const EmployeeModel=require('../models/employee');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }

        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})
router.post("/details", (req, res, next) => {
    const company = new CompanyModel({
        companyname: req.body.companyname,
        code: req.body.code,
        country:req.body.country,
        
    });
    company.save().then(createdRecord => {
        console.log(createdRecord)
        res.status(201).json(
            {
                message: "Data added successfully",
                id:createdRecord._id,
                
            });
    });
})

router.post("/employee", multer({ storage: storage }).single("epic"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const employee=new EmployeeModel({
        ename:req.body.ename,
        ecode:req.body.ecode,
        esalary:req.body.esalary,
        epic: url + "/images/" +  req.file.filename,
        companyid:req.body.companyid
    
    })
    employee.save().then(created=>{
        console.log(created);
        res.status(201).json(
            {
                message: "Employee added successfully",
                id:created._id,
                
            });
    });
})


module.exports = router;