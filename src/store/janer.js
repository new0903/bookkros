import { createEvent, createStore } from "effector";
import { api } from "../api/axiosInstance";
import { getJaner } from "../api/janer";

export const $janers = createStore([]);


$janers.on(getJaner.doneData, (_, janers) => janers);
