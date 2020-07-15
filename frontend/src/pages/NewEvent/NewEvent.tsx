import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export interface NewEvent {
  title: string;
  description: string;
  date: Date;
  address: string;
}

export function NewEvent(props: NewEvent) {
  const [title, setTitle] = useState<NewEvent['title']>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<NewEvent['date']>(new Date());
  const [address, setAddress] = useState('');

  async function handleNewEvent(e: { preventDefault: () => void }) {
    e.preventDefault();

    const data: NewEvent = {
      title,
      description,
      date,
      address,
    };

    try {
      await api.post('events', data);
    } catch (error) {
      alert('Erro ao cadastrar, tente novamente');
    }
  }
  return (
    <div>
      <Link to="/feed" className="back-link">
        Voltar para o feed
      </Link>
      <form onSubmit={handleNewEvent}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do Evento"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date as Date)}
        />

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Endereço"
        />

        <button type="submit" className="button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
