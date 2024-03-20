import { createEffect } from "effector";
import { api } from "./axiosInstance";

export const setUserServerFx = createEffect(async (id) => {
    const idToString = id.toString()
    const { data } = await api.post('api/book/user/controll', { vkId: idToString, name: 'test' });
    return data;
});