var Express = require('express');
 var multer = require('multer');
 var bodyParser = require('body-parser');
 var app = Express();
 const cors = require('cors')
 app.use(bodyParser.json());
 const path = require("path");
 const fs = require('fs')
 const mongoose = require("mongoose")
 const Photo = require("./models/photos")

 const imageData = Photo.find({})


mongoose.connect("mongodb://localhost:27017/photos", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("DB CONNECTED")
}).catch = (err) => {
    console.log("oops DB got disconnected");
}

app.use(cors({origin: true, credentials: true}))

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).single("file"); //Field name and max count

app.post("/Upload", upload, function(req, res) {
    console.log(req);
    let imageDetail = new Photo
    imageDetail.img.data = fs.readFileSync(req.file.path)
    imageDetail.img.contentType = req.file.mimetype
    imageDetail.save((err, doc)=>{
        if(!err){
            imageData.exec((err,data)=>{
                if(err) throw err
                res.send(data)
            })
        }
    })
});

app.get('/Upload', (req,res)=>{
    imageData.exec((err,data)=>{
        if(err) throw err
        res.send(data)
    })
})





const port = 8000

app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
})