export class CommentModel {
  id:number;
  content: string;
  answer: string;
  commentDate: Date;
  travelDate: Date;
  source: string;
  rating: number;
  starRating: number;
  writtenBy: string;
  selected: boolean;
  starred: boolean;
}
