import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";

class ListFilesController {
  async handle(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const API_URL = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents`;

    const response = await axios.get(
      `${API_URL}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )

    res.send(response.data);
  }
}

export { ListFilesController }