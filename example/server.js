const { WebRTCConnectionManager } = require('../index.js');

const connectionManager = new WebRTCConnectionManager({ port: 3000 });
connectionManager.register("beforeoffer", (peerConnection, next) => {
  console.log("Do stuff here before offer");
  const audioTransceiver = peerConnection.addTransceiver('audio');
  const videoTransceiver = peerConnection.addTransceiver('video');
  Promise.all([
    audioTransceiver.sender.replaceTrack(audioTransceiver.receiver.track),
    videoTransceiver.sender.replaceTrack(videoTransceiver.receiver.track)
  ]).then(next);
});

connectionManager.on("connect", connection => {
  console.log("Client connected");
});

connectionManager.on("close", () => {
  console.log("Client closed connection");
});

connectionManager.listen();