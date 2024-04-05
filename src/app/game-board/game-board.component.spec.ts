import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GameBoardComponent } from './game-board.component';
import { NgIf, NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { TimerComponent } from '../timer/timer.component';
import { CongratulationsScreenComponent } from '../congratulations-screen/congratulations-screen.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        // Mock child components
        CardComponent,
        TimerComponent,
        CongratulationsScreenComponent
      ],
      imports: [NgIf, NgFor, MatGridListModule, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    component.cards = [
      { id: '1', imageUrl: 'url1', matched: false, flipped: false },
      { id: '2', imageUrl: 'url2', matched: false, flipped: false }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cards correctly', () => {
    component.initializeCards();
    expect(component.cards.length).toBeGreaterThan(0);
    expect(component.cards.every(card => !card.flipped && !card.matched)).toBeTrue();
  });

  it('should shuffle cards', () => {
    const initialOrder = [...component.cards];
    component.shuffleCards();
    const newOrder = [...component.cards];
    expect(initialOrder).not.toEqual(newOrder);
  });

  it('should start game correctly', fakeAsync(() => {
    spyOn(component, 'initializeCards');
    spyOn(component, 'shuffleCards');
    component.startGame();
    tick();
    expect(component.gameCompleted).toBeFalse();
    expect(component.initializeCards).toHaveBeenCalled();
    expect(component.shuffleCards).toHaveBeenCalled();
    expect(component.totalTimeTaken).toBe(0);
  }));

  it('should handle card click by flipping card', () => {
    // Assume no cards are flipped initially
    expect(component.cards.find(card => card.id === '1')!.flipped).toBeFalse();
    component.onCardClicked('1');
    // Expect the card to be flipped after click
    expect(component.cards.find(card => card.id === '1')!.flipped).toBeTrue();
  });

  it('should check for match and mark cards as matched', fakeAsync(() => {
    component.cards = [
      { id: '1', imageUrl: 'url1', matched: false, flipped: true },
      { id: '2', imageUrl: 'url1', matched: false, flipped: true } // same imageUrl to simulate a match
    ];
    component.checkForMatch();
    tick(1000); // Wait for setTimeout in checkForMatch
    expect(component.cards.every(card => card.matched)).toBeTrue();
  }));

  it('should restart game correctly', fakeAsync(() => {
    spyOn(component, 'startGame').and.callThrough();
    component.restartGame();
    tick();
    expect(component.startGame).toHaveBeenCalled();
  }));

});
