import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

// This component is for the cards themsleves.
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: { id: string; imageUrl: string; matched: boolean; flipped: boolean; };
  // Emit the card's ID
  @Output() cardClicked = new EventEmitter<string>(); 

  handleClick() {
    if (!this.card.matched) { 
      this.cardClicked.emit(this.card.id);
    }
  }
}