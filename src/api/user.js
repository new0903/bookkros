import { createEffect } from "effector";
import { api } from "./axiosInstance";

export const setUserServerFx = createEffect(async (fetchedUser) => {
    // console.log("марш в хранилище")
    // bridge.send('VKWebAppStorageSet', {
    //     key: fetchedUser.id.toString(),
    //     value: fetchedUser.first_name,
    // })
    var formData = new FormData();
    console.log(fetchedUser)
    //console.log(townid);
    formData.append('first_name', fetchedUser.first_name)
    formData.append('last_name', fetchedUser.last_name)
    formData.append('photo_200', fetchedUser.photo_200)
    formData.append('id', fetchedUser.id)
    const { data } = await api.post('adduser', formData);
  //  console.log(data)
    return data.response;
});
export const setUserServerTown = createEffect(async (fetchedUserTown) => {
    // console.log("марш в хранилище")
    // bridge.send('VKWebAppStorageSet', {
    //     key: fetchedUser.id.toString(),
    //     value: fetchedUser.first_name,
    // })
    var formData = new FormData();
    //console.log(townid);
    formData.append('town', fetchedUserTown.town)
    formData.append('id', fetchedUserTown.id)
    const { data } = await api.post('setusertown', formData);
    return data.response;
});