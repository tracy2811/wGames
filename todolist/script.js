var todoList = {
	todos: [],
	add: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	del: function(pos) {
		this.todos.splice(pos, 1);
	},
	change: function(pos, todoText) {
		this.todos[pos].todoText = todoText;
	},
	toggle: function(pos) {
		var todo = this.todos[pos];
		if (typeof todo === 'undefined') {
			console.log('Invalid position');
		} else {
			todo.completed = !todo.completed;
		}
	},
	toggleAll: function() {
		var ncomplete = 0;
		var length = this.todos.length;

		this.todos.forEach(function(todo) {
			if (todo.completed) {
				++ncomplete;
			}
		});

		this.todos.forEach(function(todo) {
			todo.completed = !(ncomplete === length);
		});
	}
};

var handlers = {
	add: function() {
		var addInput = document.getElementById('add');
		todoList.add(addInput.value);
		addInput.value='';
		view.display();
	},
	change: function() {
		var changePosInput = document.getElementById('changePos');
		var changeTextInput = document.getElementById('changeText');
		todoList.change(changePosInput.valueAsNumber, changeTextInput.value);
		changePosInput.value = '';
		changeTextInput.value = '';
		view.display();
	},
	del: function(pos) {
		todoList.del(pos);
		view.display();
	},
	toggle: function(pos) {
		todoList.toggle(pos);
		view.display();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.display();
	}

};

var view = {
	display: function() {
		var todoUl = document.querySelector('ul');
		todoUl.innerHTML = '';
		todoList.todos.forEach(function(todo, pos) {
			var todoLi = document.createElement('li');
			todoLi.id = pos;
			todoLi.textContent = ((todo.completed) ? '(x) ' : '( ) ') + todo.todoText;
			todoLi.appendChild(this.createDelButton());
			todoLi.appendChild(this.createToggleButton());
			todoUl.appendChild(todoLi);
		}, this);
	},
	createDelButton: function() {
		var delButton = document.createElement('button');
		delButton.textContent = 'Delete';
		delButton.className = 'delButton';
		return delButton;
	},
	createToggleButton: function() {
		var toggleButton = document.createElement('button');
		toggleButton.textContent = 'Toggle';
		toggleButton.className = 'toggleButton';
		return toggleButton;
	},
	setEventListener: function() {
		var todoUl = document.querySelector('ul');
		todoUl.addEventListener('click', function(e) {
			var eClicked = e.target;
			if (eClicked.className === 'delButton') {
				handlers.del(parseInt(eClicked.parentNode.id));
			}
			if (eClicked.className === 'toggleButton') {
				handlers.toggle(parseInt(eClicked.parentNode.id));
			}
		});

	}
};

view.setEventListener();
/*
function runWithDebugger(ourFunction) {
	debugger;
	ourFunction();
}

setTimeout(function() {
	console.log('Wake up!');
}, 5000)
*/


