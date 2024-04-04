import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameHeaderComponent } from './game-header/game-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameBoardComponent, GameHeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'card-match';
}
