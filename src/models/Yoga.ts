import {Session} from './Session';

export interface Yoga {
  _id: string;
  title: string;
  type: string;
  subtitle: string;
  description: string;
  imgUrl: string;
  sessions: Session[];
}
