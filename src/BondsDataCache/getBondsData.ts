interface Bond {
  isin: string;
  data: {
    price: number;
    interestRate: number;
  };
}

export async function getBondsData({
  // we're ignoring date for the same of the example, so this function
  // will not always return the same data for the same query
  isins,
}: {
  date: string;
  isins: string[];
}): Promise<Bond[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = isins.map(isin => ({
        isin,
        data: {
          price: Math.random() * 1000,
          interestRate: Math.random() * 10,
        },
      }));
      resolve(result);
    }, Math.random() * 1000);
  });
}
