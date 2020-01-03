(async () => {
  const express = require('express');
  const app = express();
  app.use(express.static('./www'));
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

const games = [];
app.post('/v1/games', async (req, res) => {
    const game = {players: []};
    const id = games.length;
    games.push(game);
    res.json({id, maxPlayers: 2,});
});

app.listen(8080);
const {Server} = new require('ws');

const server = new Server({
  port: 8081
});

server.on("connection",client =>{
  client.one("message", msg => {
    let  json = {};
    try{
      json = JSON.parse(msg);
    }catch(e){
      //client.disconnect
    }
  if (json.type === "auth" && games[+json.gameId] && games[+json.gameId].players.length < 2){
    games[+json.gameId].players.push(client);
    client.on("message");
  }
  });

/*  clients.push(client)
  client.on("message",msg =>{
    clients.forEach(elem => {
      try{
            elem.send(msg);
      }catch(e){}
    });
  });*/

});
})();
