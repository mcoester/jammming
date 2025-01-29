var client_id = 'b61ae48d795d4d7faae2e07d9b3ac88f';
var redirect_uri = 'http://localhost:3000';

var scope = 'playlist-modify-public playlist-modify-private user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';

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
    let indexOfEquals;
    let indexOfNextQuery; 
    let indexOfExpirationTime;
    if(hash.includes('access_token')){
        indexOfEquals = hash.indexOf('=');
        indexOfEquals = indexOfEquals + 1;
        indexOfNextQuery = hash.indexOf('&');
        access_token = hash.substring(indexOfEquals, indexOfNextQuery);
        indexOfExpirationTime = hash.indexOf('expires_in');
        indexOfEquals = hash.indexOf('=', indexOfExpirationTime);
        indexOfEquals = indexOfEquals + 1;
        /*indexOfNextQuery = hash.indexOf('&', indexOfExpirationTime);
        console.log(indexOfNextQuery);*/
        expiration_time = parseInt(hash.substring(indexOfEquals), 10);
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
    } else {
        return null;
    }  
}

const spotifyConnection = {
    connectWithSpotifyAuth: connectWithSpotifyAuth,
    getAccessToken: getAccessToken,
}
export default spotifyConnection;
