import AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import express from 'express';
import { Express } from 'express-serve-static-core';
import { Connection, createConnection } from 'typeorm';
import { addCRUD } from './addCRUD';
import { User } from './entity/user';

AdminBro.registerAdapter({ Database, Resource });

function useAdminBro(app: Express, connection: Connection) {
  const adminBro = new AdminBro({
    databases: [connection],
    // resources: [{ resource: User, options: { parent: { name: 'foobar' } } }],
    rootPath: '/admin',
  });
  const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);
}

async function runApp() {
  const connection = await createConnection();

  const app = express();
  app.use(express.json());

  useAdminBro(app, connection);
  addCRUD(app, connection);

  app.listen(3000, () => {
      console.log('Listening on http://localhost:3000');
      console.log('Admin panel at http://localhost:3000/admin');
  });
}
runApp();
