import {CommentChannelModel} from './comment-channel.model';

export class MonthlyCommentModel {
  months: string[];
  item: CommentChannelModel[];
  currentMonthCount: number;
  lastMonthCount: number;
  lastMonthAverage: number;
  last6MonthCount: number;
  last6MonthAverage: number;
  last12MonthCount: number;
  last12MonthAverage: number;
}
