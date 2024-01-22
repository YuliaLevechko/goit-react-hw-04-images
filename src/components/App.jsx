import React, { useState, useEffect } from 'react';
import { fetchImages } from './feachImage/FeachImage';

import Button from './Button';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (inputData.trim() === '') {
        return;
      }

      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(inputData, 1);
        if (hits.length < 1) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setItems(hits);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchData();
  }, [inputData]); 

  const onNextPage = async () => {
    try {
      setStatus('pending');
      const { hits } = await fetchImages(inputData, page + 1);
      setItems((prevState) => [...prevState, ...hits]);
      setPage((prevPage) => prevPage + 1);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

  return (
    <div>
      <Searchbar onSubmit={setInputData} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>Something wrong, try later</p>}
      {status === 'resolved' && (
        <div>
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={onNextPage} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;