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
  public displaySearchBar1: boolean = false;

  public initialLatitude: number;
  public initialLongitude: number;
  public initialLocation: string;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public locationName: string;
  public zoom: number;
  public isNativeElementLoaded: boolean;
  public closeFlag: boolean;
  public disableUnwanted: any = [{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }];

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
    this.latitude = 0;
    this.longitude = 0;

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

  public openMapLocation(reset?: boolean) {

    this.markers[0].draggable = false;
    if (reset) {
      this.locationName = this.initialLocation;
      this.markers[0].lat = this.initialLatitude;
      this.markers[0].lng = this.initialLongitude;
      this.latitude = this.initialLatitude;
      this.longitude = this.initialLongitude;
    } else {
      this.markers[0].lat = this.latitude;
      this.markers[0].lng = this.longitude;
    }
    this.displayMap = false;
    setTimeout(() => {
      this.displayMap = true;
    }, 0);
    console.log(this.markers[0])
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: marker, $event: any) {
    this.getGeoLocation($event.coords.lat, $event.coords.lng, true);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    console.log('dragEnd', m, $event);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  public setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.initialLatitude = position.coords.latitude;
        this.initialLongitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getGeoLocation(this.initialLatitude, this.initialLongitude);
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

          this.locationName = place.formatted_address;
          this.initialLocation = place.formatted_address;
          //set latitude, longitude and zoom
          this.initialLatitude = place.geometry.location.lat();
          this.initialLongitude = place.geometry.location.lng();
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
    this.latitude = this.initialLatitude;
    this.longitude = this.initialLongitude;
    this.openMapLocation(true);
  }

  getGeoLocation(lat: number, lng: number, isResetLocationInitial?: boolean) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            this.locationName = this.getAddress(rsltAdrComponent, resultLength);
            if (!isResetLocationInitial) {
              this.initialLocation = this.getAddress(rsltAdrComponent, resultLength);
            }

            this.searchElementRef.nativeElement.focus();
            this.searchElementRef.nativeElement.blur();
            console.log(this.locationName);
          } else {
            alert("No address available!");
          }
        }
      });
    }
  }

  public getAddress(rsltAdrComponent: any, resultLength: any): string {
    let address: string = "";
    for (let i = 8; i >= 2; i--) {
      try {
        address = address + rsltAdrComponent[resultLength - i].short_name + ",";
      } catch (err) {
        console.log(err);
      }
    }
    if (address.charAt(address.length - 1) == ',') {
      address = address.substring(0, address.length - 1);
    }
    return address;
  }

  public isCloseEnable(): boolean {
    if (this.locationName && this.locationName.length > 0) {
      this.closeFlag = true;
      return true;
    } else {
      this.closeFlag = false;
      return false;
    }
  }

  public resetSearch() {
    this.locationName = "";
    this.closeFlag = false;
  }
}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}