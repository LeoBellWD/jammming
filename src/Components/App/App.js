import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

	const playlistName = 'playlist name';
	const playlistTracks = [
			{name: '1nameplaylistTracks',
			artist: '1artistplaylistTracks',
			album: '1albumplaylistTracks'
			},
			{name: '2nameplaylistTracks',
			artist: '2artistplaylistTracks',
			album: '2albumplaylistTracks'
			},
			{name: '3nameplaylistTracks',
			artist: '3artistplaylistTracks',
			album: '3albumplaylistTracks'
			}
			]

class App extends Component {

	constructor(props){
	super(props);
	this.state = {
		searchResults: [
			{name: '1namesearchResults',
			artist: '1artistsearchResults',
			album: '1albumsearchResults'
			},
			{name: '2namesearchResults',
			artist: '2artistsearchResults',
			album: '2albumsearchResults'
			},
			{name: '3namesearchResults',
			artist: '3artistsearchResults',
			album: '3albumsearchResults'
			}
			]
		}
	this.addTrack = this.addTrack.bind(this);
	this.removeTrack = this.removeTrack.bind(this);
	this.updatePlaylistName = this.updatePlaylistName.bind(this);
	this.savePlaylist = this.savePlaylist.bind(this);
	this.search = this.search.bind(this);
	}

	addTrack(track){
		let tracks = playlistTracks;
		if(!tracks.includes(tracks)){
			tracks.push(track);
			this.setState({
			playlistTracks: tracks
			});

		}
	}

	removeTrack(track) {
	 let tracks = this.state.playlistTracks;
	 if (tracks.includes(track)) {
		 let pos = tracks.indexOf(track);
		 tracks.splice(pos, 1);
		 this.setState({
			 playlistTracks: tracks
		 });
	 }
 	}



	updatePlaylistName(name) {
     let newPlaylistName = this.state.playlistName;
     if (newPlaylistName !== name) {
       this.setState({playlistName: newPlaylistName});
       console.log(this.playlistName);
     }
   }

	 savePlaylist(){

       const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
       Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>
       {
       this.setState({
         playlistName:'my playlist',
         searchResults:[]
         //searchResults: []
        });

       console.info(trackURIs);

       })
   }



   search(term){

		Spotify.search(term).then(tracks=>{
			this.setState({
				tracks:tracks
			})
		});
	}


	//	{tracks: {items: {[rest of data]}}}


  render() {
    return (
    <div>
		<h1>L<span className="highlight">e</span>o is Ja<span className="highlight">mmm</span>ing</h1>
		<div className="App">
			<SearchBar onSearch={this.search}/>
			<div className="App-playlist">
				<SearchResults onAdd={this.addTrack} searchResults={this.state.search} />
				<Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks ={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
			</div>
		</div>
	</div>
    );
  }
}

export default App;
