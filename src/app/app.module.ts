import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './shared/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesModule } from './categories/categories.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { CustomErrorHandler } from './custom-error-handler';
import { ErrorLoggingService } from './error-logging.service';
import { ErrorLogComponent } from './error-log/error-log.component';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorLogComponent,
    ErrorDisplayComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CategoriesModule,
    AuthenticationModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler }, // Özel hata yöneticisi
    ErrorLoggingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
