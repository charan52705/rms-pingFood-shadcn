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
      console.log('Access granted: Customer route');
      return true;  
    } else {
      console.log('Access denied: Not a customer');
      
      
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin/home']);  
      } else {
        
        this.router.navigate(['/customer/register']);
      }
      return false;  
    }
  }
}
