import {Category} from './Category';

export interface Meditation {
  _id: string;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  imgUrl: string;
  categories: Category[];
}
