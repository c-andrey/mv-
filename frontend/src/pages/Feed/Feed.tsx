import React, { ReactElement, useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';
import { Link } from 'react-router-dom';

interface Props {}

interface Event {
  _id: string;
  title: string;
  date: Date;
  address: string;
}

export default function Feed({}: Props): ReactElement {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect((): void => {
    async function fetchData(): Promise<void> {
      const response = await api.get('events');

      setEvents(response.data.docs);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Link to="/events/new" className="back-link">
        Novo Evento
      </Link>
      <ul>
        {events.map((item) => (
          <li key={item._id}>
            <p>{item._id}</p>
            <p>{item.title}</p>
            <p>{item.date}</p>
            <p>{item.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
