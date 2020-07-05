import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IBookingInformation } from '../../models/IBookingInformation';
import { IPassengers } from '../../models/IPassengers';
import { IFlight } from '../../models/IFlight';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  formBookingInformation = new FormGroup({
    inputOrigin: new FormControl('',Validators.required),
    inputDestination: new FormControl('',Validators.required),
    inputDateDeparture: new FormControl('',Validators.required),
    inputDateReturn: new FormControl({value: '', disabled: true},Validators.required),
    selectPassengers: new FormControl(1),
    inputReturn: new FormControl(false)
  });

  private _cities: String[] = [];
  private _filteredCitiesOrigin: Observable<String[]>;
  private _filteredCitiesDestination: Observable<String[]>;

  private _bookingInformation: IBookingInformation = {
    origin: '',
    destination: '',
    departureDate: new Date(),
    returnDate: new Date(),
    passengers: 0,
    return: false
  };

  private passengers: IPassengers[] = [
    {value: 1, viewValue: 'One'},
    {value: 2, viewValue: 'Two'},
    {value: 3, viewValue: 'Three'}
  ];

  public result: IFlight[] = [];

  constructor(private _flightService: FlightService) { }

  ngOnInit(): void {
    this._flightService.getCities().subscribe(data => this._cities = data);
    this._filteredCitiesOrigin = this.formBookingInformation.controls.inputOrigin.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
    this._filteredCitiesDestination = this.formBookingInformation.controls.inputDestination.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
  }

  onSubmit(): void {
    if(this.formBookingInformation.status==="VALID"){
      this._flightService.flightSearch(this._getBookingInformation()).subscribe(data => this._flightService.sendResult(data));
    }
  }

  private _filterCities(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this._cities.filter(city => city.toLowerCase().indexOf(filterValue) === 0);
  }

  private _getBookingInformation(){
    this._bookingInformation.origin = this.formBookingInformation.controls.inputOrigin.value;
    this._bookingInformation.destination = this.formBookingInformation.controls.inputDestination.value;
    this._bookingInformation.departureDate = this.formBookingInformation.controls.inputDateDeparture.value;
    this._bookingInformation.returnDate = this.formBookingInformation.controls.inputDateReturn.value;
    this._bookingInformation.passengers = this.formBookingInformation.controls.selectPassengers.value;
    this._bookingInformation.return = (this.formBookingInformation.controls.inputReturn.value=="false" || this.formBookingInformation.controls.inputReturn.value==false) ? false: true;

    return this._bookingInformation;
  }

  private _toggleClicked(){
    (this.formBookingInformation.controls.inputReturn.value=="false" || this.formBookingInformation.controls.inputReturn.value==false) ? this.formBookingInformation.controls.inputDateReturn.disable() : this.formBookingInformation.controls.inputDateReturn.enable();
  }
}
