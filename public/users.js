var socket = io();

const usersList = document.getElementById('userslist')

const username = location.search.split('=')[1].toString()

const user = { username: username, points: 5 }

socket.emit('newUser', user);

socket.on('usersList', function(users) {
    formatusers(users, username)
    outputusers(users)
})

function formatusers(users, username) {
    const index = users.findIndex(user => user.username === username)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

function outputusers(users) {
    usersList.innerHTML = `${users.map(user => `<li class="list-group-item">${user.username}</li>`).join('')}`
}

//MTFOUR more than four
//ETFOUR equal to four
//LTFOUR less than four