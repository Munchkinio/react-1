import { useState } from 'react'

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

export default Counter;