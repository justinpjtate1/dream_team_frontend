let apiUrl;
const apiUrls = {
    development: `http://localhost:3000`,
    production: `https://pure-plains-57513.herokuapp.com`
}

if(window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}

export default apiUrl;