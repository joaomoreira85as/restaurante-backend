import upload from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);
    const ContentType = mime.getType(originalPath);
    const fileContent = await fs.promises.readFile(originalPath);
    if (!ContentType) {
      throw new Error('File not found');
    }
    await this.client
      .putObject({
        Bucket: upload.config.s3.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();
    await fs.promises.unlink(originalPath);
    return file;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: upload.config.s3.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
