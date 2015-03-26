var React = require('react');

var Button = React.createClass({
  handleClick: function() {
    console.log('i was clicked');
  },
  componentDidMount: function() {
    //window.addEventListener('click', this.handleClick);
  },
  componentWillUnmount: function() {
    console.log('i unmounted');
  },
  render: function() {
    console.log('im being rendered');
    return (
      <a href="#" className="waves-effect waves-button" onClick={this.handleClick}>{this.props.children}</a>
    );
  }
});

module.exports = Button;