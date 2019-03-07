const path = require('path')
const multer = require('multer')
const dest  =path.resolve(__dirname, '../tmp')
const upload= multer({dest: dest})
const fs = require('fs')

function file_upload(req,res)
{
    const filetype = req.file.originalname.split('.').pop()
    const savepath = req.file.path + '.' + filetype
    const savefilename = req.file.filename + '.' + filetype
    fs.renameSync(req.file.path, savepath)
    req.file.savepath = savepath
    req.file.savefilename = savefilename
    console.log(req.file)
    res.json(req.file)
}

module.exports.post = [upload.single('filename'), file_upload]

