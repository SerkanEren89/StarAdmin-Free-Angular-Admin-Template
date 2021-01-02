export class CompetitionCountRatingModel {
  id: number;
  uuid: string;
  name: string;
  hotelId: number;
  hotelName: string;
  bookingRating: number;
  tripAdvisorRating: number;
  hotelsComRating: number;
  googleRating: number;
  hotelUpliftRating: number;
  todaysCount: number;
  lastWeekCount: number;
  lastMonthCount: number;
  last3MonthsCount: number;
  selected: boolean;
  priceText: string;
  responseRate: number;
}
