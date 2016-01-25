var ToDo = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    }
  },

  edit: function() {
    console.log(this.state.editing)
    this.setState({editing: true});
  },

  save: function() {
    this.setState({editing: false});
  },

  renderEditing: function() {
    return (
      <li
        className="to-do-component">
        <table>
          <tbody>
            <tr>
              <td
                className="to-do-value">
                <input
                  type="text"
                  value={this.props.children} />
                <input
                  type="submit"
                  value="Save"
                  onClick={this.save} />
              </td>
              <td>
                <input
                  className="checkbox"
                  type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  },

  render: function() {
    if (this.state.editing === true) {
      return this.renderEditing();
    } else {
      return (
        <li
          className="to-do-component">
          <table>
            <tbody>
              <tr>
                <td
                  className="to-do-value">
                  {this.props.children}
                  <input
                    type="submit"
                    value="Edit"
                    onClick={this.edit} />
                </td>
                <td>
                  <input
                    className="checkbox"
                    type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      );
    };
  }
});

var CompleteToDos = React.createClass({
  render: function() {
    return (
      <li
        className="to-do-component">
        <table>
          <tbody>
            <tr>
              <td
                className="to-do-value">
                {this.props.children}
              </td>
              <td>
                <input
                  className="completedCheckbox"
                  type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  }
});

var List = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      completedTodos: []
    };
  },
  add: function() {
    var addToList = document.getElementById('newTodoToAdd').value;
    if (addToList !== "") {
      var toDoList = this.state.todos.concat([addToList])
      this.setState({todos: toDoList}, function() {
        document.getElementById('newTodoToAdd').value = "";
        this.forceUpdate();
      });
    };
  },
  markComplete: function() {
    var completedTasks = this.state.completedTodos, currentToDos = this.state.todos, checkboxes = document.getElementsByClassName('checkbox');
    for (i=checkboxes.length-1; i>=0; i--) {
      if (checkboxes[i].checked) {
        completedTasks.push(currentToDos[i]);
        currentToDos.splice(i, 1);
        checkboxes[i].checked = false;
      };
    };
    this.setState({completedTodos: completedTasks});
    this.setState({todos: currentToDos});
  },
  removeFromToDoAndCompleted: function(checkboxVarName, stateToUpdate, newState) {
    for (i=checkboxVarName.length-1; i>=0; i--) {
      if (checkboxVarName[i].checked) {
        newState.splice(i, 1);
        checkboxVarName[i].checked = false;
      };
    };
    this.setState({stateToUpdate: newState});
  },
  remove: function() {
    var currentToDos = this.state.todos, currentCompletedTodos = this.state.completedTodos, checkboxes = document.getElementsByClassName('checkbox'), completedCheckboxes = document.getElementsByClassName('completedCheckbox');
    this.removeFromToDoAndCompleted(checkboxes, 'todos', currentToDos);
    this.removeFromToDoAndCompleted(completedCheckboxes, 'completedTodos', currentCompletedTodos);
  },
  eachTodo: function(todo, i) {
    return (
      <ToDo
        key={i}>
        {todo}
      </ToDo>
    );
  },
  eachCompleted: function(completeItem, i) {
    return (
      <CompleteToDos
        key={i}>
        {completeItem}
      </CompleteToDos>
    );
  },
  render: function() {
    return (
      <div>
        <input
          id="newTodoToAdd"
          type="text" />
        <input
          type="submit"
          value="Add"
          onClick={this.add} />
        <ul>
          Still to Do
          {this.state.todos.map(this.eachTodo)}
        </ul>
        <input
          type="submit"
          value="Remove selected"
          onClick={this.remove} />
        <input
          type="submit"
          value="Mark as complete"
          onClick={this.markComplete} />
        <ul>
          Completed
          {this.state.completedTodos.map(this.eachCompleted)}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(
  <List/>,
  document.getElementById('react-container')
);

// every time {this.state.todos} changes, we want to rerender the page