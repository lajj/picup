function search(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      document.getElementById('results').innerHTML = xhr.responseText;
    }
  };
  xhr.open('GET', '/view/' + document.getElementById('key').value + '/' + document.getElementById('value').value);
  xhr.send();
}

function recent(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      document.getElementById('results').innerHTML = xhr.responseText;
    }
  };
  xhr.open('GET', '/recent/'+document.getElementById('numhours').value);
  xhr.send();
}
