import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../../../Album';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from '../../services/pager.service';


@Component({
  moduleId: module.id,
  selector: 'album',
  templateUrl: `album.component.html`,
  providers: [SpotifyService]
})
export class AlbumComponent implements OnInit{
	id: string;
	album: Album;
	rateArray: number[];
	pager: any = {};
	pagedItems: any[];
	

	constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute, private _pagerService: PagerService) {}

	ngOnInit() {
		this._route.params.map(params => params['id']).subscribe((id) => {
			this._spotifyService.getAlbumInfo(id).subscribe(album => {
				this.album = album.album;
				this.rateArray = new Array(this.findAlbumRating());
				this.setPage(1);
			})			
		})
	}
	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._pagerService.getPager(this.album.tracks.track.length, page);
        this.pagedItems = this.album.tracks.track.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}

	findAlbumRating = function()
	{
		if(this.album.playcount >= 10000000)
		{
			return 5;
		}
		else if(this.album.playcount >= 5000000)
		{
			return 4;
		}
		else if(this.album.playcount >= 1000000)
		{
			return 3;
		}
		else if(this.album.playcount >= 500000)
		{
			return 2;
		}
		else if(this.album.playcount < 500000)
		{
			return 1;
		}
	}

}
