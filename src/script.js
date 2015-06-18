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

function previewFile (event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
}

function upThanks(){
  document.getElementById('filename').innerHTML="Your file has been uploaded";
}
