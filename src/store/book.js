import { createEvent, createStore } from "effector";
import { api } from "./axiosInstance";
import { createBookFx, getBookFx } from "../api/book";

export const $books = createStore<[]>([]);
export const $bookId = createStore<string>('');

export const filterBooks = createEvent();
export const setBookId = createEvent();

$books.on(createBookFx.doneData, (books, newBook) => [...books, newBook]);

$books.on(getBookFx.doneData, (_, books) => books);

$books.on(filterBooks, (books, bookId) => books.filter((book) => book.id !== bookId));

$bookId.on(setBookId, (_, recipeId) => recipeId);