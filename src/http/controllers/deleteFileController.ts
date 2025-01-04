import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";

class DeleteFileController {
  async handle(
    req: FastifyRequest<{
      Params: { path: string };
      Body: { content: string; sha: string }
    }>,
    res: FastifyReply
  ) {
    const { path } = req.params;
    const { sha } = req.body;

    const API_URL = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents`;

    const response = await axios.delete(`${API_URL}/${path}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      data: { message: `Deletando arquivo ${path}`, sha },
    });

    res.send(response.data);
  }
}

export { DeleteFileController }