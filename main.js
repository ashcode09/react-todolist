var ToDo = React.createClass({

  render: function() {
    return (
      <li>
        {this.props.children}
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
    var toDoList = this.state.todos.concat([addToList])
    this.setState({todos: toDoList}, function() {
      document.getElementById('newTodoToAdd').value = "";
      this.forceUpdate();
    });
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
          type="text"
          value={this.state.newTodo} />
        <input
          type="submit"
          value="submit"
          onClick={this.add} />
        <ul>{this.state.todos.map(this.eachTodo)}</ul>
      </div>
    );
  }
});

ReactDOM.render(
  <List/>,
  document.getElementById('react-container')
);

// every time {this.state.todos} changes, we want to rerender the page