var socket = io();

var ltf_button = document.getElementById('ltfour')

var etf_button = document.getElementById('etfour')

var mtf_button = document.getElementById('mtfour')

const username = location.search.split('=')[1].toString()

socket.emit('newRegistration', username);


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
    answer.innerHTML = result.message
    if (result.answer) {
        answer.classList.remove('text-danger')
        answer.classList.add('text-success')
    } else {
        answer.classList.remove('text-success')
        answer.classList.add('text-danger')
    }
})

/*socket.on('alertcomming', function(username) {
    alert(`Welcome to you ${username}`)
})*/



/* if (random.interval === 'LTFOUR') {
            alert('good guess')
        } else {
            alert('bad guess')
        }*/








//MTFour more than four
//ETFour equal to four
//LTFour less than four