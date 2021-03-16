class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
  }
  createDateCommnet() {
    const date = new Date();
    this.time = `${date.getHours()}:${date.getMinutes()}`;
    this.date = `${date.toLocaleDateString('ru')}`;
  }
}

const editComments = (id) => {
  const text = document.getElementById(id);
  text.children[1].outerHTML = `<textarea id="comment_text" style="width: 100%; height: 150px;">${text.children[1].innerText}</textarea>`;
  text.children[2].remove();
  text.children[2].remove();
  let saveButton = document.createElement('span');
  saveButton.className = 'content_button';
  saveButton.innerText = 'Сохранить';
  saveButton.onclick = () => {
    const commentBase = JSON.parse(localStorage['comments']);
    if (document.getElementById('sort_comment').value === 'Новые') commentBase[commentBase.length - 1 - id].text = text.children[1].value;
    else commentBase[id].text = text.children[1].value;
    localStorage['comments'] = JSON.stringify(commentBase);
    getComments();
  };
  text.append(saveButton);
  text.insertAdjacentHTML('beforeend', '&#32');
  let calcelButton = document.createElement('span');
  calcelButton.className = 'content_button';
  calcelButton.innerText = 'Отмена';
  calcelButton.onclick = () => {
    getComments();
  };
  text.append(calcelButton);
};

const deleteComment = (id) => {
  const commentBase = JSON.parse(localStorage['comments']);
  if (document.getElementById('sort_comment').value === 'Новые') commentBase.splice(commentBase.length - 1 - id, 1);
  else commentBase.splice(id, 1);
  localStorage['comments'] = JSON.stringify(commentBase);
  getComments();
};

const sendComment = () => {
  const commentText = document.getElementById('comment_text').value;
  const username = document.getElementById('comment_username').value;
  if (!(commentText && username)) {
    document.getElementById('error').hidden = false;
    return;
  } else {
    document.getElementById('error').hidden = true;
  }
  const comment = new Comment(username, commentText);
  comment.createDateCommnet();
  const commentBase = JSON.parse(localStorage['comments'] || '[]');
  commentBase.push(comment);
  localStorage['comments'] = JSON.stringify(commentBase);
  document.getElementById('comment_text').value = '';
  document.getElementById('comment_username').value = '';
  getComments();
};

const getComments = () => {
  const commentBase = JSON.parse(localStorage['comments'] || '[]');
  document.getElementById('count_comments').innerText = commentBase.length;
  if (document.getElementById('sort_comment').value === 'Новые') commentBase.reverse();
  let elems = '';
  for (let i = 0; i < commentBase.length; i += 1) {
    elems += `<div class="comment_block" id="${i}"><p><b>${commentBase[i].username}</b> ${commentBase[i].date} в ${commentBase[i].time}</p><p>${commentBase[i].text}</p><span class="content_button" onclick="editComments('${i}')">Ред.</span> <span class="content_button" onclick="deleteComment('${i}')">Удаление</span></div>`;
  }
  document.getElementById('comments').innerHTML = elems;
};

document.getElementById('send_comment').addEventListener('click', sendComment);
document.getElementById('sort_comment').addEventListener('change', getComments);

getComments();
