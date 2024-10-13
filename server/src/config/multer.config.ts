import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const uploadPath = join(__dirname, '../../uploads/users');
      callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
      // Generate a unique filename using UUID and preserve the original extension
      const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
      callback(null, uniqueSuffix);
    },
  }),
  fileFilter: (req, file, callback) => {
    // Accept only image files
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return callback(
        new Error('Unsupported file type. Only JPG, JPEG, PNG, and GIF are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
};
