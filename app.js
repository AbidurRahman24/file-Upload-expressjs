const express = require('express')
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb)=>{
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname
                            .replace(fileExt, '')
                            .toLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();
                            cb(null, fileName + fileExt)
  }
 
})



const upload = multer(
  {
    storage: storage,
    limits: {
      fileSize: 100000,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true)
      } else {
        cb(new Error("Only jpg, png, jpeg allow format"))
      }
    }
  })


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//Single file upload method
app.post('', upload.single('avatar'), (req, res, next) => {
  res.send('Hello World')
})

// Multiple file upload method
// app.post('/', upload.array('avatar', 2),(req, res, next) => {
//   res.send('Hello World')
// })

// multiple field file upload
// app.post('/', upload.fields(
//   [
//     { name: 'avatar', maxCount: 1 }, 
//     { name: 'gallery', maxCount: 8 }
//   ]
//   ),(req, res, next) => {
//   res.send('Hello World')
// })

// text-only multipart form, you should use the .none() method:
// app.post('/', upload.none(),(req, res, next) => {
//   res.send('Hello World')
// })
app.use((err, req, res, next)=>{
  if (err) {
    res.status(500).send(err.message)
  }
  else{
    res.send('success')
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})