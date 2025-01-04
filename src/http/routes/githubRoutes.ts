import { FastifyInstance } from 'fastify';
import { UploadFileController } from '../controllers/uploadFileController';
import { ListFilesController } from '../controllers/listFilesController';
import { DeleteFileController } from '../controllers/deleteFileController';
import { UpdateFileController } from '../controllers/updateFileController';

const uploadFileController = new UploadFileController()
const listFilesController = new ListFilesController()
const deleteFileController = new DeleteFileController()
const updateFileController = new UpdateFileController()

export default async function (app: FastifyInstance) {
  app.get('/files', listFilesController.handle);
  app.post('/files',  uploadFileController.handle); 
  app.put('/files/:path', updateFileController.handle);
  app.delete('/files/:path', deleteFileController.handle);
}
