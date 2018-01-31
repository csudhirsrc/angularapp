import { Component, Input } from '@angular/core';
import { ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'first-layer',
  templateUrl: './first-layer.html'
})
export class FirstLayerComponent {
  @Input() public displaySearchBar: boolean;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public locationName: string;
  public zoom: number;
  public isNativeElementLoaded: boolean;
  public place: google.maps.places.PlaceResult;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  public displayMap: boolean;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 17;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();
  }

  markers: marker[] = [
    {
      lat: 0,
      lng: 0,
      draggable: false
    }
  ];

  public openMapLocation() {
    this.markers[0].lat = this.latitude;
    this.markers[0].lng = this.longitude;
    this.markers[0].draggable = false;
    this.displayMap = false;
    setTimeout(() => {
      this.displayMap = true;
    }, 0);
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  public setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  public ngAfterViewInit() {

    if (this.searchElementRef) {
      this.isNativeElementLoaded = true;
    }
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.place = place;
          this.locationName = this.place.formatted_address;
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  public reloadElement() {
    if (!this.isNativeElementLoaded) {
      this.ngAfterViewInit();
    }
  }

  public enableEditLocation() {
    this.markers[0].draggable = true;
  }

  public resetLocation() {
    this.latitude = this.place.geometry.location.lat();
    this.longitude = this.place.geometry.location.lng();
    this.openMapLocation();
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}