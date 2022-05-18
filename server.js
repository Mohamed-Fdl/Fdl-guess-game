const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const _ = require('underscore')

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newRegistration', (username) => {
        console.log('new gamer come ' + username.username);

        const user = username.username

        socket.join(user)

        socket.on('GUESS', function(interval) {
            var result = randomNumber()
            if (interval === result.interval) {
                var message = 'Good answer!The number is ' + result.value
                var answer = true
                username.points++
            } else {
                var message = 'Bad answer!The number is ' + result.value
                var answer = false
                username.points--
            }
            result.message = message
            result.answer = answer
            result.points = username.points
            if (username.points <= 0) {
                io.to(user).emit('gameOver', result)
            } else if (username.points === 10) {
                io.to(user).emit('gameWon', result)
            } else {
                io.to(user).emit('giveAnswer', result)
            }
        })

    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


});


function randomNumber() {
    const options = [1, 2, 3, 4, 5, 6, 7]
    const random_number = _.sample(options)
    if (random_number < 4) {
        return { value: random_number, interval: 'LTFOUR' }
    } else if (random_number > 4) {
        return { value: random_number, interval: 'MTFOUR' }
    } else {
        return { value: random_number, interval: 'ETFOUR' }
    }
}

server.listen(3000, () => {
    console.log('listening on *:3000');
});