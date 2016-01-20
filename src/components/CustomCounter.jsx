import React, { Component, PropTypes } from 'react';
import { Counter } from './Counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { multireducerBindActionCreators } from 'multireducer';
import * as CounterActions from 'redux-base/modules/counter';
import * as CustomCounterActions from 'redux-base/modules/customCounter';

const customActions = {
  hello: () => {
    console.log('hello');

    return {
      type: 'HELLO_ACTION'
    };
  }
};

const mapStateToProps = (state) => {
  return {
    counter: state.someCustomCounter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(customActions, dispatch),
    ...multireducerBindActionCreators('customCounter', { ...CounterActions, ...CustomCounterActions }, dispatch)
  };
};

class CustomCounter extends Component {
  render() {

    const { increment100, decrement100Async, hello, ...restProps } = this.props;

    return (
      <div>
        Custom counter
        <Counter { ...restProps } />
        <button onClick={increment100}>+100</button>
        <button onClick={decrement100Async}>-100</button>
        <button onClick={hello}>HELLO action</button>
      </div>
    );
  }
}

CustomCounter.propTypes = {
  increment100: PropTypes.func.isRequired,
  decrement100Async: PropTypes.func.isRequired,
  hello: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomCounter);