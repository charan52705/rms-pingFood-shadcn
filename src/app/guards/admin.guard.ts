
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'admin') {
      console.log('This is  admin')
      this.router.navigate(['']);  
      return true;  
    } else {
      console.log('This is  not admin')
      this.router.navigate(['']);  
      return false;
    }
  }
}
