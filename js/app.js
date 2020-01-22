// Select elements
const clearStorage = document.querySelector('.clear-storage'), 
      dateElement = document.querySelector('.date'), 
      timeElement = document.querySelector('.time p'),
      dotsElement = document.querySelector('.dots'),
      listElement = document.querySelector('.list-items'),
      inputElement = document.querySelector('.input');

// Class names to be toggled or added
const check = 'fa-check-circle';
const unCheck = 'fa-circle';
const lineThrough = 'line_through';
const fas = 'fas';
const far = 'far';

let listArr = [];
let id = 0;
let data = localStorage.getItem('TODO');

if(data){
  listArr = JSON.parse(data);
  id = listArr.length;
  loadList(listArr);
}else{
  listArr = [];
  id = 0;
}

function loadList(array){
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
};

clearStorage.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

function showDateTime() {
  function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  };

  const options = {weekday: 'long', month:'long', day:'numeric'}; 
  
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes();

  setTimeout(showDateTime, 1000);

  dateElement.innerHTML = today.toLocaleDateString('en-US', options);
  timeElement.innerHTML = `${addZero(hour)} ${addZero(min)}`;

  function dotBlink() {
    if (dotsElement.style.opacity == '1') {
      dotsElement.style.opacity = '0';
    } else {
      dotsElement.style.opacity = '1';
    }
  };
  dotBlink();
};

showDateTime();

function addToDo(toDo, id, done, trash) {
  if(trash) { return; }

  let isDone = done;
  let pre = ''
  let line = '';

  if(isDone) {
    isDone = check;
    pre = fas;
    line = lineThrough;
  } else {
    isDone = unCheck;
    pre = far;
    line = '';
  }

  const position = 'beforeend';
  const item = ` 
  <li class="item">
  <i class="${pre} ${isDone} co" job="complete" id="${id}"></i>
  <p class="text ${line}">${toDo}</p>
  <i class="far fa-trash-alt de" job="delete" id="${id}"></i>
</li>
  `;
  
  listElement.insertAdjacentHTML(position, item);
};

document.addEventListener('keyup', function(even) {
  if(event.keyCode == 13) {
    const toDo = inputElement.value;
    if(toDo) {
      addToDo(toDo, id, false, false);

      listArr.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      localStorage.setItem('TODO', JSON.stringify(listArr));
      id++;
    };

    inputElement.value = '';
  };
});

localStorage.setItem('TODO', JSON.stringify(listArr));

function completeToDo(element) {
  element.classList.toggle(check);
  element.classList.toggle(fas);
  element.classList.toggle(unCheck);
  element.classList.toggle(far);
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);

  listArr[element.id].done = listArr[element.id].done ? false : true;
};

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listArr[element.id].trash = true;
};

listElement.addEventListener('click', function(event){
  const element = event.target; 
  const elementJob = element.attributes.job.value;

  if(elementJob == 'complete') {
  completeToDo(element);
  } else if(elementJob == 'delete'){
    removeToDo(element);
  }  

  localStorage.setItem('TODO', JSON.stringify(listArr));
});