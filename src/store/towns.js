import { createEvent, createStore } from "effector";
import { api } from "../api/axiosInstance";
import { getJaner, getTowns } from "../api/janer";

export const $towns = createStore([]);


$towns.on(getTowns.doneData, (_, towns) => towns);
