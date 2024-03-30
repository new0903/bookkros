import { createEffect } from "effector";
import {api} from './axiosInstance'

export const getJaner = createEffect( async (idUser) => {
    const {data} = await api.get('api/getjaner');
    console.log(data)
    return data.response;
});


export const getTowns= createEffect( async (idUser) => {
    const {data} = await api.get('api/gettowns');
    console.log(data)
    return data.towns;
});

export const getAutors= createEffect( async (idUser) => {
    const {data} = await api.get('api/getautors');
    console.log(data)
    return data.response;
});

