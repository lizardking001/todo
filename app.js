const displayTodos = (filter) => {
    // очищаем всё содержимое #todoList
    document.querySelector('#todoList').innerHTML = '';
    // перебираем массив todos
    todos.map((todo, index) => {

        // если передан фильтр, то проводим фильтрацию
        if ((filter === 'done-only' && !todo.isCompleted) ||
            (filter === 'undone-only' && todo.isCompleted)
        ) {
            return;
        }

        // создаем html элемент todoItem и добавляем в него html содержимое
        const todoItem = document.createElement('div');
        const checkedStatus = todo.isCompleted ? 'checked' : ''
        const todoItemInnerHtml = `
                    <div class='todo-list-item'>
                        <input class='todo-list-item-text' value='${todo.text}'>
                        <input type='checkbox' data-item-id='${index}' ${checkedStatus}>
                        <button class='todo-list-item-remove' data-item-id='${index}'>x</button>
                    </div>
                    `;
        todoItem.innerHTML = todoItemInnerHtml
        // добавляем сформированные элементы todoItem в #todoList
        document.querySelector('#todoList').append(todoItem);
    })
}


const addTodoItem = (event) => {
    event.preventDefault();
    const todoValue = document.querySelector('input.todo-add-form-input').value;
    const todo = {
        text: todoValue,
        isCompleted: false,
    };

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    displayTodos();

}

const deleteTodoItem = (event) => {
    if (event.target.className !== 'todo-list-item-remove') return;
    const todoItemId = event.target.getAttribute('data-item-id');

    todos.splice(todoItemId, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();

}

const changeTodoItemStatus = (event) => {
    if (event.target.type !== 'checkbox') return;
    const todoItemId = event.target.getAttribute('data-item-id');


    todos = todos.map((item, index) => {
        if (index == todoItemId) {
            return {
                ...item,
                isCompleted: event.target.checked,
            }
        }
        return item;
    })
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();

}

const filterHandler = (event) => {
    const filter = event.target.getAttribute('data-filter-value');
    currentListFilter = filter;
    displayTodos(filter);
}

// start
const app = document.querySelector('#app');

let todos = [];
const localStorageTodos = localStorage.getItem('todos');

if (localStorageTodos) {
    todos = JSON.parse(localStorageTodos);
    displayTodos();
};

document.querySelector('#todoAddForm').addEventListener('submit', addTodoItem)

document.querySelector('#todoList').addEventListener('click', deleteTodoItem)

document.querySelector('#todoList').addEventListener('click', changeTodoItemStatus)

document.querySelector('#filterButtons').addEventListener('click', filterHandler)