export interface IBookingInformation {
    origin: String;
    destination: String;
    departure: Date;
    return?: Date;
    passengers: Number;
    oneway: Boolean;
};