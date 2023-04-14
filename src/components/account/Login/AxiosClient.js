import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api-gebit', // La URL base de la API
  timeout: 1000, // Tiempo máximo de espera para la respuesta de la API
  headers: { 
    'Content-Type': 'application/json', // Tipo de contenido que se enviará en la solicitud
  }
});

export default instance;