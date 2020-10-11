import {CategoryModel} from './category.model';
import {SentimentEnum} from './sentiment.enum';

export class CategorySentimentModel {
  category: CategoryModel;
  sentiment: string;
}
