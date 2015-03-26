require('./react-material-docs.less');

var React = require('react');
var Button = require('react-material').Button;

var TodoList = React.createClass({
  render: function() {
    var lulz=100;
    var createItem = function(itemText) {
      itemText = 'im a button: ' + itemText;
      ++lulz;
      return <li key={lulz}><Button>{itemText}</Button></li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

var resolveRoute = function() {
  
  if (!location.hash || location.hash.length === 1) {
    React.render(<TodoApp />, document.getElementById('app'));
    //React.render(<Button>lulz</Button>, document.getElementById('app'));
  } else if (location.hash === '#button') {
      React.render(<Button>im a button</Button>, document.getElementById('app'));
  }
};

window.onhashchange = resolveRoute;
resolveRoute();