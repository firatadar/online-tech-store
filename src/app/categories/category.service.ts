import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  private url = environment.database_url;

  constructor(private http: HttpClient) {}

  /**
   * Firebase'den kategorileri getirir.
   * @returns Observable<Category[]>
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<{ [key: string]: Category }>(this.url + 'categories.json').pipe(
      map(data => {
        const categories: Category[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            categories.push({ ...data[key], id: key }); // Firebase'deki ID'yi kategoriye ekliyoruz.
          }
        }
        return categories;
      })
    );
  }

  /**
   * Firebase'e yeni bir kategori ekler.
   * @param category Yeni kategori
   * @returns Observable<Category>
   */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<{ name: string }>(this.url + 'categories.json', category).pipe(
      map(response => {
        // Firebase'den dönen "name" alanını kategori ID'si olarak ayarlıyoruz.
        return { ...category, id: response.name };
      })
    );
  }
}
