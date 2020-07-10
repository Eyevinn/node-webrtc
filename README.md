# WebRTC Util Modules

This library is based on the WebRTC bindings provided by [node-webrtc](https://github.com/node-webrtc/node-webrtc) and provides a set of utility modules when building WebRTC server applications in NodeJS.

## WebRTC Connection Manager

To handle the negotiation of connections between peers the WebRTC Connection Manager module included in this library can be used. This connection manager provides a REST based API for the [negotiation between peers of various audio and video codecs](https://www.tutorialspoint.com/webrtc/webrtc_session_description_protocol.htm), network topologies and other device information.

```
const { WebRTCConnectionManager } = require('@eyevinn/webrtc');

const connectionManager = new WebRTCConnectionManager({ port: 3000 });
connectionManager.register("beforeoffer", (peerConnection, next) => {
  console.log("Do stuff here before offer");
  next();
});

connectionManager.on("connect", connection => {
  console.log("Do stuff here when a client connected");
});

connectionManager.on("close", () => {
  console.log("Clean up stuff when a client disconnect");
});

connectionManager.listen();
```

See `example` for a simple example of an audio/video loopback.

The REST API in the above example is available on `localhost:3000` and the Swagger API documentation on `http://localhost:3000/api/docs`.

# LICENSE

MIT