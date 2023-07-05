import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CatItemPage = () => {
  const { catId } = useParams();
  const [catData, setCatData] = useState(null);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get(
          `https://api.thecatapi.com/v1/images/${catId}?limit=10`
        );
        setCatData(response.data);
      } catch (error) {
        alert('Failed to fetch cat data. Please try again later.');
      }
    };

    fetchCatData();
  }, [catId]);

  if (!catData) {
    return <p>Loading cat data...</p>;
  }

  return (
    <div>
        <div className="card">
          <div className="card-header">
            <Link 
              to="/" 
              className="btn btn-primary"
            >Back</Link>
          </div>
          <div className="card-body">
            <img 
              className="card-img-top img-fluid" 
              src={catData.url} 
              alt="cat"
            />
            <div className='card-info'>
              <h4 className="card-title">{catData.breeds[0].name}</h4>
              <h5>Origin: {catData.breeds[0].origin}</h5>
              <h6>Description: {catData.breeds[0].temperament}</h6>
              <p>Description: {catData.breeds[0].description}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CatItemPage;
