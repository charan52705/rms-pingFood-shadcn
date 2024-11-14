// customer.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isCustomer()) {
      console.log('This is  customer')
      return true;  // Allow access if the user is a customer
    } else {
      console.log('This is not Customer')
      this.router.navigate(['/customer/register']);  // Redirect to login page if the user is not a customer
      return false;
    }
  }
}
