
let submitNotes = document.querySelector('#submitNotes')
submitNotes.addEventListener('click', function(e){
  let notes = document.querySelector('#notes');
  postJSON('/notes', { title: submitNotes.dataset.title, notes: notes.value })
  .then(function(res){
    console.log(res);
  })
})

let applied = document.querySelector('#applied');
applied.addEventListener('click', function(){
  postJSON('/applied', { title: submitNotes.dataset.title })
  .then(function(res){
    console.log(res);
  })
})

let saw = document.querySelector('#saw');
saw.addEventListener('click', function(){
  postJSON('/saw', { title: submitNotes.dataset.title })
  .then(function(res){
    console.log(res);
    window.location.reload();
  })
})

let star = document.querySelector('#star');
star.addEventListener('click', function(){

  postJSON('/star', {title: submitNotes.dataset.title}).then(res => {
    console.log(res);
  })
})

function postJSON(url, json) {
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();

    console.log(JSON.stringify(json));

    xhr.open('POST', url);
    xhr.onreadystatechange = handler;
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(json));

    function handler() {
      if (xhr.readyState == 4) {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error('postJSON: `' + url + '` failed with status: [' + this.status + ']'));
        }
      }
    };
  });
}
