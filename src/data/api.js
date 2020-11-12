export const getCoordinators = () => {
  return fetch(
    "https://www.mocky.io/v2/5bcdd7992f00006300c855d5"
  ).then((response) => response.json());
};

export const getCategories = () => {
  return fetch(
    "https://www.mocky.io/v2/5bcdd3942f00002c00c855ba"
  ).then((response) => response.json());
};
