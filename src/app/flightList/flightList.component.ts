import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flightList',
  templateUrl: './flightList.component.html',
  styleUrls: ['./flightList.component.scss']
})
export class FlightListComponent implements OnInit {

  public flights = [];

  constructor(private _flightService: FlightService) { }

  ngOnInit(){
    this._flightService.getFlights()
        .subscribe(data => this.flights = data);
  }

  getDuration(timeDeparture, timeArrival) {
    let departure = new Date(timeDeparture);
    let arrival = new Date(timeArrival);

    let difference: Number = arrival.getTime() - departure.getTime();
      
    let hours = Math.floor((difference as any % 86400000) / 3600000);
    let min = Math.round(((difference as any % 86400000) % 3600000) / 60000);;

    return hours + " hrs " + min + " min";
  }
}