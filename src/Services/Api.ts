import axios from "axios";

export const Api = axios.create({
  baseURL: 'https://teste.reobote.tec.br/api',
  timeout: 8000
})