function showHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem('scores')) || [];

  highscores.sort(function (a, b) {
    return b.score -a.score;
  });

  for (var i=0; i< highscores.length; i+=1) {
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
    var olEl = document.querySelector('#highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('scores');
  window.location.reload();
}

document.querySelector('#clear').onclick = clearHighscores;

showHighscores();