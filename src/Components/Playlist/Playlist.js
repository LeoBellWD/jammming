import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import App from '../App/App';


class Playlist extends React.Component{

	constructor(props){
	super(props);
	this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e) {
        let name = e.target.value;
        this.props.onNameChange(name);
    }

	render(){
		return (
			<div className="Playlist">
				<input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
				<TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} isRemoval={true}/>
				<a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
			</div>
		)
	}

}

export default Playlist;
