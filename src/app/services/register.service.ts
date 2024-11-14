import { Injectable } from '@angular/core';
import axios from 'axios';  // Import Axios

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://127.0.0.1:8000/register';  

  constructor() {} 

  register(userData: any) {
    return axios.post(this.apiUrl, userData)
      .then(response => response.data)
      .catch(error => {
        throw error.response ? error.response.data : error.message;
      });
  }
}
