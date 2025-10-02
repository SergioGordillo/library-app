import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BooksDetail } from './pods/book/books-detail/books-detail';
import { BooksList } from './pods/book/books-list/books-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzButtonModule, BooksList, BooksDetail],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('library-app');
}
