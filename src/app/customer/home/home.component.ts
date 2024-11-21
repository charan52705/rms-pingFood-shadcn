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

  isUserMenuVisible = true

  constructor(private authService:AuthService){}

  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
  featuredDishes = [
    { name: "Truffle Risotto", description: "Creamy Arborio rice with black truffle and Parmesan" , image:'https://mipikale.com/wp-content/uploads/2021/12/truffle-risotto.jpg'},
    { name: "Seared Scallops", description: "Pan-seared scallops with cauliflower purée and bacon crumbs", image:'https://www.foodandwine.com/thmb/TDK2MFuyi2mb4jH66Waf9i1XsNs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/seared-scallops-with-pomegranate-and-meyer-lemon-FT-RECIPE0321-7189303d38de41449c6b501c8663541c.jpg' },
    { name: "Wagyu Steak", description: "A5 Wagyu beef with roasted vegetables and red wine jus", image:'https://www.foodandwine.com/thmb/TDK2MFuyi2mb4jH66Waf9i1XsNs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/seared-scallops-with-pomegranate-and-meyer-lemon-FT-RECIPE0321-7189303d38de41449c6b501c8663541c.jpg' }
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
    this.openUserMenu()
    window.location.reload()
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
  openUserMenu():boolean {
    this.isUserMenuVisible = !this.isUserMenuVisible
    return this.isUserMenuVisible
  }

}
