import * as React from "react";
import useAsync from "src/useAsync";
import DatePicker from "./DatePicker";
import getBondsData, { Bond } from "./getBondsData";

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

export function BondsDataCache(): JSX.Element {
  const [getBondsDataCached] = React.useState(() =>
    createCachedGetBondsData(getBondsData)
  );

  const [date, setDate] = React.useState("20190101");
  const [isins, setIsins] = React.useState<string[]>([
    "XS0971721963",
    "RU000A0JU4L3",
  ]);

  const getBondsDataCallback = React.useCallback(
    () => getBondsDataCached({ date, isins }),
    [date, getBondsDataCached, isins]
  );
  const bondsData = useAsync(getBondsDataCallback);

  const onIsinsTextChange = (text: string) => {
    const newIsins = text.split(",").map(s => s.trim());
    if (newIsins.every(isin => isin.length === 12)) {
      setIsins(newIsins);
    }
  };

  return (
    <div>
      <h2>Cache for getBondsData</h2>

      <div>
        <h3>Query</h3>
        <p>
          <DatePicker onDateChange={setDate} />
        </p>
        <p>
          ISINs:
          <input
            onChange={e => onIsinsTextChange(e.target.value)}
            defaultValue={isins.join(", ")}
            style={{ marginLeft: 5 }}
          />
        </p>
      </div>

      <div>
        <h3>Data</h3>
        {"loading" in bondsData && "Loading..."}
        {"err" in bondsData && "Error!"}
        {"ok" in bondsData && (
          <table>
            <thead>
              <tr>
                <th>ISIN</th>
                <th>Price</th>
                <th>Interest rate</th>
              </tr>
            </thead>
            <tbody>
              {bondsData.ok.map(bond => (
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
        <p>Actual time: 50 minutes</p>
        <p>
          Big O: for M pairs <code>(date, isin)</code> in cache and for a query
          with N isins, lookup time is <code>O(N * log(M))</code>
        </p>
        <p>
          <a href="https://github.com/Kinrany/skybonds-test/blob/master/src/BondsDataCache/BondsDataCache.tsx#L5-L25">
            Source
          </a>
        </p>
        <p>
          <a href="https://github.com/Kinrany/skybonds-test/blob/master/src/BondsDataCache/BondsDataCache.test.tsx">
            Tests
          </a>
        </p>
      </div>
    </div>
  );
}
