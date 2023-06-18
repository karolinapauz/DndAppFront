import { LocationInGame } from './location';
import { Npc } from './npc';
import { PlayableChar } from './playableChar';
import { User } from './user';

export interface Game {
  name: string;
  playableChars: PlayableChar[];
  locations: LocationInGame[];
  npcs: Npc[];
  image: string;
  users: User[];
  texts: String[];
}
