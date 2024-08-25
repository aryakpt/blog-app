import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

import config from './config';

cloudinary.config(config.cloudinary);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog-app',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

export const upload = multer({ storage });

export default storage;
