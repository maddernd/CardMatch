import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
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
    }
  }

  resetTimer() {
    this.stopTimer();
    this.time = 0;
    this.cdRef.detectChanges();
  }
}
