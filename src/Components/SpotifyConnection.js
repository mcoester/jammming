var client_id = 'b61ae48d795d4d7faae2e07d9b3ac88f';
var redirect_uri = 'http://localhost:3000';

var scope = 'playlist-modify-public';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

const connectWithSpotifyAuth = () =>{
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    window.location.href = url;    
}

const getAccessToken = () =>{
    const hash = window.location.hash.substring(1);
    let authorizationValues;
    let access_token;
    let expiration_time;
    let error;
    if(hash.includes('access_token')){
        let indexOfEquals = hash.indexOf('=');
        indexOfEquals = indexOfEquals + 1;
        let indexOfNextQuery = hash.indexOf('&');
        access_token = hash.substring(indexOfEquals, indexOfNextQuery);
        indexOfEquals = hash.indexOf('=', hash.indexOf('expires_in'));
        indexOfEquals = indexOfEquals + 1;
        indexOfNextQuery = hash.indexOf('&', hash.indexOf('expires_in'));
        expiration_time = parseInt(hash.substring(indexOfEquals, indexOfNextQuery), 10);
        authorizationValues = {
            access_token: access_token,
            expiration_time : expiration_time,
        }
        return authorizationValues;
    } else if(hash.includes('error')) {
        indexOfEquals = hash.indexOf('=');
        indexOfEquals = indexOfEquals + 1;
        indexOfNextQuery = hash.indexOf('&');
        error = hash.substring(indexOfEquals, indexOfNextQuery);
        return error;
    }
}

const spotifyConnection = {
    connectWithSpotifyAuth: connectWithSpotifyAuth,
    getAccessToken: getAccessToken,
}
