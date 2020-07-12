import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { IFlight } from '../../models/IFlight';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  public results: IFlight[][];

  private isReturn = false;

  private oneWay = {
    origin: '',
    destination: ''
  }
  private returnWay = {
    origin: '',
    destination: ''
  }

  constructor(private _flightService: FlightService) { }

  ngOnInit(){
    this._flightService.result$.subscribe(data => {
      this._updateResult(data);
    });
  }

  getDuration(timeDeparture, timeArrival) {
    let departure = new Date(timeDeparture);
    let arrival = new Date(timeArrival);

    let difference: Number = arrival.getTime() - departure.getTime();
      
    let hours = Math.floor((difference as any % 86400000) / 3600000);
    let min = Math.round(((difference as any % 86400000) % 3600000) / 60000);;

    return hours + " hrs " + min + " min";
  }

  private _updateResult(data){
    this.results = data;
    this.oneWay.origin = data[0][0].origin;
    this.oneWay.destination = data[0][0].destination;

    this.isReturn = data[1].length > 0 ? true : false;

    this.returnWay.origin = this.isReturn ? data[1][0].origin : null;
    this.returnWay.destination = this.isReturn ? data[1][0].destination : null;
  }
}