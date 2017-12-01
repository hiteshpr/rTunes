import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, NavbarComponent, AboutComponent, SearchComponent, ArtistComponent, AlbumComponent, TagComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
