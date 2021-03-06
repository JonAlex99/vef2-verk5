import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import { News } from '../news/News';

import s from './NewsList.module.scss';

dotenv.config();

const apiUrl = process.env.REACT_APP_API_URL;


export function NewsList() {
  // TODO sækja yfirlit fréttaflokka
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(apiUrl);

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
  }, []);

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

  const newsList = (data && data) || [];

  return (
    <section className={s.cardList}>
      <div className={s.cardList__list}>
        {newsList.map((item) => {

          return (
            <div className={s.cardList__item}>
              <News
                id={item.id}
                limit={5}
                url={item.id}
              />
            </div>
          )
        })}
      </div>
    </section>
  )

}
