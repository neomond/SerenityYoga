import {Session} from './Session';

export interface Category {
  _id: string;
  name: string;
  description: string;
  sessions: Session[];
}
