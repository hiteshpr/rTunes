import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';
import { Album } from '../../../../Album';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from '../../services/pager.service';


@Component({
  moduleId: module.id,
  selector: 'artist',
  templateUrl: `artist.component.html`,
  providers: [SpotifyService]
})
export class ArtistComponent implements OnInit{
	name: string;
	artist: Artist;
	albums: Album[];
	rateArray: any[];
	pager: any = {};
	pagedItems: any[];
	

	constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute, private _pagerService: PagerService) {}
	ngOnInit() {
		this._route.params.map(params => params['name']).subscribe((name) => {
			this._spotifyService.getArtistInfo(name).subscribe(artist => {
				this.artist = artist.artist;
				this.rateArray = new Array(this.findArtistRating());
			})
			this._spotifyService.getAlbums(name,200).subscribe(albums => {
				this.albums = albums.topalbums.album;
				this.setPage(1);
			})
		})
	}

	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._pagerService.getPager(this.albums.length, page);
        this.pagedItems = this.albums.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}
	
	findArtistRating = function()
	{
		if(this.artist.stats.playcount >= 10000000)
		{
			return 5;
		}
		else if(this.artist.stats.playcount >= 5000000)
		{
			return 4;
		}
		else if(this.artist.stats.playcount >= 1000000)
		{
			return 3;
		}
		else if(this.artist.stats.playcount >= 500000)
		{
			return 2;
		}
		else if(this.artist.stats.playcount < 500000)
		{
			return 1;
		}
	}


}
