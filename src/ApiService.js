export default class ApiService {
  //http://127.0.0.1:8000/search-list/
  static FetchData() {
    return fetch("https://django-search-hist.herokuapp.com/search-list/", {
      //https://django-rest-api-01.herokuapp.com
      method: "GET",
      //method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
  static FetchSmartphone() {
    //http://127.0.0.1:8000/smartphone-list/
    return fetch("https://django-search-hist.herokuapp.com/smartphone-list/", {
      //https://django-rest-api-01.herokuapp.com
      method: "GET",
      //method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
  static FilterData(body) {
    //console.log(article_id, body)
    return fetch(`https://django-search-hist.herokuapp.com/search-list/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}
