export function debounce(cb, delay = 200) {
  let tiempo = null;

  return (...args) => {
    const siguiente = () => {
      cb(...args);
      clearTimeout(tiempo);
      tiempo = setTimeout(siguiente, delay);
    };
  };
}
