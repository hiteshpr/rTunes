import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'tag',
  templateUrl: `tag.component.html`,
  providers: [SpotifyService]
})
export class TagComponent implements OnInit{
	name: string;
	description: string;
	artists: Artist[];
	constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute) {}

	ngOnInit() {
		this._route.params.map(params => params['name']).subscribe((name) => {
			this._spotifyService.getTagInfo(name).subscribe(tInfo => {
				this.description = tInfo.tag.wiki.summary;
			})
			this._spotifyService.getTagArtists(name).subscribe(artists => {
				this.artists = artists.topartists.artist;
			})
			this.name = name;
		})
	}
}
