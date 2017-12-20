import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';
import { Album } from '../../../../Album';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from '../../services/pager.service';
import { DOCUMENT } from "@angular/platform-browser";

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
	navIsFixed: boolean;

	constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute, private _pagerService: PagerService, @Inject(DOCUMENT) private document: Document) {}
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

	//Functionality for scroll
	@HostListener("window:scroll", [])
    	onWindowScroll() {
        	if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 200) {
            	this.navIsFixed = true;
        	} else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; } } scrollToTop() { (function smoothscroll() { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
            	    window.requestAnimationFrame(smoothscroll);
	                window.scrollTo(0, currentScroll - (currentScroll / 5));
    	        }
        	})();
    	}
}
