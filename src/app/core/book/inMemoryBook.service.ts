import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Book } from '../../models/book.model';
import { BookService } from './bookService.model';

@Injectable({ providedIn: 'root' })
export class InMemoryBookService implements BookService<Book, string> {
  private books: Book[] = [];

  private simulateDelay<T>(value: T): Observable<T> {
    return of(value).pipe(delay(300));
  }

  createBook(item: Partial<Book>): Observable<Book> {
    const newBook: Book = {
      id: Date.now().toString(),
      title: item.title || 'Untitled',
      author: item.author || 'Unknown',
      year: item.year || new Date().getFullYear(),
      genre: item.genre || 'Unknown',
      ...item,
    };
    this.books.push(newBook);
    console.log('Book created:', newBook);
    return this.simulateDelay(newBook);
  }

  getBookById(id: string): Observable<Book> {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      console.warn(`Book with id ${id} not found`);
      return throwError(() => new Error(`Book with id ${id} not found`));
    }
    return this.simulateDelay(book);
  }

  updateBook(id: string, item: Partial<Book>): Observable<Book> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      console.warn(`Cannot update. Book with id ${id} not found`);
      return throwError(() => new Error(`Book with id ${id} not found`));
    }
    this.books[index] = { ...this.books[index], ...item };
    console.log('Book updated:', this.books[index]);
    return this.simulateDelay(this.books[index]);
  }

  deleteBook(id: string): Observable<void> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      console.warn(`Cannot delete. Book with id ${id} not found`);
      return throwError(() => new Error(`Book with id ${id} not found`));
    }
    this.books.splice(index, 1);
    console.log(`Book with id ${id} deleted`);
    return this.simulateDelay(undefined);
  }

  getBooks(): Observable<Book[]> {
    return this.simulateDelay([...this.books]);
  }
}
