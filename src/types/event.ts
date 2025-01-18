export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'tournament' | 'match' | 'meeting';
}