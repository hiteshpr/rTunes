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
	private topArtistUrl:string;
	private topTracksUrl:string;
	apiToken = environment.apiToken;

	constructor(private _http:Http){}
	searchArtist(str: string, limit: number){
		this.searchUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+str+'&api_key='+this.apiToken+'&format=json&limit='+limit;
		return this._http.get(this.searchUrl).map(res => res.json());
	}

	getArtistInfo(name: string){
		this.artistUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+name+'&api_key='+this.apiToken+'&format=json';
		return this._http.get(this.artistUrl).map(res => res.json());
	}

	searchAlbum(str: string, limit: number){
		this.searchUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.search&album='+str+'&api_key='+this.apiToken+'&format=json&limit='+limit;
		return this._http.get(this.searchUrl).map(res => res.json());
	}

	getAlbums(name: string, limit: number){
		this.albumsUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='+name+'&api_key='+this.apiToken+'&format=json&limit='+limit;
		return this._http.get(this.albumsUrl).map(res => res.json());
	}

	getAlbumInfo(mbid: string){
		this.albumUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid='+mbid+'&api_key='+this.apiToken+'&format=json';
		return this._http.get(this.albumUrl).map(res => res.json());
	}

	searchTrack(str: string, limit: number){
		this.searchUrl = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+str+'&api_key='+this.apiToken+'&format=json&limit='+limit;
		return this._http.get(this.searchUrl).map(res => res.json());
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

	 getTopArtists(country:string){
    
    this.topArtistUrl = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country='+ country +'&api_key='+this.apiToken+'&format=json&limit=15';
    
    return this._http.get(this.topArtistUrl).map(res => res.json());

  }

   getTopTracks(country:string){
    
    this.topTracksUrl = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+ country +'&api_key='+this.apiToken+'&format=json&limit=15';
    
    return this._http.get(this.topTracksUrl).map(res => res.json());

  }

}
