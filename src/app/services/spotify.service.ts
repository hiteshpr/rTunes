import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { environment } from './../../environments/environment.js';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService{
	private searchUrl: string;
	private artistUrl: string;
	private albumsUrl: string;
	private albumUrl: string;
	private countryUrl: string;
	private tagUrl: string;
	private tagArtistsUrl: string;

	apiToken = environment.apiToken;

	constructor(private _http:Http){}
	searchArtist(str: string){
		this.searchUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+str+'&api_key='+this.apiToken+'&format=json&limit=10';
		return this._http.get(this.searchUrl).map(res => res.json());
	}

	getArtistInfo(name: string){
		this.artistUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+name+'&api_key='+this.apiToken+'&format=json';
		return this._http.get(this.artistUrl).map(res => res.json());
	}

	getAlbums(name: string){
		this.albumsUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='+name+'&api_key='+this.apiToken+'&format=json&limit=10';
		return this._http.get(this.albumsUrl).map(res => res.json());
	}

	getAlbumInfo(mbid: string){
		this.albumUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid='+mbid+'&api_key='+this.apiToken+'&format=json';
		return this._http.get(this.albumUrl).map(res => res.json());
	}
  
	searchCountry(country: string){
		this.countryUrl = 'http://		ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country='+country+'&api_key='+this.apiToken+'&format=json';
		return this._http.get(this.countryUrl).map(res => res.json());
	}

	getTagInfo(tag: string){
		this.tagUrl = 'http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag='+tag+'&api_key='+this.apiToken+'&format=json';
		return this._http.get(this.tagUrl).map(res => res.json());
	}

	getTagArtists(tag: string){
		this.tagArtistsUrl = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='+tag+'&api_key='+this.apiToken+'&format=json&limit=10';
		return this._http.get(this.tagArtistsUrl).map(res => res.json());
	}
}