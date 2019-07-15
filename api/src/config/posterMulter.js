// TODO : remove keys from source file and put them in environment file

const multer = require('multer');

// SET STORAGE
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});


export const upload = multer({ storage });
