var ToDo = React.createClass({

  render: function() {
    return (
      <li
        className="to-do-component">
        <table>
          <tr>
            <td
              className="to-do-value">
              {this.props.children}
            </td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        </table>
      </li>
    );
  }
});




var List = React.createClass({
  getDefaultProps: function() {

  },
  getInitialState: function() {
    return {
      todos: []
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
  eachTodo: function(todo, i) {
    return (
      <ToDo
        key={i}>
        {todo}
      </ToDo>
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
          {this.state.todos.map(this.eachTodo)}
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