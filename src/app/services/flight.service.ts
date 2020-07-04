import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlight } from '../models/IFlight';
import { IBookingInformation } from '../models/IBookingInformation';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

    private _url: string = "https://tw-frontenders.firebaseio.com/advFlightSearch.json";

    private _resultSource = new Subject<IFlight[]>();
    result$ = this._resultSource.asObservable();

    constructor(private http: HttpClient) { }

    private _getApi(): Observable<IFlight[]>{
      return this.http.get<IFlight[]>(this._url);
    }

    public getCities(){
      return this._getApi().pipe(map(data => {
        const cities: String[] = [];
        data.map(data => {
          cities.push(data.origin);
          cities.push(data.destination);
        });
        return [...new Set(cities)];
      }));
    }

    public flightSearch(bookingInformation: IBookingInformation){
      let result: IFlight[] = [];
      const dateBIDeparture = new Date(bookingInformation.departure);
      let dateDataDeparture = new Date();

      return this._getApi().pipe(map((data=> {
        data.map(data => {
          dateDataDeparture = new Date(data.date);

          if(dateDataDeparture.getTime() == dateBIDeparture.getTime() && bookingInformation.origin==data.origin && bookingInformation.destination==data.destination){
            data.price = Number(data.price) * bookingInformation.passengers;
            result.push(data);
          }
        })
        return [...new Set(result)];
      })));
    }

    sendResult(result: IFlight[]){
      this._resultSource.next(result);
    }
}
