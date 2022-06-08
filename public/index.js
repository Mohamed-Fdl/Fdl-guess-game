if (location.search === '?m=no-auth') {
    var gameInfo = document.getElementById('game-info')
    gameInfo.innerHTML = 'You are not authorized to enter with this gameCode.Enter with another!!'
}