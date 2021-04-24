import { Room } from './room.model';

export enum ReservationState {
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Payed = "Payed"
}

export class ReservationFilter {
    id?: string;
    roomId?: string;
    startedDate: Date;
    endDate: Date;
    numberOfPersons: number;
    reservationState: ReservationState;
    ownerName: string;
    ownerEmail: string;
}

export interface IReservation {
    id?: string;
    roomId?: string;
    startedDate: Date;
    endDate: Date;
    numberOfPersons: number;
    reservationState: ReservationState;
    ownerName: string;
    ownerEmail: string;
    room: Room;
}

export class Reservation implements IReservation {
    id?: string;
    roomId?: string;
    startedDate: Date;
    endDate: Date;
    numberOfPersons: number;
    reservationState: ReservationState;
    ownerName: string;
    ownerEmail: string;
    room: Room;
}