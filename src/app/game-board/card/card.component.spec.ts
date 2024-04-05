import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    // Example card data for testing
    component.card = { id: '1', imageUrl: 'path/to/image', matched: false, flipped: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardClicked event when handleClick is called and card is not matched', () => {
    const cardClickSpy = spyOn(component.cardClicked, 'emit');
    component.handleClick();
    expect(cardClickSpy).toHaveBeenCalledWith('1');
  });

  it('should not emit cardClicked event when handleClick is called and card is matched', () => {
    const cardClickSpy = spyOn(component.cardClicked, 'emit');
    component.card.matched = true; // Set card as matched
    component.handleClick();
    expect(cardClickSpy).not.toHaveBeenCalled();
  });


});
