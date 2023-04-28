import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string,
}

const App = () => {
  const [flightDiary, setFlightDiary] = useState<Diary[]>([]);
  const [entryId, setEntryId] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, seVisibility] = useState('');
  const [comment, seComment] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/diaries')
      .then(response => setFlightDiary(response.data))
  }, [flightDiary]);

  return (
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
  );
}

export default App;
