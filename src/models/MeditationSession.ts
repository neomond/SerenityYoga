import {Meditation} from './Meditations';

export interface MeditationSession {
  _id: string;
  title: string;
  duration: string;
  imageUrl: string;
  meditations: Meditation[];
}
