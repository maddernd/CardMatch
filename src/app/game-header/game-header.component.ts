import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss'
})
export class GameHeaderComponent {
  title: string = "Super Card Match Game";
  constructor() { }
  ngOnInit(): void {
  }
}
