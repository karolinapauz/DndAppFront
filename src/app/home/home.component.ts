import { Component, IterableDiffers } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Game } from '../entity/game';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PlayableChar } from '../entity/playableChar';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { LocationInGame } from '../entity/location';
import { Npc } from '../entity/npc';
import { User } from '../entity/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public games: Game[] = [];
  public playableChars: PlayableChar[] = [];
  gameForm!: FormGroup;
  myGlobalToken: any;
  selectedPlayableChars = [];
  selectedLocations = [];
  selectedNpcs = [];

  constructor(private homeService: HomeService) {
    this.getGames();
    this.getChars();
    this.getLocations();
    this.getNpcs();
    this.getUsers();
  }

  ngOnInit(): void {
    this.myGlobalToken = localStorage.getItem('myToken');
  }

  public getGames(): void {
    this.homeService.getGames().subscribe(
      (response: Game[]) => {
        this.games = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getChars(): PlayableChar[] {
    let chars: PlayableChar[] = this.games
      .map((game) => game.playableChars)
      .reduce((prev, curr) => prev.concat(curr), []);
    return chars;
  }

  public getLocations(): LocationInGame[] {
    let locations: LocationInGame[] = this.games
      .map((game) => game.locations)
      .reduce((prev, curr) => prev.concat(curr), []);
    return locations;
  }

  public getNpcs(): Npc[] {
    let npcs: Npc[] = this.games
      .map((game) => game.npcs)
      .reduce((prev, curr) => prev.concat(curr), []);
    return npcs;
  }

  public getUsers(): User[] {
    let users: User[] = this.games
      .map((game) => game.users)
      .reduce((prev, curr) => prev.concat(curr), []);
    return users;
  }

  public onAddGame(addForm: NgForm): void {
    console.log('zaidejai ' + JSON.stringify(this.selectedPlayableChars));
    const addGameFormElement = document.getElementById('add-game-form');
    if (addGameFormElement !== null) {
      addGameFormElement.click();
    } else {
      console.error("No element found with ID 'add-game-form'");
      return;
    }

    if (addForm === null || addForm.value === null) {
      console.error('Form or form value is null');
      return;
    }

    this.homeService.addGame(addForm.value).subscribe(
      (response: Game) => {
        console.log(response);
        this.getGames();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public openNewGameModal() {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addGameModal');
    if (container != null) {
      container.appendChild(button);
    }

    button.click();
  }

  // public onAddGame(addForm: NgForm): void {
  //   const addGameFormElement = document.getElementById('add-game-form');
  //   if (addGameFormElement !== null) {
  //     addGameFormElement.click();
  //   } else {
  //     console.error("No element found with ID 'add-game-form'");
  //     return;
  //   }

  //   if (addForm === null || addForm.value === null) {
  //     console.error('Form or form value is null');
  //     return;
  //   }

  //   this.homeService.addGame(addForm.value).subscribe(
  //     (response: Game) => {
  //       console.log(response);
  //       this.getGames();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }

  // public openNewGameModal() {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.setAttribute('data-toggle', 'modal');
  //   button.setAttribute('data-target', '#addGameModal');
  //   if (container != null) {
  //     container.appendChild(button);
  //   }

  //   button.click();
  // }
}
