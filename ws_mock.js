import { WebSocketServer } from 'ws';

const PORT = 18000;
const wss = new WebSocketServer({ port: PORT });

let intervalId = null;

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

    if (data.topic === 'date') {
      // Clear the previous interval if it exists
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }

      // If interval is -1, stop sending messages
      if (data.interval === -1) {
        return;
      }

      // Send server time at specified intervals
      intervalId = setInterval(() => {
        ws.send(JSON.stringify({ topic: 'date', date: new Date().toISOString() }));
      }, data.interval * 1000);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
});

console.log(`WebSocket server started on ws://localhost:${PORT}`);
