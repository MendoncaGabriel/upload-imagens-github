import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';

class UploadFileController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const parts = await req.file(); 

    if (!parts) {
      return res.status(400).send({ error: 'Nenhuma imagem enviada' });
    }

    const { path } = req.query as { path: string };

    if (!path) {
      return res.status(400).send({ error: 'O campo "path" é obrigatório' });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(parts.mimetype)) {
      return res.status(400).send({ error: 'Tipo de arquivo inválido. Envie uma imagem.' });
    }

    const originalFileName = parts.filename || 'imagem.png'; 

    const fileExtension = originalFileName.split('.').pop();
    const fileNameWithExtension = `${path}.${fileExtension}`;

    const content = await parts.toBuffer();
    const base64Content = content.toString('base64');

    const API_URL = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${fileNameWithExtension}`;

    try {
      const response = await axios.put(
        API_URL,
        {
          message: `Adicionando imagem ${fileNameWithExtension}`,
          content: base64Content,
        },
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      res.send(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res.status(500).send({
          error: 'Erro ao fazer upload para o GitHub',
          details: error.response?.data || error.message,
        });
      } else {
        res.status(500).send({ error: 'Erro desconhecido ao fazer upload' });
      }
    }
  }

}

export { UploadFileController };
