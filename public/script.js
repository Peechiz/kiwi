console.log('hello worldz');

let submitNotes = document.querySelector('#submitNotes')
submitNotes.addEventListener('click', function(e){
  let notes = document.querySelector('#notes');
  $.post('/notes', { title: submitNotes.dataset.title, notes: notes.value }, function(res){
    console.log(res);
  })
})

let applied = document.querySelector('#applied');
applied.addEventListener('click', function(){
  $.post('/applied', { title: submitNotes.dataset.title }, function(res){
    console.log(res);

  })
})

let saw = document.querySelector('#saw');
saw.addEventListener('click', function(){
  $.post('/saw', { title: submitNotes.dataset.title }, function(res){
    console.log(res);
    window.location.reload();
  })
})
