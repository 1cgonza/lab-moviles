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

export const map = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
