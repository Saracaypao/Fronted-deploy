import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function Prueba() {

  const testAPI = async () => {
    try {
      const response = await axios.get(API_URL + '/api/test');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  testAPI();

  return <div>Prueba</div>

}