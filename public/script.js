var socket = io();

var ltf_button = document.getElementById('ltfour')

var etf_button = document.getElementById('etfour')

var mtf_button = document.getElementById('mtfour')

var one_button = document.getElementById('one')

var two_button = document.getElementById('two')

var user_name = document.getElementById('user_name')

var user_name_number = document.getElementById('user_name_number')

var opp_name = document.getElementById('opp_name')

var opp_name_number = document.getElementById('opp_name_number')

var game_code = document.getElementById('game_code')

var opponent_name = document.getElementById('opponent_name')

var oppCome = document.getElementById('oppCome')

var choiceContainer = document.getElementById('choice-container')

var numberContainer = document.getElementById('number-container')

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
    socket.emit('PRESS', '1')
})

two_button.addEventListener('click', function() {
    socket.emit('PRESS', '2')
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
    game_info.innerHTML = 'Game Over :=('
    game_info.classList.add('text-danger')
})

socket.on('gameWon', function(result) {
    var game_container = document.getElementById('game_container')

    var help = document.getElementById('help')

    var game_info = document.getElementById('game_info')

    game_container.parentNode.removeChild(game_container);
    help.innerHTML = 'Home'
    help.setAttribute('href', 'index.html')
    game_info.innerHTML = 'Congratulation you won the game :=)'
    game_info.classList.add('text-success')
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
    console.log('give answer' + number)
    choiceContainer.classList.remove('invisible')
})

socket.on('sendNotif', function(result) {
    var answerNumber = document.getElementById('answer-number')
    answerNumber
    console.log(result)
})





//MTFOUR more than four
//ETFOUR equal to four
//LTFOUR less than four