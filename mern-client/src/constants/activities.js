import { getRandomIntInclusive } from "../utils/random";

export const activities = {
    climbing: () => ({
      strength: 10,
      intelligence: 10,
      energy: -20,
      hunger: getRandomIntInclusive(-10, -20)
    }),
    running: {
      strength: 5,
      intelligence: 5
    },
    swimming: {
      strength: 8,
      intelligence: 7
    },
  };
  