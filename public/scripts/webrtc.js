var pubnub; // global
var channel = 'FHSK';

var webrtc = {

init: function(name) {
    console.log('webrtc: init: '+name);
    pubnub = PUBNUB.init({
      publish_key: 'pub-c-3f5012f9-4fcb-4de5-b5fe-49930dbb7981',
      subscribe_key: 'sub-c-d143f950-6f06-11e3-9291-02ee2ddab7fe',
      uuid: name
    });
  },

  publish: function(data) {
    console.log('webrtc: publish');
    pubnub.publish({
      channel: channel,        
      message: data
    });
  }, 

  subscribe: function(name, key) {
    console.log('webrtc: subscribe');
    console.log(pubnub.uuid())
    pubnub.subscribe({
      channel: channel,
      presence: function(data){
        console.log('webrtc: subscribe: presence');
        console.log(data);
      },
      message: function(data){
        console.log('webrtc: subscribe: message');
        console.log(data);
        if (data.peer) {
          for (fn in data.peer) {
            peer[fn](data.peer[fn]);
          }
        };
        //console.log(data.czar);
      }
    });
  },

  getPlayers: function() {
    console.log('webrtc: getPlayers');
    console.log(pubnub);
    pubnub.here_now({
      channel: channel,
      callback: function(data){
        console.log('webrtc: getPlayers: callback');
        console.log(data)
      }
    });
  },

}