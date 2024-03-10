import { UserInfo } from "@vkontakte/vk-bridge";
import { createEvent, createStore } from "effector";
import { setUserServerFx } from "../api/user";


export const $userVK = createStore<UserInfo | null>(null);
export const setUserVK = createEvent();

$userVK.on(setUserVK, (_, user) => user);

export const $userServer = createStore<any>(null);

$userServer.on(setUserServerFx.doneData, (_, user) => user);