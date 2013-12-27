var peer = {
  init: function(name) {
    console.log('peer: init: '+name);
    webrtc.init(name);
  },

  playerNew: function(data) {
    console.log(data);
  },

  subscribe: function(name, key) {
    webrtc.subscribe(name, key); 
  },

  getPlayers: function(data) {
    webrtc.getPlayers(data);
  },

  requestCards: function(data) {
    console.log("Cards Requested");
    data = {to: "czar", from: pubnub.uuid(), action: "requestCards", count: "1"}
    webrtc.publish(data);
  },

  submitCards: function(data) {
    console.log("Submit Cards");
    webrtc.publish(data);
  },

  announce: function(data) {
    console.log("Player 1 has joined the game!");
    webrtc.publish(data);
  }
}