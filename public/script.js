var socket = io();

var ltf_button = document.getElementById('ltfour')

var etf_button = document.getElementById('etfour')

var mtf_button = document.getElementById('mtfour')

var one_button = document.getElementById('one')

var two_button = document.getElementById('two')

var three_button = document.getElementById('three')

var four_button = document.getElementById('four')

var five_button = document.getElementById('five')

var six_button = document.getElementById('six')

var seven_button = document.getElementById('seven')

var user_name = document.getElementById('user_name')

var user_name_number = document.getElementById('user_name_number')

var opp_name = document.getElementById('opp_name')

var opp_name_number = document.getElementById('opp_name_number')

var game_code = document.getElementById('game_code')

var opponent_name = document.getElementById('opponent_name')

var oppCome = document.getElementById('oppCome')

var choiceContainer = document.getElementById('choice-container')

var numberContainer = document.getElementById('number-container')

var answerNumber = document.getElementById('answer-number')

var pointTableNumber = document.getElementById('points_table_number')

const username = location.search.split('&')[0].split('=')[1]

const gamecode = location.search.split('&')[1].split('=')[1]

user_name.innerHTML = username

user_name_number.innerHTML = username


const user = { username: username, points: 5, game_code: gamecode }

socket.emit('newRegistration', user);

ltf_button.addEventListener('click', function(e) {
    socket.emit('GUESS', 'LTFOUR')
})

etf_button.addEventListener('click', function(e) {
    socket.emit('GUESS', 'ETFOUR')
})

mtf_button.addEventListener('click', function(e) {
    socket.emit('GUESS', 'MTFOUR')
})

one_button.addEventListener('click', function() {
    numberContainer.classList.add('invisible')
    answerNumber.classList.add('invisible')
    socket.emit('PRESS', '1')
})

two_button.addEventListener('click', function() {
    numberContainer.classList.add('invisible')
    answerNumber.classList.add('invisible')
    socket.emit('PRESS', '2')
})

three_button.addEventListener('click', function() {
    numberContainer.classList.add('invisible')
    answerNumber.classList.add('invisible')
    socket.emit('PRESS', '3')
})

four_button.addEventListener('click', function() {
    numberContainer.classList.add('invisible')
    answerNumber.classList.add('invisible')
    socket.emit('PRESS', '4')
})

five_button.addEventListener('click', function() {
    numberContainer.classList.add('invisible')
    answerNumber.classList.add('invisible')
    socket.emit('PRESS', '5')
})

six_button.addEventListener('click', function() {
    numberContainer.classList.add('invisible')
    answerNumber.classList.add('invisible')
    socket.emit('PRESS', '6')
})

seven_button.addEventListener('click', function() {
    numberContainer.classList.add('invisible')
    answerNumber.classList.add('invisible')
    socket.emit('PRESS', '7')
})

socket.on('giveAnswer', function(result) {
    var answer = document.getElementById('answer')

    var ia_points = document.getElementById('ia_points')

    var user_points = document.getElementById('user_points')

    user_points.innerHTML = result.points
    ia_points.innerHTML = 10 - result.points
    answer.innerHTML = result.message

    if (result.answer) {
        answer.classList.remove('text-danger')
        answer.classList.add('text-success')
    } else {
        answer.classList.remove('text-success')
        answer.classList.add('text-danger')
    }
    choiceContainer.classList.add('invisible')
})

socket.on('gameOver', function(result) {
    var game_container = document.getElementById('game_container')

    var help = document.getElementById('help')

    var game_info = document.getElementById('game_info')

    game_container.parentNode.removeChild(game_container);
    help.innerHTML = 'Home'
    help.setAttribute('href', 'index.html')
    if (result.points === 0) {
        game_info.innerHTML = 'Game Over :=('
        game_info.classList.add('text-danger')
    } else {
        game_info.innerHTML = 'Congrats you win this game :=)'
        game_info.classList.add('text-success')
    }
})

socket.on('gameOverNotif', function(result) {
    var game_container_number = document.getElementById('game_container_number')

    var help_number = document.getElementById('help_number')

    var game_info_number = document.getElementById('game_info_number')

    game_container_number.parentNode.removeChild(game_container_number);
    help_number.innerHTML = 'Home'
    help_number.setAttribute('href', 'index.html')
    if (result.points === 0) {
        game_info_number.innerHTML = 'Congrats you win this game :=)'
        game_info_number.classList.add('text-success')
    } else {
        game_info_number.innerHTML = 'Game Over :=('
        game_info_number.classList.add('text-danger')
    }
})

socket.on('gameStart', function(users) {

    // in step1 I escape user that have not the same gameCode of current user
    const step1 = users.filter(function(user) {
        return user.game_code === gamecode
    })

    //in step2 I escape the current user so I recover his opponent
    const step2 = step1.filter(function(user) {
        return user.username !== username
    })

    if (step2[0]) {
        oppCome.classList.remove('invisible')
        opponent_name.innerHTML = step2[0].username;
        opp_name_number.innerHTML = step2[0].username;
        opp_name.innerHTML = step2[0].username;
        var come_second = document.getElementById('come_second')
        if (come_second) {
            var come_first = document.getElementById('come_first')
            come_first.parentNode.removeChild(come_first)
            choiceContainer.classList.add('invisible')
        }
    } else {
        var come_second = document.getElementById('come_second')
        come_second.parentNode.removeChild(come_second)
    }

})

socket.on('quitGame', function() {
    location.href = "/?m=no-auth"
})

socket.on('needAnswer', function(number) {
    choiceContainer.classList.remove('invisible')
})

socket.on('sendNotif', function(result) {
    var user_points_number = document.getElementById('user_points_number')

    var ia_points_number = document.getElementById('ia_points_number')

    ia_points_number.innerHTML = result.points

    user_points_number.innerHTML = 10 - result.points

    numberContainer.classList.remove('invisible')
    answerNumber.classList.remove('invisible')
    if (result.answer) {
        answerNumber.innerHTML = 'You lost.Your opponent guessed correctly'
        answerNumber.classList.add('text-danger')
        answerNumber.classList.remove('text-success')
    } else {
        answerNumber.innerHTML = 'You won.Your opponent guessed wrong'
        answerNumber.classList.remove('text-danger')
        answerNumber.classList.add('text-success')
    }
})








//MTFOUR more than four
//ETFOUR equal to four
//LTFOUR less than four