const selectAllButton = document.querySelector('.select-all-button');
const form = document.querySelector('.new-todo-form');
const ul = document.querySelector('.todo-list');
const itemsCount = document.querySelector('.items-count');
const todoDisplayMode = document.querySelector('.radio-group-bot');
const radioButtons = document.getElementsByName('radio');
const clearButton = document.querySelector('.clear-button');

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value)
    const currCheckedRadioButtonId = getCheckedRadioButtonId();
    ul.appendChild(createLi(task));
    updateItemsCount(0);
    updateShownTodos(currCheckedRadioButtonId);
    this.reset();
}

function getCheckedRadioButtonId() {
    for (let i = 0; i < radioButtons.length; i++) {
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

function updateItemsCount(inactiveTodos) {
    const todosCount = document.querySelectorAll('li').length;
    itemsCount.textContent = `${todosCount - inactiveTodos} items left`;
}

function updateShownTodos(id) {
    const todosArray = document.getElementsByTagName('li');
    let currentInactiveTodos = 0;
    for (let i = 0; i < todosArray.length; i++) {
        const todoState = todosArray[i].firstChild.checked;
        if (id === 'radio-2' && todoState || id === 'radio-3' && !todoState) {
            todosArray[i].classList.add('hidden');
            currentInactiveTodos++;
        } else {
            todosArray[i].classList.remove('hidden');
        }
    }
    updateItemsCount(currentInactiveTodos);
}

function displayModeListener(e) {
    updateShownTodos(e.target.id);
}

function clearTasks() {
    const todosArray = document.getElementsByTagName('li');
    for (let i = todosArray.length - 1; i > -1; i--) {
        todosArray[i].remove();
    }
    updateItemsCount(0);
}

function getInputElementById(id) {
    const liList = document.getElementsByTagName('li');
    for (let i = 0; i < liList.length; i++) {
        const currentLi = liList[i];
        if (currentLi.querySelector('.checkbox').id === id) {
            return currentLi.querySelector('.todo-input');
        }
    }
}

function changeTodoTextStyle(evt) {
    if (evt.target.className !== 'checkbox') {
        return;
    }
    const checkboxState =  evt.target.checked;
    const currentInputTodoElement = getInputElementById(evt.target.id);
    if (checkboxState) {
        currentInputTodoElement.classList.add('checked-crossed-todo');
    } else {
        currentInputTodoElement.classList.remove('checked-crossed-todo');
    }
}

ul.addEventListener('click', changeTodoTextStyle);
form.addEventListener('submit', addTask);
selectAllButton.addEventListener('click', selectAll);
todoDisplayMode.addEventListener('click', displayModeListener);
clearButton.addEventListener('click', clearTasks);