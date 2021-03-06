console.log('hello unstar');

let btns = document.querySelectorAll('.btn-danger');
if (btns) {

  btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
      postJSON('/unstar', { title: btn.dataset.title })
      .then(res => {
        console.log(res);
        window.location.reload()
      })
    })
  })
} else {
  console.log('whoops');
}

function postJSON(url, json) {
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');
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
