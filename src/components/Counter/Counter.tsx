/*import { useState } from 'react'

type CountProps = {
  count: number;
}

function Counter({count}: CountProps) {
  const [value, setValue] = useState(count);

  return (
      <section>
        Component count is {value}
        <button onClick={() => setValue(v => v-1)}>Sub</button>
        <button onClick={() => setValue(v => v+1)}>Add</button>
      </section>
  );
}

export default Counter;*/

import React from 'react';

type CounterProps = {
  count: number;
};

type CounterState = {
  value: number;
};

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = { value: props.count };
  }

  handleDecrement = () => {
    this.setState(prev => ({ value: prev.value - 1 }));
  };

  handleIncrement = () => {
    this.setState(prev => ({ value: prev.value + 1 }));
  };

  render() {
    return React.createElement(
      'section',
      null,
      `Component count is ${this.state.value}`,
      React.createElement('button', { onClick: this.handleDecrement }, 'Sub'),
      React.createElement('button', { onClick: this.handleIncrement }, 'Add'),
    );
  }
}

export default Counter;