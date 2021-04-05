import {CommentModel} from './comment.model';
import {CommentCountRatingModel} from '../../dashboard/_models/comment-count-rating.model';

export  class WidgetModel {
  commentCountRatingItemList: CommentCountRatingModel[];
  lastComments: CommentModel[];
  hotelPath: string;
}
