
import * as express from 'express';
import { gsm, mm } from '..';
import logger from '../logger';


const lobbyRouter = express.Router()

lobbyRouter.post('/create', (req, res) => {
  const body = req.body;
  const {memberId, userName} = body;
  
  const member = mm.get(memberId);
  if (member === null) {
    res.status(404).send('Member not found');
    return;
  }

  const sessionId = gsm.createNewLobby(memberId, userName);
  logger.info(`Created new Session: ${sessionId}`);

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

  if (body.memberId === undefined || body.userName === undefined || body.sessionId === undefined) {
    res.sendStatus(400);
  }

  const {memberId, sessionId, userName} = body;
  const member = mm.get(memberId);

  if (member === null) {
    res.status(404).send('Member not found');
    return;
  }

  const findRes = gsm.findLobby(body.sessionId);

  switch (findRes.type) {
    case 'NOT_FOUND':
      res.status(404).send('Session not found');
      break;
    case 'ALREADY_STARTED':
      res.sendStatus(406);
      break;
    case 'OK':
  
      if (findRes.session.join(userName, member)) {
        res.status(200).send({userName: body.userName});
      }
      else {
        res.status(403).send('UserName already used');
      }
      break
  }
})

export default lobbyRouter;