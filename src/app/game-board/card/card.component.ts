import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: { id: string; imageUrl: string; matched: boolean; flipped: boolean; };
  @Output() cardClicked = new EventEmitter<string>(); // Emit the card's ID

  handleClick() {
    if (!this.card.matched) { 
      this.cardClicked.emit(this.card.id);
    }
  }
}
