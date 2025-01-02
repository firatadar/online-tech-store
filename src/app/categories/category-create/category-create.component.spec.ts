import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryCreateComponent } from './category-create.component';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let fixture: ComponentFixture<CategoryCreateComponent>;
  let categoryServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock CategoryService
    categoryServiceMock = {
      createCategory: jasmine.createSpy('createCategory').and.returnValue(of({}))
    };

    // Mock Router
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [CategoryCreateComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveCategory method and navigate', () => {
    const inputElement = document.createElement('input');
    inputElement.value = 'Test Category';
    const mockInput = { value: inputElement.value };

    // Call saveCategory
    component.saveCategory(mockInput);

    // Expect the service to be called with the correct data
    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith({ id: 0, name: 'Test Category' });

    // Expect navigation to be called
    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });
});
