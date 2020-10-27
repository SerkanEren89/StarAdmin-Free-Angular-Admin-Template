import {CommentModel} from '../../inbox/_models/comment.model';
import {CategoryModel} from './category.model';
import {SentimentEnum} from './sentiment.enum';

export class CommentCategoryModel {
  comment: CommentModel;
  category: CategoryModel;
  generalSentiment: SentimentEnum;
}
