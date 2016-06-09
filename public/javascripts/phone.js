var socket = io()

var move = function(id){
  socket.emit('newMove',id);
};

// window.ondevicemotion = function(e){
//     var ax = e.accelerationIncludingGravity.x;
//     var ay = e.accelerationIncludingGravity.y;
//     var az = e.accelerationIncludingGravity.z;

//     var x =Math.round(ax);
//     var y =Math.round(ay);
//     var z =Math.round(az);

//     var coordinates = {'x':x, 'y':y, 'z':z}

//     // send data over the socket
//     socket.emit('acceleration',coordinates);
// }

window.ondeviceorientation = function(event) {
          console.log(event);
          alpha = Math.round(event.alpha);
          beta = Math.round(event.beta);
          gamma = Math.round(event.gamma);
       
       var coordinates = {'bx':beta, 'gy':gamma, 'az':alpha}

    // send data over the socket
    socket.emit('acceleration',coordinates); 
}       


