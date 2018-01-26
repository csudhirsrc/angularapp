import { Component, Input } from '@angular/core';

@Component({
  selector: 'first-layer',
  templateUrl: './first-layer.html'
})
export class FirstLayerComponent {
  @Input() public displaySearchBar: boolean;
}
