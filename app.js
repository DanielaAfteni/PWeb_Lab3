window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || ''
	nameInput.value = username;
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})


	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
		
		// if(e.target.elements.content.value == null) {
		// 	alert("Please fill out the new task!");
		// 	return;
		// } 

		const todo = {
			content: e.target.elements.content.value,
			importance: e.target.elements.importance.value,
			done: false,
			createdAt: new Date().getTime()
		}


		if(todo.content =="") {
			alert("Please fill out the new task!");
			return;
		} 

		// add new todo to todos array
        todos.push(todo)
		// sort the todo items by created date
        sorted_todos = todos.sort(function(a, b) {
            return b.createdAt - a.createdAt
        });

		// sorted_todos1 = sorted_todos.sort(function(c, d) {
        //     return Number(d.done) - Number(c.done)
        // });

		// save the sorted_todos to localStorage       
		// localStorage.setItem('todos', JSON.stringify(todos));  < - - - the original code
		localStorage.setItem('todos', JSON.stringify(sorted_todos));

		// todos.push(todo);

		// localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	const filterDone = document.querySelector('#filter-done');
	const filterToDo = document.querySelector('#filter-to-do');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.importance == 'important') {
			span.classList.add('important');
		} else if (todo.importance == 'urgent') {
			span.classList.add('urgent');
		} else {
			span.classList.add('notimportant');
		}

		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			DisplayTodos()
		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

		filterDone.addEventListener('click', (e) => {
			todos = todos.sort(todo => todo.done != true);
			// todos = todos.sort(todo => {
			// 	if (todo.done == true) {
			// 		todo.style.display = "none";
			// 	}
			// });
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

		filterToDo.addEventListener('click', (e) => {
			todos = todos.sort(todo => todo.done == true);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})


	})

}