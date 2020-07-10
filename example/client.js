const HOST = "http://localhost:3000/api/v1";
  
async function requestPeerConnection() {
  const response = await fetch(HOST + "/connections", { method: "POST" });
  const remotePeerConnection = await response.json();
  return remotePeerConnection;
}

document.addEventListener("DOMContentLoaded", () => {
  const localVideo = document.querySelector("video#local");
  localVideo.autoplay = true;
  localVideo.muted = true;

  const remoteVideo = document.querySelector("video#remote");
  remoteVideo.autoplay = true;
  remoteVideo.muted = true;

  const setup = async () => {
    try {
      const localStream = await window.navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });

      const remotePeerConnection = await requestPeerConnection();
      const { id } = remotePeerConnection;

      const localPeerConnection = new RTCPeerConnection({
        sdpSemantics: 'unified-plan'
      });
      localStream.getTracks().forEach(track => localPeerConnection.addTrack(track, localStream));
      localVideo.srcObject = localStream;
      const remoteStream = new MediaStream(localPeerConnection.getReceivers().map(receiver => receiver.track));
      remoteVideo.srcObject = remoteStream;

      await localPeerConnection.setRemoteDescription(remotePeerConnection.localDescription);

      const originalAnswer = await localPeerConnection.createAnswer();
      const updatedAnswer = new RTCSessionDescription({
        type: 'answer',
        sdp: originalAnswer.sdp
      });
      await localPeerConnection.setLocalDescription(updatedAnswer);

      const response = await fetch(HOST + "/connections/" + id + "/remote-description", {
        method: "POST",
        body: JSON.stringify(localPeerConnection.localDescription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log((await response.json()));
    } catch (exc) {
      localPeerConnection.close();
      throw exc;
    }
  };
  setup();
});
