const form = document.querySelector('.new-todo-form');
const ul = document.querySelector('.todo-list');
const selectAllButton = document.querySelector('.select-all-button');
const itemsCount = document.querySelector('.items-count');
const todoDisplayMode = document.querySelector('.radio-group-bot');
const clearButton = document.querySelector('.clear-button');
let todosCount = 0;

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value)
    todosCount++;
    const currCheckedRadioButtonId = getCheckedRadioButtonId();
    ul.appendChild(createLi(task));
    updateShownTodos(currCheckedRadioButtonId);
    this.reset();
}

function getCheckedRadioButtonId() {
    const radioButtons = document.getElementsByName('radio');
    for (let i = 0; i < radioButtons.length; i++) {
        console.log();
        if (radioButtons[i].checked) {
            return radioButtons[i].id;
        }
    }
}

function createTask(description) {
    return {
        id: Date.now(),
        description: description
    }
}

/**
 * @param task {{id: string | number, description: string}}
 */
function createLi(task) {
    const li = document.createElement('li');
    li.className = 'todo-elem';

    const inputCheckbox = document.createElement('input');
    inputCheckbox.id = task.id;
    inputCheckbox.className = 'checkbox';
    inputCheckbox.type = 'checkbox';
    li.appendChild(inputCheckbox);

    const label = document.createElement('label');
    label.className = 'new-checkbox';
    label.htmlFor = task.id;
    const changeTextStyle = () => {
        if (!inputCheckbox.checked) {
            inputTodo.classList.add('checked-crossed-todo');
        } else {
            inputTodo.classList.remove('checked-crossed-todo');
        }
    }
    label.addEventListener('click', changeTextStyle);
    li.appendChild(label);

    const inputTodo = document.createElement('input');
    inputTodo.className = 'todo-input';
    inputTodo.type = 'text';
    inputTodo.value = task.description;
    li.appendChild(inputTodo);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.ariaLabel = 'close button';
    const deleteTask = () => {
        removeButton.removeEventListener('click', deleteTask);
        li.remove();
        todosCount--;
        const currCheckedRadioButtonId = getCheckedRadioButtonId();
        updateShownTodos(currCheckedRadioButtonId);
    }
    removeButton.addEventListener('click', deleteTask);
    li.appendChild(removeButton);

    return li;
}

function selectAll() {
    const todosArray = document.getElementsByTagName('li');
    for (let i = 0; i < todosArray.length; i++) {
        todosArray[i].firstChild.checked = true;
    }
}

function updateShownTodos(id) {
    const todosArray = document.getElementsByTagName('li');
    let currTodosCounter = 0;
    for (let i = 0; i < todosArray.length; i++) {
        const todoState = todosArray[i].firstChild.checked;
        if (id === 'radio-2' && todoState || id === 'radio-3' && !todoState) {
            todosArray[i].style.display = "none";
            currTodosCounter++;
        } else {
            todosArray[i].style.display = "flex";
        }
    }
    itemsCount.textContent = `${todosCount - currTodosCounter} items left`;
}

function displayModeListener(e) {
    updateShownTodos(e.target.id);
}

function clearTasks() {
    const todosArray = document.getElementsByTagName('li');
    for (let i = todosArray.length - 1; i > -1; i--) {
        todosArray[i].remove();
    }
    todosCount = 0;
    itemsCount.textContent = `${todosCount} items left`;
}

form.addEventListener('submit', addTask);
selectAllButton.addEventListener('click', selectAll);
todoDisplayMode.addEventListener('click', displayModeListener);
clearButton.addEventListener('click', clearTasks);