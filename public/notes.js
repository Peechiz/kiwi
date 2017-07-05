console.log('hello edit');
let submitNotes = document.querySelector('#submitNotes')
submitNotes.addEventListener('click', function(e){
  let notes = document.querySelector('#notes');

  postJSON('/notes', { title: submitNotes.dataset.title, notes: notes.value }).then(function(res){
    console.log(res);
    window.location.href = 'http://localhost:9001/visited'
  })
})

function postJSON(url, json) {
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(json);

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
