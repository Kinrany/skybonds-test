import * as React from "react";

/**
 * Replaces each number with the proportion of that number
 * relative to the sum of all numbers.
 * @param numbers An array of non-negative numbers represented as strings
 * @returns A new array of numbers represented as strings with
 * three digits after the floating point.
 */
export function getProportions(numbers: string[]): string[] {
  const parsed = numbers.map(parseFloat);
  if (parsed.some(Number.isNaN)) {
    throw new Error("All strings should be numbers.");
  }
  if (parsed.some(x => x < 0)) {
    throw new Error("All numbers should be non-negative.");
  }
  const sum = parsed.reduce((a, b) => a + b, 0);
  if (sum === 0) {
    return parsed.map(() => "0.000");
  }
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
    if (!numbers.map(parseFloat).some(Number.isNaN)) {
      setAbsolute(numbers);
    }
  };

  return (
    <div>
      <h2>Shared equity construction</h2>

      <div>
        <h3>Calculator</h3>
        <p>
          Absolute shares:
          <input
            onChange={e => onAbsoluteTextChange(e.target.value)}
            defaultValue={absolute.join(", ")}
          />
        </p>
        <p>Relative shares: {relative.join(", ")}</p>
      </div>

      <div>
        <h3>Commentary</h3>
        <p>Complexity: 3/10</p>
        <p>Estimated time: 15 minutes</p>
        <p>Actual time: 56 minutes</p>
        <p>
          Big O: <code>O(numbers.length)</code>, I/O bound
        </p>
        <p>Max input size for execution under 5 seconds (see tests): 10^6</p>
        <p>
          <a href="https://github.com/Kinrany/skybonds-test/blob/master/src/SharedEquity/SharedEquity.tsx#L10-L25">
            Source
          </a>
        </p>
        <p>
          <a href="https://github.com/Kinrany/skybonds-test/blob/master/src/SharedEquity/SharedEquity.test.ts">
            Tests
          </a>
        </p>
      </div>
    </div>
  );
}
