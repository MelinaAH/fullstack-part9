import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAllDiaryEntries, addDiaryEntry } from './services/diaryEntryService';
import { Diary, NewDiaryEntry, Weather, Visibility } from './types';

function App() {
  const [flightDiary, setFlightDiary] = useState<Diary[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>();
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setFlightDiary(data)
    })
  }, [flightDiary]);

  const handleAddEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (weather !== null && visibility !== null) {
      const entryToAdd: NewDiaryEntry = {
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment
      };

      setNewEntry(entryToAdd);

      if (!Object.values(Weather).includes(weather)) {
        setErrorMessage(`Error: Incorrect weather: ${weather}`);
        setDate('');
        setWeather(null);
        setVisibility(null);
        setComment('');
        return;
      }
      if (!Object.values(Visibility).includes(visibility)) {
        setErrorMessage(`Error: Incorrect visibility: ${visibility}`);
        setDate('');
        setWeather(null);
        setVisibility(null);
        setComment('');
        return;
      }

      try {
        if (newEntry) {
          const data = await addDiaryEntry(newEntry);
          setFlightDiary(flightDiary.concat(data));
        }

        setDate('');
        setWeather(null);
        setVisibility(null);
        setComment('');
      }
      catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            const field = error.response?.data.field;
            const value = error.response?.data.value;
            const message = `Error: incorrect ${field}: ${value}`;
            setErrorMessage(message);
          }
          else {
            setErrorMessage('Error: could not add diary entry');
          }
        }
        else {
          console.error(error);
          setErrorMessage('Error: could not add diary entry');
        }
      }
    }
  };

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        <p>{errorMessage}</p>
        <form onSubmit={handleAddEntry}>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <br />
          <label>
            Visibility:
            <input
              type="radio"
              value={Visibility.Great}
              checked={visibility === Visibility.Great}
              onChange={(event) => setVisibility(Visibility.Great)}
            /> Great
            <input
              type="radio"
              value={Visibility.Good}
              checked={visibility === Visibility.Good}
              onChange={(event) => setVisibility(Visibility.Good)}
            /> Good
            <input
              type="radio"
              value={Visibility.Ok}
              checked={visibility === Visibility.Ok}
              onChange={(event) => setVisibility(Visibility.Ok)}
            /> Ok
            <input
              type="radio"
              value={Visibility.Poor}
              checked={visibility === Visibility.Poor}
              onChange={(event) => setVisibility(Visibility.Poor)}
            /> Poor
          </label>
          <br />
          <label>
            Weather:
            <input
              type="radio"
              value={Weather.Sunny}
              checked={weather === Weather.Sunny}
              onChange={(event) => setWeather(Weather.Sunny)}
            /> Sunny
            <input
              type="radio"
              value={Weather.Rainy}
              checked={weather === Weather.Rainy}
              onChange={(event) => setWeather(Weather.Rainy)}
            /> Rainy
            <input
              type="radio"
              value={Weather.Cloudy}
              checked={weather === Weather.Cloudy}
              onChange={(event) => setWeather(Weather.Cloudy)}
            /> Cloudy
            <input
              type="radio"
              value={Weather.Stormy}
              checked={weather === Weather.Stormy}
              onChange={(event) => setWeather(Weather.Stormy)}
            /> Stormy
            <input
              type="radio"
              value={Weather.Windy}
              checked={weather === Weather.Windy}
              onChange={(event) => setWeather(Weather.Windy)}
            /> Windy
          </label>
          <br />
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          /><br />
          <button type='submit'>add</button>
        </form>
      </div>
      <div>
        <h2>Diary entries</h2>
        {flightDiary.map(entry =>
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
            <p>comment: {entry.comment}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;