export enum RoomType {
    Junior = "Junior Suite",
    Double = "Double Room",
    Senior = "Senior Suit",
    Single = "Single Room"
}

export enum RoomState {
    Available = "Available",
    Reserved = "Reserved",
    Maintenance = "Maintenance"
}

export class RoomFilter {
    id?: string;
    number?: string;
    description?: string;
    priceHigher: number;
    priceLower: number;
    type: RoomType;
    state: RoomState;
    reservedStartedDate: Date;
    reservedEndDate: Date;
}

export interface IRoom {
    id?: string;
    number?: string;
    description?: string;
    price?: number;
    type: RoomType;
    state: RoomState;
    reservedStartedDate: Date;
    reservedEndDate: Date;
}

export class Room implements IRoom {
    id?: string;
    number?: string;
    description?: string;
    price?: number;
    type: RoomType;
    state: RoomState;
    reservedStartedDate: Date;
    reservedEndDate: Date;
}