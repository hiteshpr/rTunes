import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AboutComponent }   from './components/about/about.component';
import { SearchComponent }   from './components/search/search.component';
import { ArtistComponent }   from './components/artist/artist.component';
import { AlbumComponent }   from './components/album/album.component';
import { CountryComponent }   from './components/country/country.component';
import { TagComponent }   from './components/tag/tag.component';
import { TrackChartComponent } from './components/track-chart/track-chart.component';


const routes: Routes = [
	{ path: '',  component: SearchComponent },
	{ path: 'about',  component: AboutComponent },
	{ path: 'artist/:name',  component: ArtistComponent },
	{ path: 'album/:id',  component: AlbumComponent },
	{ path: 'country', component: CountryComponent},
	{ path: 'tag/:name',  component: TagComponent },
	{ path: 'charts/top-10', component: TrackChartComponent}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
