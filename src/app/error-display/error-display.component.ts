import { Component } from '@angular/core';
import { ErrorStateService } from '../error-state.service';

@Component({
  selector: 'app-error-display',
  template: `
    <div *ngIf="errorMessage" class="error-banner">
      {{ errorMessage }}
      <button (click)="clearError()">Close</button>
    </div>
  `,
  styles: [`
    .error-banner {
      background-color: #f8d7da;
      color: #721c24;
      padding: 10px;
      border: 1px solid #f5c6cb;
      border-radius: 5px;
      margin: 10px 0;
    }
    button {
      background: none;
      border: none;
      color: #721c24;
      font-weight: bold;
      cursor: pointer;
    }
  `]
})
export class ErrorDisplayComponent {
  errorMessage: string | null = null;

  constructor(private errorStateService: ErrorStateService) {
    this.errorStateService.error$.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  clearError() {
    this.errorStateService.clearError();
  }
}
