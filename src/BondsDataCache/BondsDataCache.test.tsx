import { createCachedGetBondsData } from "./BondsDataCache";
import { getBondsData } from "./getBondsData";

test("getBondsData should only be called once with the same query", () => {
  const bondData = { isin: "isin", data: { price: 123, interestRate: 12 } };

  const getBondsDataMock: typeof getBondsData = jest.fn(() =>
    Promise.resolve([bondData])
  );

  const getBondsDataCached = createCachedGetBondsData(getBondsDataMock);

  getBondsDataCached({ date: "date", isins: ["isin"] });
  getBondsDataCached({ date: "date", isins: ["isin"] });

  expect(getBondsDataMock).toHaveBeenCalledTimes(1);
});

test("Value returned by cached getBondsData should be the same as the original value", () => {
  const bondData = { isin: "isin", data: { price: 123, interestRate: 12 } };

  const getBondsDataMock: typeof getBondsData = jest.fn(() =>
    Promise.resolve([bondData])
  );

  const getBondsDataCached = createCachedGetBondsData(getBondsDataMock);

  const cachedBondData = getBondsDataCached({ date: "date", isins: ["isin"] });

  expect(cachedBondData).resolves.toStrictEqual(bondData);
});
