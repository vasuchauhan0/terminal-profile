import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// S3 Bucket Configuration
const bucketName = process.env.AWS_S3_BUCKET_NAME;

// File filter - Accept images and videos
const fileFilter = (req, file, cb) => {
  // Allowed image types
  const imageTypes = /jpeg|jpg|png|gif|webp|svg/;
  // Allowed video types
  const videoTypes = /mp4|avi|mov|wmv|flv|mkv|webm/;
  // Allowed document types
  const documentTypes = /pdf|doc|docx/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  const isImage = imageTypes.test(extname) && mimetype.startsWith('image/');
  const isVideo = videoTypes.test(extname) && mimetype.startsWith('video/');
  const isDocument = documentTypes.test(extname) && 
    (mimetype.startsWith('application/') || mimetype.startsWith('document/'));

  if (isImage || isVideo || isDocument) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
  }
};

// Size limits (in bytes)
const fileSizeLimits = {
  image: 5 * 1024 * 1024,      // 5MB for images
  video: 100 * 1024 * 1024,    // 100MB for videos
  document: 10 * 1024 * 1024,  // 10MB for documents
};

// Multer S3 Upload Configuration
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucketName,
    // acl: 'public-read', // Make files publicly accessible
    metadata: (req, file, cb) => {
      cb(null, { 
        fieldName: file.fieldname,
        uploadedBy: req.user?.email || 'anonymous',
        uploadDate: new Date().toISOString()
      });
    },
    key: (req, file, cb) => {
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9]/g, '-')
        .toLowerCase();
      
      // Organize by file type
      let folder = 'others';
      if (file.mimetype.startsWith('image/')) {
        folder = req.body.folder || 'images';
      } else if (file.mimetype.startsWith('video/')) {
        folder = 'videos';
      } else if (file.mimetype.includes('pdf') || file.mimetype.includes('document')) {
        folder = 'documents';
      }
      
      const filename = `${folder}/${timestamp}-${randomString}-${basename}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max 100MB
  },
});

// Helper Functions

/**
 * Upload a file to S3
 * @param {Object} file - File object from multer
 * @param {String} folder - Folder name in S3 (e.g., 'projects', 'profiles')
 * @returns {Promise<String>} - S3 file URL
 */
export const uploadToS3 = async (file, folder = 'others') => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const ext = path.extname(file.originalname);
  const basename = path.basename(file.originalname, ext)
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase();
  
  const key = `${folder}/${timestamp}-${randomString}-${basename}${ext}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: 'public-read',
  });

  try {
    await s3Client.send(command);
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return fileUrl;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload file to S3');
  }
};

/**
 * Delete a file from S3
 * @param {String} fileUrl - Full S3 URL or key
 * @returns {Promise<Boolean>} - Success status
 */
export const deleteFromS3 = async (fileUrl) => {
  try {
    // Extract key from URL
    let key = fileUrl;
    if (fileUrl.includes('amazonaws.com/')) {
      key = fileUrl.split('amazonaws.com/')[1];
    }

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('S3 Delete Error:', error);
    throw new Error('Failed to delete file from S3');
  }
};

/**
 * Get a signed URL for private files (temporary access)
 * @param {String} key - S3 object key
 * @param {Number} expiresIn - URL expiration time in seconds (default: 1 hour)
 * @returns {Promise<String>} - Signed URL
 */
export const getSignedS3Url = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('S3 Signed URL Error:', error);
    throw new Error('Failed to generate signed URL');
  }
};

/**
 * Upload multiple files to S3
 * @param {Array} files - Array of file objects
 * @param {String} folder - Folder name in S3
 * @returns {Promise<Array>} - Array of S3 URLs
 */
export const uploadMultipleToS3 = async (files, folder = 'others') => {
  try {
    const uploadPromises = files.map(file => uploadToS3(file, folder));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('S3 Multiple Upload Error:', error);
    throw new Error('Failed to upload multiple files to S3');
  }
};

export { upload, s3Client, bucketName };
export default {
  upload,
  uploadToS3,
  deleteFromS3,
  getSignedS3Url,
  uploadMultipleToS3,
  s3Client,
  bucketName,
};