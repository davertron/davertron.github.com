(function() {
    var searchForm = document.getElementById('search-form');
    var searchInput = document.getElementById('search');
    var results = document.getElementById('results');

    function getPhotoUrl(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    }

    function clearResults() {
        results.innerHTML = '';
    }

    function addPhoto(photo) {
        var photoUrl = getPhotoUrl(photo);
        var img = document.createElement('img');
        img.setAttribute('src', photoUrl);
        img.classList.add('photo');
        results.appendChild(img);
    }

    searchForm.onsubmit = function(e) {
        e.preventDefault();
        var searchValue = searchInput.value.trim();
        if (searchValue !== '') {
            fetch('https://api.flickr.com/services/rest/?api_key=662719defec5070ef19605af408ebef9&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&tags=' + searchValue)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    clearResults();
                    console.log(response);
                    response.json().then(function(json) {
                        json.photos.photo.forEach(addPhoto);
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    };
})();
