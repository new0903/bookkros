//import { UserInfo } from "@vkontakte/vk-bridge";
import { createEvent, createStore } from "effector";
import { setUserServerFx } from "../api/user";


export const $userVK = createStore(null);
export const setUserVK = createEvent();

$userVK.on(setUserVK, (_, user) => user);

export const $userServer = createStore(null);

$userServer.on(setUserServerFx.doneData, (_, user) => user);