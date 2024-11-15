import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isMobileMenuVisible = false;

  userRole:string = ''

  constructor(private authService:AuthService){}

  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
  featuredDishes = [
    { name: "Truffle Risotto", description: "Creamy Arborio rice with black truffle and Parmesan" },
    { name: "Seared Scallops", description: "Pan-seared scallops with cauliflower purée and bacon crumbs" },
    { name: "Wagyu Steak", description: "A5 Wagyu beef with roasted vegetables and red wine jus" }
  ];


 adminMenu = [
  {name: "Dashboard", link:'/admin/home'},

  
 ]



  isUserLoggedIn() : boolean {
    
    return (this.authService.isAdmin() || this.authService.isCustomer())
  }

  getUserRole():string {
    if(this.isUserLoggedIn()) {
     this.userRole = 'none'
     return this.userRole
    }
    if(this.authService.isAdmin()) {
      this.userRole = 'Admin'
      return this.userRole
    }
    this.userRole = 'Customer'
    return this.userRole
  }

  logout() {
    this.authService.logout()
  }

  submitForm(form: any) {
    if (form.valid) {
      console.log('Form submitted', form.value);
   
    }
  }

  subscribeNewsletter(email: string) {
    console.log('Subscribing email:', email);
   
  }

}
