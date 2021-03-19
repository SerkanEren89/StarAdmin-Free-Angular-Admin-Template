import {CommentModel} from '../../inbox/_models/comment.model';
import {CategorySentimentModel} from './category-sentiment.model';

export class CategorizationModel {
  comment: CommentModel;
  commentCategoryList: CategorySentimentModel[];
  hotelId: number;
}
