import {SentimentEnum} from '../../category/_models/sentiment.enum';

export class CommentModel {
  id: number;
  content: string;
  title: string;
  answer: string;
  commentDate: Date;
  travelDate: Date;
  source: string;
  rating: number;
  starRating: number;
  author: string;
  selected: boolean;
  starred: boolean;
  translatedText: string;
  ratingOverFive: number;
  url: string;
  categorized: boolean;
  sentiment: SentimentEnum;
}
