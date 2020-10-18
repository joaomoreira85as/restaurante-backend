import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface IUploadConfg {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: { storage: StorageEngine };
  config: {
    disk: { url: string };
    s3: {
      bucket: string;
      url: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },
  config: {
    disk: {
      url: process.env.APP_API_URL,
    },
    s3: {
      bucket: 'app-agendamento',
    },
  },
} as IUploadConfg;
