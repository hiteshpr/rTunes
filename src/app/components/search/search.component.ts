import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';
import { PagerService } from '../../services/pager.service';
import { NgxCarousel } from 'ngx-carousel'; 
import { LocationService } from '../../services/location.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: `search.component.html`,
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService]
})
export class SearchComponent {
	searchQuery: string;
	searchCategory: string;
	searchRes: Artist[];
	artistImgags: string[];
	tracksImages:string[];
	pager: any = {};
	pagedItems: any[];
	userCountry:string;
	artistRes: Artist [];
	tracksRes:any;
	public carouselTileOneItems: Array<any> = [];
	public carouselTileTwoItems: Array<any> = [];
  	public carouselTileOne: NgxCarousel;

	constructor(private _spotifyService:SpotifyService, private _pagerService: PagerService, private _locationService:LocationService) {}

	searchArtist() {
		if(this.searchQuery != undefined && this.searchQuery != '')
		{
			this._spotifyService.searchArtist(this.searchQuery,200).subscribe(res => {
				this.searchRes = res.results.artistmatches.artist;
				this.setPage(1);
			})
		}
	}
	searchTrack() {
		if(this.searchQuery != undefined && this.searchQuery != '')
		{
			this._spotifyService.searchTrack(this.searchQuery,200).subscribe(res => {
				this.searchRes = res.results.trackmatches.track;
				this.setPage(1);
			})
		}
	}
	searchAlbum() {
		if(this.searchQuery != undefined && this.searchQuery != '')
		{
			this._spotifyService.searchAlbum(this.searchQuery,200).subscribe(res => {
				this.searchRes = res.results.albummatches.album;
				this.setPage(1);
			})
		}
	}
	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._pagerService.getPager(this.searchRes.length, page);
        this.pagedItems = this.searchRes.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}
	searchBasedOnCategory(category: string) {
		if(category != '')
		{
			this.searchCategory = category;
		}
		if(this.searchCategory == "Album")
		{
			this.searchAlbum();
		}
		else if(this.searchCategory == "Track")
		{
			this.searchTrack();
		}
		else if(this.searchCategory == "Artist")
		{
			this.searchArtist();
		}
	}

	ngOnInit() {
    this.artistImgags = [];
    this.tracksImages=[];

    this.carouselTileOne = {
      grid: { xs: 2, sm: 3, md: 4, lg: 6, all: 0 },
      speed: 800,
      interval: 3500,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            background: #6b6b6b;
            padding: 5px;
            margin: 0 3px;
            transition: .4s;
          }
          .ngxcarouselPoint li.active {
              border: 2px solid rgba(0, 0, 0, 0.55);
              transform: scale(1.2);
              background: transparent;
            }
        `
      },
      load: 2,
      loop: true,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };
     //this.carouselTileOneLoad();
     this.userLocation();
 }

  /* Getting User country*/
  userLocation(){

  	this._locationService.userLocation().subscribe(res => {
			this.userCountry = res.country_name;
			this.topArtists(this.userCountry);
			this.topTracks(this.userCountry);
		});
  }

  /*Getting trending artist based on user location.*/
  	topArtists(country:string){

  		this._spotifyService.getTopArtists(this.userCountry).subscribe(res => {
			this.artistRes = res['topartists'].artist;

			for(let i=0;i<this.artistRes.length;i++){
			 this.artistImgags.push(this.artistRes[i].image[2]['#text']);
			}
		
		 const len = this.carouselTileOneItems.length;
    		if (len <= this.artistRes.length) {
     			for (let i = len; i < len + this.artistRes.length; i++) {
        			this.carouselTileOneItems.push({'image':this.artistImgags[i],'name':this.artistRes[i].name,'url':this.artistRes[i].url});
      					}
    				} 


				});
		
		}

	/*Getting trending tracks based on user country */
		topTracks(country:string){

  		this._spotifyService.getTopTracks(this.userCountry).subscribe(res => {
			this.tracksRes = res.tracks.track;
			console.log(this.tracksRes)
			for(let i=0;i<this.tracksRes.length;i++){
			 this.tracksImages.push(this.tracksRes[i].image[2]['#text']);
			} 
		
		 const len = this.carouselTileTwoItems.length;
    		if (len <= this.tracksRes.length) {
     			for (let i = len; i < len + this.tracksRes.length; i++) {
        			this.carouselTileTwoItems.push({'image':this.tracksImages[i],'name':this.tracksRes[i].name,'url':this.tracksRes[i].url,'artist':this.tracksRes[i].artist.name});
      					}
    				} console.log(this.carouselTileTwoItems);


				});
		
		}

}
