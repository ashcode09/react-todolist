var ToDo = React.createClass({

  render: function() {
    return (
      <li
        id=""
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
                  className="checkbox"
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






  remove: function() {
    var array = this.state.todos;
    var checkboxes = document.getElementsByClassName('checkbox');
    for (i=checkboxes.length-1; i>=0; i--) {
      if (checkboxes[i].checked) {
        array.splice(i, 1);
        if (i===0) {
          checkboxes[i].checked = false;
        };
      };
    };
    this.setState({todos: array});
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
        <input
          type="submit"
          value="Remove selected"
          onClick={this.remove} />
      </div>
    );
  }
});

ReactDOM.render(
  <List/>,
  document.getElementById('react-container')
);

// every time {this.state.todos} changes, we want to rerender the page