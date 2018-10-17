import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {VenueInterface} from './venue.interface';

@Component({
  selector: 'app-foursquare',
  templateUrl: './foursquare.component.html',
  styleUrls: ['./foursquare.component.css']
})

export class FoursquareComponent implements OnInit {
  default_lat = 49.839683;
  default_lng = 24.029717;

  showInTheMap = false;

  url: string;
  foursquareData = {
    venues: []
  };

  foursquareForm = new FormGroup({
    city: new FormControl('', Validators.required),
    query: new FormControl('', Validators.required),
    radius: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient) {}


  ngOnInit() {}

  loadVenues() {
    const findingURL = `https://api.foursquare.com/v2/venues/search?v=20161016&ll=${this.default_lat}%2C%20${this.default_lng}`;
    const findingQuery = `query=${this.foursquareForm.controls['query'].value}`;
    const findingRadius = `radius=${this.foursquareForm.controls['radius'].value}`;
    const client_id = 'client_id=HPFNK0MP3UL3R5HQL4TMC1MFQ1TZZHEMSBTKU3QC0YCBMDEB';
    const client_secret = 'client_secret=K4AA3FTIPSBQMSNVNBXY5JSZOM23LYPJCEWQ0X23FK4T5O3Z';

    this.url = `${findingURL}&${findingQuery}&intent=checkin&${findingRadius}&${client_id}&${client_secret}`;

    this.getFoursquareVenues().subscribe(foursquare_data => {
      this.foursquareData = foursquare_data.response;
    });
  }

  getFoursquareVenues(): Observable<VenueInterface> {
    return this.http.get<VenueInterface>(this.url);
  }

  showMap() {
    this.showInTheMap = true;
  }

  getCoordinates() {
    this.getLocation(this.foursquareForm.controls['city'].value).subscribe(google_api_data => {
      if (google_api_data.results.length > 0) {
        this.default_lat = google_api_data.results[0].geometry.location.lat;
        this.default_lng = google_api_data.results[0].geometry.location.lng;
      }
    });
  }

  getLocation(city): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: city,
        key: 'AIzaSyAu67jZ96pGx3jFGQ_K9xZ8l6lmHwmJZV0'
      }
    });
  }
}
