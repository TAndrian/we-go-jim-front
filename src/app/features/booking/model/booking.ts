import { User } from "../../user/model/User";

export interface Booking {
    id: string;
    startTime: Date;
    endTime: Date;
    maxParticipant: number;
    users: Array<User>;
}