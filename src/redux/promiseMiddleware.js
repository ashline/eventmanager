export default function promiseMiddleware(getState) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(next, getState);
    }

    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = `${type}_SUCCESS`;
    const REQUEST = `${type}_REQUEST`;
    const FAILURE = `${type}_FAILURE`;

    next({ ...rest, type: REQUEST });

    return promise
      .then((response) => {
        next({
          ...rest,
          type: SUCCESS,
          response,
        });
        return Promise.resolve({ ...response });
      })
      .catch((response) => {
        next({
          ...rest,
          error: response,
          type: FAILURE,
        });
        return Promise.reject({
          ...response,
        });
      });
  };
}
