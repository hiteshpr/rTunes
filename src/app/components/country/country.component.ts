import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';

@Component({
  moduleId: module.id,
  selector: 'country',
  templateUrl: `country.component.html`,
  providers: [SpotifyService]
})
export class CountryComponent {
	searchQuery: string;
	searchRes: Artist[];
	constructor(private _spotifyService:SpotifyService) {}
	searchCountry() {
		this._spotifyService.searchCountry(this.searchQuery).subscribe(res => {
			this.searchRes = res.topartists.artist;
		})
	}
}