const fetchAPI = function (value, number) {
  const options = {
    headers: {
      API_KEY: '22346154-3962a348b9ad97506a5be6443',
    },
  };
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${number}&per_page=12&key=${options.headers.API_KEY}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`По запросу ${value} ничего не найдено (this is in reject)`),
    );
  });
};

export default fetchAPI;
