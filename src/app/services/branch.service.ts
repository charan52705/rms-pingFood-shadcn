import { Injectable } from '@angular/core';
import axios from 'axios';  // Import axios for HTTP requests
import { Observable, from } from 'rxjs';


export interface Branch {
  id: number;
  branchName: string;
  branchLocation: string;
  branchManager: string;
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'https://api.example.com/branches';  // Replace with your actual API URL

  constructor() {}

  // Get list of branches
  getBranches(): Observable<Branch[]> {
    return from(axios.get(this.apiUrl).then((response) => response.data));
  }

  // Create a new branch
  createBranch(branch: Branch): Observable<Branch> {
    return from(axios.post(this.apiUrl, branch).then((response) => response.data));
  }

  // Update an existing branch
  updateBranch(id: number, branch: Branch): Observable<Branch> {
    return from(axios.put(`${this.apiUrl}/${id}`, branch).then((response) => response.data));
  }

  // Delete a branch
  deleteBranch(branchName: string): Observable<void> {
    return from(axios.delete(`${this.apiUrl}/${branchName}`).then(() => {}));
  }
}
