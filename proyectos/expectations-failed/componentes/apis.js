let wikiEndpoint = 'https://es.wikipedia.org/w/api.php?origin=*';

const parametrosWiki = {
  action: 'query',
  prop: 'extracts|pageimages',
  exintro: '',
  format: 'json',
  pithumbsize: '1200',
};

export function wiki(palabra) {
  const parametros = { ...parametrosWiki, ...{ titles: palabra } };
  let url = wikiEndpoint;

  Object.keys(parametros).forEach((key) => {
    url += `&${key}=${parametros[key]}`;
  });

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
