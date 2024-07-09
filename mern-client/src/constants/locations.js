import { getRandomIntInclusive } from "../utils/random";

export const locations = {
    beach: () => ({
      rewards: {
        fish: getRandomIntInclusive(5, 10),
        shells: getRandomIntInclusive(5, 10),
        treasure: getRandomIntInclusive(5, 10)
      },
      energy: -10
    })
  };
  