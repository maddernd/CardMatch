import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TimerComponent } from './timer.component';
import { ChangeDetectorRef } from '@angular/core';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerComponent ],
      providers: [
        ChangeDetectorRef
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start timer and increment time', fakeAsync(() => {
    expect(component.time).toBe(0);
    component.startTimer();
    tick(1000); 
    expect(component.time).toBe(1);
    tick(2000); 
    expect(component.time).toBe(3);
    component.stopTimer();
  }));

  it('should stop timer', fakeAsync(() => {
    component.startTimer();
    tick(1000);
    expect(component.time).toBeGreaterThan(0);
    component.stopTimer();
    const currentTime = component.time;
    tick(1000); 
    expect(component.time).toBe(currentTime); 
  }));

  it('should reset timer', fakeAsync(() => {
    component.startTimer();
    tick(3000); // Simulate 3 seconds passing
    expect(component.time).toBeGreaterThan(0);
    component.resetTimer();
    expect(component.time).toBe(0);
  }));
});
