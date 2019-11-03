import React from "react";

export const increment = (count: number) => count + 1;
export const decrement = (count: number) => count - 1;

export function Counter() {
  const [count, setCount] = React.useState(3);

  return (
    <div>
      <button onClick={() => setCount(decrement(count))}>-</button>
      <span style={{ margin: 5 }}>{count}</span>
      <button onClick={() => setCount(increment(count))}>+</button>
    </div>
  );
}
