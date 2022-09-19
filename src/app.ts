import express, { Application } from 'express';
import router from './routers/tinyUrl.routes';
 import cluster from 'cluster';
 import cors from 'cors';
 
 import os from 'os'
 const numCPUs = os.cpus().length;

class App {
  private application: Application;

  constructor() {
    if (cluster.isPrimary) {
      this.startPrimary()
    } else {
      this.startWorker()
    }
   
  }

  startPrimary() {
    console.log(`Number of CPUs is ${numCPUs}`);
    console.log(`Master ${process.pid} is running`);  
      // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  }

  startWorker() {
    this.application = express();
    console.log(`Worker ${process.pid} started`);
    this.setupGlobalMiddleware();
    this.setupRouters();
  }

  start(port: string | number = 8000) {
    if(!cluster.isPrimary) {
    return this.application.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`listening on port ${port}`);
    });
  }
  }

  private setupGlobalMiddleware() {
    this.application.use(express.json());
    this.application.use(cors());

  }

  private setupRouters() {
    this.application.use('/api', router.getRouter());
  }
}

export default new  App();