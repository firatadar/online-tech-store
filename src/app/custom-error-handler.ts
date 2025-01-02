import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorStateService } from './error-state.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private errorStateService: ErrorStateService) {}

  handleError(error: any): void {
    let errorMessage = 'An unknown error occurred!';

    if (error instanceof SyntaxError) {
      errorMessage = 'A syntax error occurred!';
    } else if (error instanceof TypeError) {
      errorMessage = 'A runtime error occurred!';
    } else if (error instanceof Error) {
      errorMessage = 'A logical error occurred!';
    }

    // Hata mesajını servise ilet
    this.errorStateService.setError(errorMessage);

    // Konsola yaz
    console.error('Error:', error);
  }
}
