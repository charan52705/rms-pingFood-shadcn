// src/app/services/branch.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your API base URL
export interface Branch {
  branch_id: number;
  branch_name: string;
  branch_email: string;
  branch_phone: string;
  branch_website: string;
  branch_desc: string;
  branch_added: string;
  branch_active: boolean;
  restaurant_id: string;
  address_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor() { }

  createBranch(branchData: any) {
    return axios.post(`${BASE_URL}/create-branch/`, branchData)
      .then(response => response.data)
      .catch(this.handleError);
  }

  getBranch(branchId: number) {
    return axios.get(`${BASE_URL}/branch/${branchId}`)
      .then(response => response.data)
      .catch(this.handleError);
  }

  updateBranch(branchId: number, branchData: any) {
    return axios.put(`${BASE_URL}/branch/${branchId}`, branchData)
      .then(response => response.data)
      .catch(this.handleError);
  }

  deleteBranch(branchId: number) {
    return axios.delete(`${BASE_URL}/branch/${branchId}`)
      .then(response => response.data)
      .catch(this.handleError);
  }

  getAllBranches() {
    return axios.get(`${BASE_URL}/branches/`)
      .then(response => response.data)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('API Error: ', error);
    throw new Error(error.response?.data?.detail || 'An error occurred');
  }
}
