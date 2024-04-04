import { Component, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// Stand alone component for running and displaying the timer

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  time: number = 0;
  intervalId?: number;

  constructor(private cdRef: ChangeDetectorRef) {}

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.time++;
      this.cdRef.detectChanges(); 
    }, 1000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      this.cdRef.detectChanges();
    }
  }
  increaseTime(seconds: number): void {
    this.time += seconds;
    this.cdRef.detectChanges();
  }

  resetTimer() {
    this.stopTimer();
    this.time = 0;
    this.cdRef.detectChanges();
  }
}