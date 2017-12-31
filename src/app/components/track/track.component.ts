import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../../../../Track';

@Component({
  moduleId: module.id,
  selector: 'track',
  templateUrl: `track.component.html`,
  providers: [SpotifyService]
})

export class TrackComponent implements OnInit{

	id: string;
	trackData: Track;
	rateArray: number[];
	pagedItems: any[];
	

	constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute) {}

	ngOnInit() {
		this._route.params.map(params => params['id']).subscribe((id) => {

			this._spotifyService.getTrackInfo(id).subscribe(tracks => {
				
				this.trackData = tracks.track;
				
				this.rateArray = new Array(this.findTrackRating());
				
			})			
		})
	}


	findTrackRating = function()
	{
		if(this.trackData.playcount >= 100000)
		{   
			return 5;
		}
		else if(this.trackData.playcount >= 50000)
		{
			return 4;
		}
		else if(this.trackData.playcount >= 10000)
		{
			return 3;
		}
		else if(this.trackData.playcount >= 5000)
		{
			return 2;
		}
		else if(this.trackData.playcount < 5000)
		{
			return 1;
		}
	}

}