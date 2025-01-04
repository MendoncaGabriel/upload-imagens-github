import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";

class UpdateFileController {
  async handle(
    req: FastifyRequest<{
      Params: { path: string };
      Body: { content: string; sha: string }
    }>,
    res: FastifyReply
  ) {
    const { path } = req.params;
    const { content, sha } = req.body;

    const API_URL = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents`;

    const response = await axios.put(
      `${API_URL}/${path}`,
      {
        message: `Atualizando arquivo ${path}`,
        content: Buffer.from(content).toString('base64'),
        sha,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    res.send(response.data);
  }
}

export { UpdateFileController }