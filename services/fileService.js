const fs = require('fs');
const File = require('../models/File');
const config = require('config');
const filePath = require('../middleware/file.middleware')

class FileService {
    createDir(req, file) {
        const filePath = this.getPath(req, file)
        return new Promise((resolve, reject) => {

            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({ msg: 'File directory was created' }); 
                } else {
                    return reject({ msg: 'File directory already exists' });
                }
            } catch (e) {
                return reject({ msg: 'Error creating file directory' }); 
            }

        });
    }

     deleteFile(req, file) {
        const path = this.getPath(req, file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(req, file) {
        return req.filePath + '\\' + file.user + '\\' + file.path
    }
}

module.exports = new FileService();