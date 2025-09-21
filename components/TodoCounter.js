class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment == true) {
      ++this._completed;
    } else {
      --this._completed;
    }

    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment == false) {
      --this._total;
    } else {
      ++this._total;
    }

    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
