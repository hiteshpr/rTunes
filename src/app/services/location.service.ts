import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService{

	private locationApi= 'freegeoip.net/json/';
	private searchUrl: string;
	
		constructor(private _http:Http){}

	userLocation(){
	
	this.searchUrl = 'http://'+this.locationApi;
		return this._http.get(this.searchUrl).map(res => res.json());
	}


}