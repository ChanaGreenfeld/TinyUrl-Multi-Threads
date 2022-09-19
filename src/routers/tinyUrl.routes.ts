import { Router } from 'express';
import UrlController from '../controllers/tinyUrl.controller';


class Route {
  private router: Router;

  constructor() {
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter() {
    this.router.get('/:shortId', async (req, res) => {
      await UrlController.redirectUrl(req, res);
    });

    this.router.post('/', async (req, res) => {
      await UrlController.shortenUrl(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new Route();