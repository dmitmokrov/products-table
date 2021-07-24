import React from 'react';
import PropTypes from 'prop-types';

const App = ({text}) => <p>{text}</p>;

App.propTypes = {
  text: PropTypes.string,
};

export default App;
