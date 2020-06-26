var socket = io.connect('http://localhost:4000');

function select(el) {
    return document.getElementById(el);
}

var message = select('message');
handle = select('handle'),
    btn = select('send'),
    output = select('output'),
    feedback = select('feedback');

btn.addEventListener("click", function () {

    socket.emit('chat', {

        message: message.value,
        handle: handle.value

    });
});

message.addEventListener('keypress', function () {

    socket.emit('typing', handle.value);
});
socket.on('chat', function (data) {

    feedback.innerHTML = '';
    output.innerHTML += '<p><stron>' + data.handle + ': </strong>' + data.message + '</p>'
});

socket.on('typing', function (data) {

    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});