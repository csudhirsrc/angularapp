import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'landing-page',  
  templateUrl: './landing-page.html'
})
export class LandingPageComponent {

  public displayHeaderBar: boolean = false;

  @HostListener('window:scroll', ['$event'])
  track(event) {    
    if(window.pageYOffset > 300) {
      this.displayHeaderBar = true;
    } else {
      this.displayHeaderBar = false;
    }
  }
}
