import * as React from "react";

/**
 * Replaces each number with the proportion of that number
 * relative to the sum of all numbers.
 * @param numbers An array of rational numbers represented as strings
 * @returns A new array of numbers represented as strings with
 * three digits after the floating point.
 */
export function getProportions(numbers: string[]): string[] {
  const parsed = numbers.map(parseFloat);
  const sum = parsed.reduce((sum, x) => sum + x, 0);
  const normalized = parsed.map(x => x / sum);
  const formatted = normalized.map(x => x.toFixed(3));
  return formatted;
}

export function SharedEquity() {
  const [absolute, setAbsolute] = React.useState(["1", "2", "3.5"]);
  const relative = getProportions(absolute);

  const onAbsoluteTextChange = (text: string) => {
    const numbers = text.split(",").map(s => s.trim());

    // ignore invalid inputs
    if (!numbers.map(parseFloat).some(isNaN)) {
      setAbsolute(numbers);
    }
  };

  return (
    <div>
      <h2>Shared equity construction</h2>

      <div>
        <h3>Calculator</h3>
        <p>
          <label>Absolute shares: </label>
          <input
            onChange={e => onAbsoluteTextChange(e.target.value)}
            defaultValue={absolute.join(", ")}
          />
        </p>
        <p>
          <label>Relative shares: </label>
          {relative.join(", ")}
        </p>
      </div>

      <div>
        <h3>Commentary</h3>
        <p>Complexity: 2/10</p>
        <p>Estimated time: 15 minutes</p>
        <p>Actual time: </p>
        <p>Big O: </p>
        <p>Max size (see tests): </p>
      </div>
    </div>
  );
}
