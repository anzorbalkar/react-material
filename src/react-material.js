require('./less/react-material.less');
require('script!./third_party/waves.js');

Waves.displayEffect({duration: 550});

module.exports = {
  Button: require('./js/button.jsx')
};