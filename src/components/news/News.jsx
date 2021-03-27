import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';

import s from './News.module.scss';
import { Link } from 'react-router-dom';

dotenv.config();

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  limit: PropTypes.number,
  id: PropTypes.string.isRequired,
  url: PropTypes.string,
}

export function News({ id, limit = -1, url }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(`${apiUrl}${id}`)

        if(!result.ok) {
          throw new Error('result not okay');
        }

        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn');
        return;
      } finally {
        setLoading(false);
      }

      setData(json);
    }
    getData();
  }, [id]);

  if (error) {
    return (
      <p>Vill kom upp: {error}</p>
    );
  }
  
  if(loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }
  const news = (data && data.items) || [];
  const head = (data && data.title) || [];

  return(
    <section className={s.card}>
      <div className={s.card__theme}>
        <dl className={s.card__content}>
          <h1>{head}</h1>
        {news.slice(0, limit).map((line) => {
          return (
            <dt><a href={line.link}>{line.title}</a></dt>
          );
        })}
        </dl>
        <dl className={s.card__bottomLink}>{url ? <Link to={`/${url}`}>Allar frettir</Link> : <Link to='/'>Til baka</Link>}</dl>
      </div>
    </section>
  )

}