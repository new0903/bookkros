import axios from "axios";

export const api = axios.create({
    baseURL: 'https://russcazak10.ru/web/index.php?r=api'
});
