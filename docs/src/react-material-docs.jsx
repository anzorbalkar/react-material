//require('./index.html');
//require('!file?name=[name].css!../../build/react-material.css');
require('./react-material-docs.less');

var React = require('react');
var Button = require('react-material').Button;

var resolveRoute = function() {
  
  if (!location.hash || location.hash.length === 1) {
    React.render(<Button>lulz</Button>, document.getElementById('app'));
  } else if (location.hash === '#button') {
      React.render(<Button>Hello admin!</Button>, document.getElementById('app'));
  }
};

window.onhashchange = resolveRoute;
resolveRoute();