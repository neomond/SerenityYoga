import {MeditationSession} from './MeditationSession';

export interface Meditation {
  _id: string;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  imgUrl: string;
  relatedSessions: MeditationSession[];
}
