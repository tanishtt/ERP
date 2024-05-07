$(document).ready(function() {
    var socket = io.connect('http://' + document.domain + ':' + location.port);

    $("#startButton").click(function() {
        socket.emit('start_recognition');
    });

    $("#stopButton").click(function() {
        socket.emit('stop_recognition');
    });

    socket.on('update_result', function(data) {
        $("#result").text(data.result);
    });
});
