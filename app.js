//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', getCompleted);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    event.preventDefault();
    
    if(!todoInput.value.match(/\S/)){
        alert('Input field is empty.');
    }else{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
    
        todoDiv.appendChild(newTodo);
    
        saveTodos(todoInput.value, todoDiv);
    
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="bx bx-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="bx bx-x"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);
    
        todoList.appendChild(todoDiv);
        todoInput.value = '';
    }
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add('move-out');
        removeLocalTodos(todo);
        removeCompleted(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        if(!todo.classList[1]){
            todo.classList.add('completed');
            saveCompleted(todo);
        }else{
            todo.classList.remove('completed');
            removeCompleted(todo);
        }
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveCompleted(todo){
    let completed;
    if(localStorage.getItem('completed') === null){
        completed = [];
    }else{
        completed = JSON.parse(localStorage.getItem('completed'));
    }

    completed.push(todo.children[0].innerText);
    localStorage.setItem('completed', JSON.stringify(completed));
}

function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        todoDiv.appendChild(newTodo);

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="bx bx-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="bx bx-x"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
}

function getCompleted(){
    let todos;
    let completed;

    if(localStorage.getItem('todos') === null){
        todos = [];
        completed = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        completed = JSON.parse(localStorage.getItem('completed'));
    }

    for(i = 0; i < todos.length; i++){
        let todo = todoList.children[i];

        if(completed.includes(todo.innerText)){
            todo.classList.add('completed');
        }
    }
    //let todoListItems = todoList.children[0];
    //console.log(todoListItems);
}

function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeCompleted(todo){
    let completed;

    if(localStorage.getItem('completed') === null){
        completed = [];
    }else{
        completed = JSON.parse(localStorage.getItem('completed'));
    }

    const todoIndex = todo.children[0].innerText;
    completed.splice(completed.indexOf(todoIndex), 1);
    localStorage.setItem('completed', JSON.stringify(completed));
}