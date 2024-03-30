import { createEffect } from "effector";
import {api} from './axiosInstance'

export const createBookFx = createEffect(async (formDataBook) => {


    const { data } = await api.post('api/addbook', formDataBook)
    return data.response;
});

export const getBookFx = createEffect( async (idUser) => {
    const {data} = await api.get('api/getbook&userId='+idUser);
    console.log(data)
    return data.response;
});

export const deleteBookFx = createEffect( async (id) => {
    const { data } = await api.delete('api/book/delete/' + id);
    return data.response;
});

export const getOneBook = async (userId, bookId) => {
    const {data}  = await api.get('api/getbook&idBook=' + bookId);
    return data.response;
}

export const putOneBook = async (formDataBook) => {
    const { data } = await api.post('api/updatebook', formDataBook);
    return data.response;
}