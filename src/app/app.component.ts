import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './authentication/auth.service';
import { ErrorLoggingService } from './error-logging.service'; // ErrorLoggingService import edildi
import { ProductService } from './products/product.service';
@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent implements OnInit {
  title = 'ng-app';

  constructor(private authService: AuthService, private errorLoggingService: ErrorLoggingService) {} // ErrorLoggingService inject edildi

  ngOnInit(): void {
    this.authService.autoLogin();
    console.log(environment.production);
    console.log(environment.adminEmail);
  }

  throwRandomError(): void {
    const errorTypes = [
      () => { throw new SyntaxError('Random Syntax Error!'); },
      () => { throw new TypeError('Random Type Error!'); },
      () => { throw new RangeError('Random Range Error!'); },
      () => { throw new Error('Random General Error!'); },
    ];

    const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];

    try {
      randomError(); // Rastgele bir hata fırlat
    } catch (error) {
      this.errorLoggingService.logError(this.getErrorType(error), error); // Hatayı servise kaydet
    }
  }

  private getErrorType(error: any): string {
    if (error instanceof SyntaxError) return 'syntax';
    if (error instanceof TypeError) return 'runtime';
    if (error instanceof RangeError) return 'range';
    return 'unknown';
  }
}
