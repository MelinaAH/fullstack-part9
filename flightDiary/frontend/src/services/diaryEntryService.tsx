import axios from 'axios';
import { Diary, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
};

export const addDiaryEntry = (object: NewDiaryEntry) => {
  return axios
    .post<Diary[]>(baseUrl, object)
    .then(response => response.data)
}