console.log('hello unvisit');

let btns = document.querySelectorAll('.btn-danger');
if (btns) {

  btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
      $.post('/unvisit', { title: btn.dataset.title }, res => {
        console.log(res);
        window.location.reload()
      })
    })
  })
} else {
  console.log('whoops');
}
