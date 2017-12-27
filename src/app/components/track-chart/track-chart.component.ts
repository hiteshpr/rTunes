import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-track-chart',
  templateUrl: './track-chart.component.html',
  styleUrls: ['./track-chart.component.css'],
  providers: [SpotifyService]
})
export class TrackChartComponent implements OnInit {

	tracksInfo:string[];

  constructor(private _spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.tracksChart();
  }


  tracksChart(){

  		this._spotifyService.getTrackChart().subscribe(res => {
			
			this.tracksInfo=res.tracks.track;
			console.log(this.tracksInfo);
		});
	}



}
