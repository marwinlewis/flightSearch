export interface IFlight {
    company: String,
    logo: String,
    time: {
        departure: Date,
        arrival: Date
    },
    origin: String,
    destination: String,
    price: Number
}