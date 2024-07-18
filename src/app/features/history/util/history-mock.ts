import { UserBookingHistory } from "../model/user-booking-history";
let startTime1 = new Date('2024-06-26T12:00:00');
let endTime1 = new Date('2024-06-26T12:30:00');
const MOCK_JOHN_BOOKING_HISTORIES: UserBookingHistory[] = [
  {
    id: '25c94d72-38f6-4623-b498-9f304cd653e4',
    startTime: startTime1,
    endTime: endTime1
  }
];

export{MOCK_JOHN_BOOKING_HISTORIES}