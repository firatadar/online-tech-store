import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms'; // Add NgForm import
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthComponent } from './auth.component';
import { AuthResponse } from '../auth-response.model';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAuthResponse: AuthResponse = {
    idToken: 'testToken',
    email: 'test@test.com',
    refreshToken: 'testRefreshToken',
    expiresIn: '3600',
    localId: 'testLocalId'
  };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle mode correctly', () => {
    expect(component.isLoginMode).toBeTrue();
    component.toogleMode();
    expect(component.isLoginMode).toBeFalse();
    component.toogleMode();
    expect(component.isLoginMode).toBeTrue();
  });

  it('should display "Giriş Yap" when isLoginMode is true', () => {
    component.isLoginMode = true;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h3');
    expect(header.textContent).toContain('Giriş Yap');
  });

  it('should display "Hesap Oluştur" when isLoginMode is false', () => {
    component.isLoginMode = false;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h3');
    expect(header.textContent).toContain('Hesap Oluştur');
  });

  it('should disable submit button when form is invalid', () => {
    const form = {
      valid: false,
      value: {
        email: '',
        password: ''
      }
    } as NgForm;

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should call login when isLoginMode is true and form is valid', () => {
    component.isLoginMode = true;
    const form = {
      valid: true,
      value: {
        email: 'test@test.com',
        password: 'password'
      }
    } as NgForm;

    authServiceSpy.login.and.returnValue(of(mockAuthResponse));
    fixture.detectChanges();

    component.handleAuth(form);
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should call register when isLoginMode is false and form is valid', () => {
    component.isLoginMode = false;
    const form = {
      valid: true,
      value: {
        email: 'test@test.com',
        password: 'password'
      }
    } as NgForm;

    authServiceSpy.register.and.returnValue(of(mockAuthResponse));
    fixture.detectChanges();

    component.handleAuth(form);
    expect(authServiceSpy.register).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should set error message when authentication fails', () => {
    component.isLoginMode = true;
    const form = {
      valid: true,
      value: {
        email: 'test@test.com',
        password: 'password'
      }
    } as NgForm;

    const errorMessage = 'Authentication failed';
    authServiceSpy.login.and.returnValue(throwError(errorMessage));
    fixture.detectChanges();

    component.handleAuth(form);
    expect(component.error).toBe(errorMessage);
  });
});