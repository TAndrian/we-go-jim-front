import { UserModel } from "../../user/model/UserModel";

export interface BookingModel {
    id: string;
    startTime: Date;
    endTime: Date;
    maxParticipant: number;
    users: Array<UserModel>;
}