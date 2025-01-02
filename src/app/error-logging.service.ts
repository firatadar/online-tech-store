import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggingService {
  private errorLog: { [type: string]: number } = {};
  private errorLogSubject = new BehaviorSubject<{ [type: string]: number }>({});

  errorLog$ = this.errorLogSubject.asObservable();

  logError(type: string, error: any): void {
    if (this.errorLog[type]) {
      this.errorLog[type]++;
    } else {
      this.errorLog[type] = 1;
    }
    console.log(`Error Logged: ${type}`, error); // Konsola log yaz
    this.errorLogSubject.next(this.errorLog); // Güncel log bilgisini yayınla
  }

  getErrorLog(): { [type: string]: number } {
    return this.errorLog;
  }
}
