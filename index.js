var express = require('express');
var cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config()
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/images')
  }, filename: (req, file, cb) => {
    cb(null,file.fieldname+"_"+ Date.now() + '-' + path.extname(file.originalname))

  }
}
)


const upload=multer({storage})

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  res.json({name:req.file.originalname,type:req.file.mimetype,size:req.file.size})

})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
