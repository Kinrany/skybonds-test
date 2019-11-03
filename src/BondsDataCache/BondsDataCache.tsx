import * as React from "react";
import { Bond, getBondsData } from "./getBondsData";
// import { useAsync } from "react-async-hook";

export const createCachedGetBondsData = (
  getData: typeof getBondsData
): typeof getBondsData => {
  const cache = new Map<string, Promise<Bond>>();

  const key = ({ date, isin }: { date: string; isin: string }) =>
    `${date}-${isin}`;

  return ({ date, isins }) => {
    const newIsins = isins.filter(isin => !cache.has(key({ date, isin })));
    if (newIsins.length > 0) {
      const newBondsDataPromise = getData({ date, isins: newIsins });
      newIsins.forEach((isin, i) => {
        const bondDataPromise = newBondsDataPromise.then(newData => newData[i]);
        cache.set(key({ date, isin }), bondDataPromise);
      });
    }
    const bondDataPromises = isins.map(isin => cache.get(key({ date, isin }))!);
    return Promise.all(bondDataPromises);
  };
};

export function BondsDataCache() {
  const [getBondsDataCached] = React.useState(() =>
    createCachedGetBondsData(getBondsData)
  );

  const [date, setDate] = React.useState("20190101");
  const [isins, setIsins] = React.useState<string[]>([
    "XS0971721963",
    "RU000A0JU4L3",
  ]);
  // const bondsData = useAsync(() => getBondsDataCached({ date, isins }), [
  //   date,
  //   isins,
  // ]);
  const bondsData = {
    loading: undefined,
    error: undefined,
    result: [
      { isin: "XS0971721963", data: { price: 1234, interestRate: 53 } },
      { isin: "RU000A0JU4L3", data: { price: 342, interestRate: 2 } },
    ],
  };

  const onDateTextChange = (text: string) => {
    if (text.match(/\d{8}/)) {
      setDate(text);
    }
  };

  const onIsinsTextChange = (text: string) => {
    const isins = text.split(",").map(s => s.trim());
    if (isins.every(isin => isin.length === 12)) {
      setIsins(isins);
    }
  };

  return (
    <div>
      <h2>Cache for getBondsData</h2>

      <blockquote>
        I was going to provide a reactive UI for each problem as a bonus, but
        ran out of time.
      </blockquote>

      <div>
        <h3>Query</h3>
        <p>
          <label>Date: </label>
          <input
            onChange={e => onDateTextChange(e.target.value)}
            defaultValue={date}
          />
        </p>
        <p>
          <label>ISINs: </label>
          <input
            onChange={e => onIsinsTextChange(e.target.value)}
            defaultValue={isins.join(", ")}
          />
        </p>
      </div>

      <div>
        <h3>Data</h3>
        {bondsData.loading && "Loading..."}
        {bondsData.error && "Error!"}
        {bondsData.result && (
          <table>
            <thead>
              <tr>
                <th>ISIN</th>
                <th>Price</th>
                <th>Interest rate</th>
              </tr>
            </thead>
            <tbody>
              {bondsData.result.map(bond => (
                <tr key={bond.isin}>
                  <td>{bond.isin}</td>
                  <td>{bond.data.price}</td>
                  <td>{bond.data.interestRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h3>Commentary</h3>
        <p>Complexity: 4/10</p>
        <p>Estimated time: 1 hour</p>
        <p>Actual time: start at 21:38, 20 minutes</p>
        <p>
          Big O: for M pairs <code>(date, isin)</code> in cache and for a query
          with N isins, lookup time is <code>O(N * log(M))</code>
        </p>
        <p>
          <a href="">Source</a>
        </p>
      </div>
    </div>
  );
}
