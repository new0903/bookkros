import { createEvent, createStore } from "effector";
import { api } from "../api/axiosInstance";
import { getAutors } from "../api/requests";

export const $autors = createStore([]);


$autors.on(getAutors.doneData, (_, autors) => autors);
