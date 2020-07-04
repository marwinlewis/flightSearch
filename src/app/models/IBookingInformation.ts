export interface IBookingInformation {
    origin: string;
    destination: string;
    departure: Date;
    return?: Date;
    passengers: number;
};