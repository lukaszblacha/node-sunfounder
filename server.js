const WebSocket = require('ws');
const actions = require('./actions');

const PORT = 1337;

const wss = new WebSocket.Server({ port: PORT });

const handleData = (data) => {
  try {
    const command = JSON.parse(data);
    if (actions[command.action] instanceof Function) {
      actions[command.action](command.params);
    } else {
      console.log('Unexpected command:', command);
    }
  } catch (err) {
    console.error('ERROR', err);
  }
};

wss.on('connection', function connection(ws) {
  ws.on('message', handleData);
  console.log('Client connected, waiting for commands...');
});
