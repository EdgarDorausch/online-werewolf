
import * as express from 'express';
import { gsm } from '..';


const lobbyRouter = express.Router()

lobbyRouter.get('/create', (req, res) => {
  const sessionId = gsm.createNewLobby();

  console.log(`Created new Session: ${sessionId}`);

  res.json({
    sessionId
  })
})

lobbyRouter.get('/find/:id', (req, res) => {
  const params = req.params;

  if (params.id === undefined) {
    res.status(400);
  }

  const findRes = gsm.findLobby(params.id);

  switch (findRes.type) {
    case 'NOT_FOUND':
      res.sendStatus(404);
      break;
    case 'ALREADY_STARTED':
      res.sendStatus(406);
      break;
    case 'OK':
      res.sendStatus(200)
      break
  }
})

lobbyRouter.post('/join/', (req, res) => {
  const body = req.body;

  if (body.id === undefined || body.userName === undefined) {
    res.status(400);
  }

  const findRes = gsm.findLobby(body.id);

  switch (findRes.type) {
    case 'NOT_FOUND':
      res.sendStatus(404);
      break;
    case 'ALREADY_STARTED':
      res.sendStatus(406);
      break;
    case 'OK':
      const memberId = findRes.session.join(body.userName);
      if (memberId === null) {
        res.status(403).send('UserName already used');
      }
      else {
        res.status(200).send({memberId,userName: body.userName});
      }
      break
  }
})

export default lobbyRouter;