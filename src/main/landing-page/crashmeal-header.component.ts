import { Component, Input } from '@angular/core';

@Component({
  selector: 'crashmeal-header',
  templateUrl: './crashmeal-header.html'
})
export class CrashmealHeaderComponent {
  @Input() public displayHeaderBar: boolean;
  
}
