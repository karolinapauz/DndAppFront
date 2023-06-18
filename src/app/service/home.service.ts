import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Game } from '../entity/game';
import { LocationInGame } from '../entity/location';
import { PlayableChar } from '../entity/playableChar';
import { Npc } from '../entity/npc';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public games: Game[] = [];

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiServerUrl}/game/admin`);
  }

  public addGame(game: Game): Observable<Game> {
    console.log('iskviestas' + JSON.stringify(game));
    return this.http.post<Game>(`${this.apiServerUrl}/game/admin/add`, game);
  }
}
