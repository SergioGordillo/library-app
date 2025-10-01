import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../../models/book.model';
import { bookService } from './bookService.model';

@Injectable({
  providedIn: 'root',
})
export class BookServiceImpl implements bookService<Book, string> {
  private baseUrl = '/api/books';

  constructor(private http: HttpClient) {}

  createBook(item: Partial<Book>): Observable<Book> {
    return this.http
      .post<Book>(this.baseUrl, item)
      .pipe(catchError(this.handleError<Book>('createBook')));
  }

  getBookById(id: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<Book>('getBookById')));
  }

  updateBook(id: string, item: Partial<Book>): Observable<Book> {
    return this.http
      .patch<Book>(`${this.baseUrl}/${id}`, item)
      .pipe(catchError(this.handleError<Book>('updateBook')));
  }

  deleteBook(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('deleteBook')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
