import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Connection } from 'typeorm';
import { User } from './entity/user';

export function addCRUD(app: Express, connection: Connection) {
  const userRepository = connection.getRepository(User);
  app.get('/users', async function (req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  app.get('/users/:id', async function (req: Request, res: Response) {
    const results = await userRepository.findOne(req.params.id);
    return res.send(results);
  });

  app.post('/users', async function (req: Request, res: Response) {
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.put('/users/:id', async function (req: Request, res: Response) {
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.delete('/users/:id', async function (req: Request, res: Response) {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  });
}
