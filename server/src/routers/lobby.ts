
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

lobbyRouter.post('/find', (req, res) => {
  const body = req.body;
  
  if (body.id === undefined) {
    res.status(400);
  }

  console.log(req.body.id)

  res.json();
})

export default lobbyRouter;