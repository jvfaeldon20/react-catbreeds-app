import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../App.css'

const CatsPage = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL="https://api.thecatapi.com/v1"
  const API_KEY="live_3q8Jm4SF2ZeHJdmYAWKIN8SWtrmjWEwqe8EYJVx52IEf95nLHyfrcaEla5Zwj9Vg"

  const fetchBreeds = async () => {
    try {
      // get breed info
      const response = await axios.get(`${API_BASE_URL}/breeds`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      setBreeds(response.data);
    } catch (error) {
      alert('Failed to fetch breeds. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // get selected breed image
      const { data } = await axios.get(`${API_BASE_URL}/images/search?limit=5&breed_ids=${selectedBreed}&page=${page}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      setImages(data);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log('Error fetching data..', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedBreed, page, API_BASE_URL, API_KEY]);

  const handleBreedChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedBreed(selectedValue);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setIsLoading(false)
  };

  useEffect(() => {
    if (selectedBreed) {
      fetchImages();
    }
  }, [selectedBreed, fetchImages]);

  return (
    <Row>
      <h1>Cat App</h1>
      
      {/*select breed dropdown*/}
      <Row>
        <Col md="2">
          <label htmlFor="dropdown-basic">Breed</label>
          <Form.Select 
            value={selectedBreed} 
            onChange={handleBreedChange}
          >
            <option>Select a breed</option>
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.id}>{breed.name}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/*breed data*/}
      <Row className='breeds'>
        {
          images.map((image, index) => (
            <div 
              key={index} 
              className="card" 
              style={{"width": "17rem"}}
            >
              <img 
                className="card-img-top" 
                src={image.url} 
                alt="cat"
              />
              <div 
                className="card-body">
                <Link 
                  to={`/cats/${image.id}`} 
                  className="btn btn-primary btn-block"
                >View details</Link>
              </div>
            </div>
          ))
        }
      </Row>

      {/*load more breed data*/}
      {isLoading && (
        <Button 
          variant='success' 
          onClick={loadMoreImages} 
          className='width-sm'
        >
          { images.length > 0 ? "Load more" : "Loading..." }
        </Button>
      )}

    </Row>
  );
};

export default CatsPage;
