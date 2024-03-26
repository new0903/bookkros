import { createEffect } from "effector";
import {api} from './axiosInstance'

export const createBookFx = createEffect(async (boo) => {
    const { data } = await api.post('api/book/create', boo)
    return data;
});

export const getBookFx = createEffect( async (idUser) => {
    const {data} = await api.get('api/getbook');
    console.log(data)
    return data.response;
});

export const deleteBookFx = createEffect( async (id) => {
    const { data } = await api.delete('api/book/delete/' + id);
    return data;
});

export const getOneBook = async (userId, bookId) => {
    const {data}  = await api.get('api/getbook&idBook=' + bookId);
    return data.response;
}

export const putOneBook = async (dataBook) => {
    const { data } = await api.put('api/book/update', dataBook);
    return data;
}