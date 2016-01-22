var ToDo = React.createClass({

  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
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
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.id !== this.props.id;
  },
  add: function() {
    var addToList = document.getElementById('newTodoToAdd').value;
    var toDoList = this.state.todos.concat([addToList])
    this.setState({todos: toDoList}, function() {
      this.forceUpdate();
    });
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
        <div>{this.state.todos}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <List/>,
  document.getElementById('react-container')
);

// every time {this.state.todos} changes, we want to rerender the page