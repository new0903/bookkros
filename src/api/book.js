import { createEffect } from "effector";

export const createBookFx = createEffect(async (boo) => {
    const { data } = await api.post('api/book/create', boo)
    return data;
});

export const getBookFx = createEffect( async (idUser) => {
    const { data } = await api.get('api/book/' + idUser);
    return data;
});

export const deleteBookFx = createEffect( async (id) => {
    const { data } = await api.delete('api/book/delete/' + id);
    return data;
});

export const getOneBook = async (userServerId, bookId) => {
    const { data } = await api.get('api/book/' + userServerId + '?book=' + bookId);
    return data;
}

export const putOneBook = async (dataBook) => {
    const { data } = await api.put('api/book/update', dataBook);
    return data;
}