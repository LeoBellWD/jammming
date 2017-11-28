const clientId = '8cb0a3741842408b9a1f1213a5ae8e6e';
const redirectURI = 'http://localhost:3000/';
let accessToken = null;


export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(
        resolve => resolve(accessToken)
      );
    } else {
      const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
      const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenCheck && expiresInCheck) {
        accessToken = accessTokenCheck;
        const expiresIn = expiresInCheck;
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI;
      }

      return new Promise(
        resolve => resolve(accessToken)
      );
    }
  },

  search(term) {
    return Spotify.getAccessToken().then( () => {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`
	  , {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(
        response => response.json()
      ).then(
        jsonResponse => {
          if (jsonResponse.tracks) {
            return jsonResponse.tracks.items.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              };
            });
          }

      }
      )
    })
  },

  savePlaylist(playlistName,trackURIs){
		if(playlistName && trackURIs){
			const currentUserAccessToken = accessToken;
			const headers = {Authorization: window.location.href.match(/access_token=([^&]*)/)};
			const userID = null;
			fetch('https://api.spotify.com/v1/me',{headers: headers}).then(response => {
			if (response.ok){
			return response.json();
			}
			throw new Error('Request failed!');
			}, networkError => console.log(networkError.message)
			).then(jsonResponse => {
				const userID = jsonResponse.id;
			});

			fetch('https://api.spotify.com/v1/users/{user_id}/playlists', {
			headers: headers,
			method: 'POST',
			body: JSON.stringify({id: '200'})
			}).then(response => {
			if (response.ok) {
			return response.json();
			}
			throw new Error('Request failed!');
			}, networkError => console.log(networkError.message)
			).then(jsonResponse => {
				const playlistID = jsonResponse.id;
			});




		}
		else{
		return playlistName && trackURIs;
		}
  }

  };

export default Spotify;
