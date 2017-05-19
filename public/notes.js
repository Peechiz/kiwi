console.log('hello edit');
let submitNotes = document.querySelector('#submitNotes')
submitNotes.addEventListener('click', function(e){
  let notes = document.querySelector('#notes');
  // console.log( notes.value );
  $.post('/notes', { title: submitNotes.dataset.title, notes: notes.value }, function(res){
    console.log(res);
    window.location.href = 'http://localhost:9001/visited'
  })
})
