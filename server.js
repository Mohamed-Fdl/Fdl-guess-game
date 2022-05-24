const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const _ = require('underscore')

const users = []

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('newRegistration', (user) => {

        user.id = socket.id

        users.push(user)

        console.log('new gamer' + user.username);

        const username = user.username

        socket.join(user.game_code)

        //  const gamers = users.findAll(user => user.game_code === user.game_code)

        io.to(user.game_code).emit('gameStart', users)

        socket.on('GUESS', function(interval) {
            var result = randomNumber()
            if (interval === result.interval) {
                var message = 'Good answer!The number is ' + result.value
                var answer = true
                user.points++
            } else {
                var message = 'Bad answer!The number is ' + result.value
                var answer = false
                user.points--
            }
            result.message = message
            result.answer = answer
            result.points = user.points
            if (user.points <= 0) {
                io.to(user).emit('gameOver', result)
            } else if (user.points === 10) {
                io.to(username).emit('gameWon', result)
            } else {
                io.to(username).emit('giveAnswer', result)
            }
        })

        socket.on('disconnect', () => {
            userLeave(socket.id)
            io.to(user.game_code).emit('gameStart', users)
            console.log('user disconnected');
        });
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

function userLeave(id) {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


server.listen(3000, () => {
    console.log('listening on *:3000');
});