import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlight } from '../models/flight';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

    private _url: string = "https://tw-frontenders.firebaseio.com/advFlightSearch.json";

    constructor(private http: HttpClient) { }

    public getFlights(): Observable<IFlight[]>{
        return this.http.get<IFlight[]>(this._url);
    }

    //private searchFlight()
}
