import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books-list',
    loadComponent: () => import('./pods/book/books-list/books-list').then((m) => m.BooksList),
  },
  {
    path: 'books-detail',
    loadComponent: () => import('./pods/book/books-detail/books-detail').then((m) => m.BooksDetail),
  },
];
