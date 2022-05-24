var socket = io();

var ltf_button = document.getElementById('ltfour')

var etf_button = document.getElementById('etfour')

var mtf_button = document.getElementById('mtfour')

var user_name = document.getElementById('user_name')

var opp_name = document.getElementById('opp_name')

var game_code = document.getElementById('game_code')

const username = location.search.split('&')[0].split('=')[1]

const gamecode = location.search.split('&')[1].split('=')[1]

user_name.innerHTML = username

game_code.innerHTML = gamecode

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

    console.log(users);


})


//MTFOUR more than four
//ETFOUR equal to four
//LTFOUR less than four