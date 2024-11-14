// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    // Check localStorage or sessionStorage for user info if the app is refreshed
    const storedRole = localStorage.getItem('userRole');
    this.userRole.next(storedRole);
  }

  login(role: string) {
    this.userRole.next(role);
    localStorage.setItem('userRole', role);  // Store the role in localStorage or sessionStorage
  }

  logout() {
    this.userRole.next(null);
    localStorage.removeItem('userRole');
  }

  getRole() {
    return this.userRole.asObservable();
  }

  isAdmin() {
    return this.userRole.getValue() === 'admin';
  }

  isCustomer() {
    return this.userRole.getValue() === 'customer';
  }

  isAuthenticated() {
    return this.userRole.getValue() !== null;
  }
}
