function sendComment() {
  const comment = document.getElementById('comment_text').value;
  const commentBase = JSON.parse(localStorage['comments'] || '[]');
  commentBase.push(comment);
  localStorage['comments'] = JSON.stringify(commentBase);
  document.getElementById('comment_text').value = '';
  document.getElementById('comments').innerHTML += `<p>${comment}</p>`;
}
document.getElementById('send_comment').addEventListener('click', sendComment);

function getComments() {
  const commentBase = JSON.parse(localStorage['comments'] || '[]');
  let elems = '';
  for (const key of commentBase) {
    elems += `<p>${key}</p>`;
  }
  document.getElementById('comments').innerHTML = elems;
}

getComments();
