import { Observable } from "rxjs";
import { Book } from "../../models/book.model";

export interface BookService<T = Book, id = string | number> {
  createBook(item: Partial<T>): Observable<T>;
  getBookById(id: id): Observable<T>;
  updateBook(id: id, item: Partial<T>): Observable<T>;
  deleteBook(id: id): Observable<void>;
}
