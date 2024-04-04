import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router'; 

// This Component is used to display a congrats screen and a restart game button, its imported directly into game board.
@Component({
  selector: 'app-congratulations-screen',
  standalone: true,
  imports: [NgIf],
  templateUrl: './congratulations-screen.component.html',
  styleUrls: ['./congratulations-screen.component.scss'] 
})
export class CongratulationsScreenComponent {
  @Input() totalTime: number = 0;
  @Output() newGame = new EventEmitter<void>();

  // Inject the Router in the constructor
  constructor(private router: Router) {}

  startNewGame() {
    this.newGame.emit(); 
  }
}