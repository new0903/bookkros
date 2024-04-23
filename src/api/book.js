import { createEffect } from "effector";
import {api} from './axiosInstance'

export const createBookFx = createEffect(async (formDataBook) => {


    const { data } = await api.post('addbook', formDataBook)
    return data.response;
});

export const getBookFx = createEffect( async (idUser) => {
    const {data} = await api.get('getbook&userId='+idUser);
    console.log(data)
    return data.response;
});

export const getUserBookFx = createEffect( async (idUser) => {
    const {data} = await api.get('getuserbook&userId='+idUser);
    console.log(data)
    return data.response;
});


export const deleteBookFx = createEffect( async (id) => {
    const { data } = await api.get('deletebook&idBook=' + id);
    return data.response;
});

export const getOneBook = async (userId, bookId) => {
    const {data}  = await api.get('getbook&idBook=' + bookId+'&userId='+userId);
    return data.response;
}

export const putOneBook = createEffect( async (formDataBook) => {
    const { data } = await api.post('updatebook', formDataBook);
    return data.response;
});