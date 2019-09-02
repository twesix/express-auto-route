const path = require('path')
const multer = require('multer')
const dest  =path.resolve(__dirname, '../uploads')
const upload= multer({dest: dest})
const fs = require('fs')

function file_upload(req,res)
{
    const files = req.files
    for ( let i = 0; i < files.length; i ++)
    {
        const file = files[i]
        const filetype = file.originalname.split('.').pop()
        const savepath = file.path + '.' + filetype
        const savefilename = file.filename + '.' + filetype
        fs.renameSync(file.path, savepath)
        file.savepath = savepath
        file.savefilename = savefilename
    }
    console.log(files)
    res.json({ok: true, files: files})
}

module.exports.post = [file_upload]

