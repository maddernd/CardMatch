import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { TimerComponent } from '../timer/timer.component';
import { CongratulationsScreenComponent } from '../congratulations-screen/congratulations-screen.component';
import { NgFor, NgIf } from '@angular/common';

interface Card {
  id: string;
  imageUrl: string;
  matched: boolean;
  flipped: boolean;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CardComponent, TimerComponent, CongratulationsScreenComponent, NgIf, NgFor],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  cards: Card[] = [];
  private flippedCards: Card[] = [];
  private matchCheckTimeout: any = null;
  gameCompleted: boolean = false; // Flag to indicate game completion
  totalTimeTaken: number = 0; // Track total time taken to complete the game

  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.startGame();
  }
  
  startGame(): void {
    this.gameCompleted = false; // Reset game completion flag
    this.totalTimeTaken = 0; // Reset time taken
    this.initializeCards();
    this.shuffleCards();
    if (this.timerComponent) {
      this.timerComponent.resetTimer(); // Make sure timer is reset before starting
      this.timerComponent.startTimer(); // Start the timer
    }
  }

  onCardClicked(cardId: string): void {
    const card = this.cards.find(c => c.id === cardId);
    if (!card || this.flippedCards.length === 2 || card.flipped || card.matched || this.matchCheckTimeout) return;

    card.flipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
        this.checkForMatch();
    }
}

initializeCards(): void {
  const suits = ['clubs', 'hearts', 'diamonds', 'spades'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  
  // Generate all possible card names
  let allPairs = suits.flatMap(suit => ranks.map(rank => `${rank}_of_${suit}`));
  
  // Shuffle the full list of cards
  allPairs = this.shuffleArray(allPairs);
  
  // Select the first 18 for 18 matching pairs (36 cards)
  const selectedPairs = allPairs.slice(0, 18);

  // Generate card objects for the selected pairs
  this.cards = selectedPairs.flatMap(pair => [
    { id: `${pair}-1`, imageUrl: `assets/${pair}.png`, matched: false, flipped: false },
    { id: `${pair}-2`, imageUrl: `assets/${pair}.png`, matched: false, flipped: false },
  ]);

  // Shuffle the selected cards to mix pairs
  this.shuffleCards();
}

// Utility method to shuffle an array
shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


  shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }


  private checkForMatch(): void {
    const [firstCard, secondCard] = this.flippedCards;

    if (firstCard.imageUrl === secondCard.imageUrl) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.flippedCards = [];
      if (this.cards.every(card => card.matched)) {
        this.gameCompleted = true; // Set game completion flag
        if (this.timerComponent) {
          this.timerComponent.stopTimer(); // Stop the timer when the game is completed
          this.totalTimeTaken = this.timerComponent.time; // Get the total time from the timer component
        }
      }
    } else {
      this.matchCheckTimeout = setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        this.flippedCards = [];
        this.matchCheckTimeout = null;
      }, 1000);
    }
  }

  restartGame(): void {
    this.startGame(); // Add logic as needed to properly reset the game state
  }
}
