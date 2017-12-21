import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

import { DOCUMENT } from "@angular/platform-browser";
@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
navIsFixed: boolean;
	constructor(@Inject(DOCUMENT) private document: Document) {}

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
