import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CardComponent } from './card/card.component';
import { TimerComponent } from '../timer/timer.component';
import { CongratulationsScreenComponent } from '../congratulations-screen/congratulations-screen.component';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

interface Card {
  id: string;
  imageUrl: string;
  matched: boolean;
  flipped: boolean;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CardComponent, TimerComponent, CongratulationsScreenComponent, NgIf, NgFor, MatGridListModule],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  cards: Card[] = [];
  private flippedCards: Card[] = [];
  private matchCheckTimeout: any = null;
  private lastFlippedCards: string[] = [];
  // Flag to indicate game completion
  gameCompleted: boolean = false; 
  // Track total time taken to complete the game
  totalTimeTaken: number = 0; 
  viewInitialized = false;

  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.viewInitialized = true;
    this.startGame();
  }

  startGame(): void {
    // Reset game completion flag
    this.gameCompleted = false; 
    // Reset time taken
    this.totalTimeTaken = 0; 
    this.initializeCards();
    this.shuffleCards();
    if (this.timerComponent) {
      this.timerComponent.resetTimer(); 
      // Start the timer
      console.log("Start Timer Called")
      this.timerComponent.startTimer(); 
    }
  }

  // Testing only
  completeGame(): void {
    this.gameCompleted = true;
    this.totalTimeTaken = this.timerComponent.time;
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
  // Used to clean code for all the image names
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

// Utility method to shuffle array so we get some random cards from the deck
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

  checkForMatch(): void {
    const [firstCard, secondCard] = this.flippedCards;
  
    if (firstCard.imageUrl === secondCard.imageUrl) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.flippedCards = [];
      this.lastFlippedCards = []; // Clear last flipped cards on a match
      if (this.cards.every(card => card.matched)) {
        this.gameCompleted = true; 
        if (this.timerComponent) {
          this.timerComponent.stopTimer(); 
          this.totalTimeTaken = this.timerComponent.time; 
        }
      }
    } else {
      // Check if the same pair was flipped again
      const isRepeatedMismatch = this.lastFlippedCards.includes(firstCard.id) && this.lastFlippedCards.includes(secondCard.id);
  
      this.matchCheckTimeout = setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        this.flippedCards = [];
  
        if (isRepeatedMismatch) {
          // Apply penalty for repeated mismatch
          console.log("Penalty applied");
          this.timerComponent.increaseTime(5);
        }
  
        // Update lastFlippedCards for future reference
        this.lastFlippedCards = [firstCard.id, secondCard.id];
        this.matchCheckTimeout = null;
      }, 1000);
    }
  }

  restartGame(): void {
  if (!this.viewInitialized) {
    console.error("View is not initialized. Delaying game restart...");
    setTimeout(() => this.restartGame(), 100); 
    return;
  }
    this.startGame(); 
}


}