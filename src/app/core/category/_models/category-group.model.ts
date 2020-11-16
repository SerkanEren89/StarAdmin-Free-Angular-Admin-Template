import {CategoryModel} from './category.model';

export class CategoryGroupModel {
  category: CategoryModel;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  score: number;
  totalMention: number;
  selected: boolean;
  rank: number;
  hotelName: string;
}
