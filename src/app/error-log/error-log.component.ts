import { Component, OnInit } from '@angular/core';
import { ErrorLoggingService } from '../error-logging.service';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {
  errorLog: { [type: string]: number } = {};

  constructor(private errorLoggingService: ErrorLoggingService) {}

  ngOnInit(): void {
    this.errorLoggingService.errorLog$.subscribe((log) => {
      this.errorLog = log; // Hata loglarını al ve tabloyu güncelle
    });
  }

  // Rastgele hata üretme fonksiyonu
  throwRandomError(): void {
    const errorTypes = [
      () => { throw new SyntaxError('Random Syntax Error!'); },
      () => { throw new TypeError('Random Type Error!'); },
      () => { throw new RangeError('Random Range Error!'); },
      () => { throw new Error('Random General Error!'); }
    ];

    const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];

    try {
      randomError(); // Rastgele hata fırlat
    } catch (error) {
      this.errorLoggingService.logError(this.getErrorType(error), error); // Hatayı servise kaydet
    }
  }

  // Hata türünü belirleyen yardımcı fonksiyon
  private getErrorType(error: any): string {
    if (error instanceof SyntaxError) return 'syntax';
    if (error instanceof TypeError) return 'runtime';
    if (error instanceof RangeError) return 'range';
    return 'unknown';
  }
}
