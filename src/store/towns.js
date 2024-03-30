import { createEvent, createStore } from "effector";
import { api } from "../api/axiosInstance";
import { getTowns } from "../api/requests";

export const $towns = createStore([]);


$towns.on(getTowns.doneData, (_, towns) => towns);
