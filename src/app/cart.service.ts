import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authentication/auth.service';
import { Product } from './products/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<Product[]>([]);
  items$ = this.items.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.loadCart();
      }
    });
  }

  private getUserCartUrl(): string {
    const userId = this.authService.getUserId();
    return `${environment.database_url}/carts/${userId}.json`;
  }

  private loadCart(): void {
    this.http.get<Product[]>(this.getUserCartUrl()).subscribe(items => {
      this.items.next(items || []);
    });
  }

  private saveCart(items: Product[]): void {
    this.http.put(this.getUserCartUrl(), items).subscribe();
  }

  addItem(item: Product): void {
    const currentItems = this.items.value;
    const updatedItems = [...currentItems, item];
    this.items.next(updatedItems);
    this.saveCart(updatedItems);
  }

  removeItem(item: Product): void {
    const currentItems = this.items.value.filter(i => i.id !== item.id);
    this.items.next(currentItems);
    this.saveCart(currentItems);
  }

  clearCart(): void {
    this.items.next([]);
    this.saveCart([]);
  }

  getItems(): Product[] {
    return this.items.value;
  }
}