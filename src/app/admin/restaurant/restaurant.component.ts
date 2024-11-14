import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';



@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  RestaurantForm: FormGroup;
  isSubmitting: boolean = false;
  activeTab: string = 'create'; 
  isMenuOpen: boolean = false; 

  
  Restaurants: Restaurant[] = [];

  constructor(private fb: FormBuilder, private RestaurantService: RestaurantService) {
    
    this.RestaurantForm = this.fb.group({
      RestaurantName: ['', [Validators.required, Validators.minLength(2)]],
      RestaurantDescription: ['', [Validators.required]],
      RestaurantPrice: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    
    this.loadRestaurants();
  }

  
  loadRestaurants(): void {
    this.RestaurantService.getRestaurants().subscribe(
      Restaurants => {
        this.Restaurants = Restaurants;
      },
      error => {
        console.error('Error fetching Restaurants:', error);
      }
    );
  }

  
  onSubmit(): void {
    if (this.RestaurantForm.valid) {
      this.isSubmitting = true;
      const formData: Restaurant = this.RestaurantForm.value;

      if (this.activeTab === 'create') {
        this.addRestaurant(formData);
      } else if (this.activeTab === 'update') {
        this.updateRestaurant(formData);
      }
    }
  }

  
  addRestaurant(Restaurant: Restaurant): void {
    this.RestaurantService.addRestaurant(Restaurant).subscribe(
      newRestaurant => {
        this.Restaurants.push(newRestaurant); 
        this.RestaurantForm.reset(); 
        this.setActiveTab('read'); 
      },
      error => {
        console.error('Error adding Restaurant:', error);
      }
    );
  }

  
  updateRestaurant(Restaurant: Restaurant): void {
    this.RestaurantService.updateRestaurant(Restaurant).subscribe(
      updatedRestaurant => {
        const index = this.Restaurants.findIndex(existingRestaurant => existingRestaurant.RestaurantName === updatedRestaurant.RestaurantName);
        if (index !== -1) {
          this.Restaurants[index] = updatedRestaurant; 
        }
        this.RestaurantForm.reset(); 
        this.setActiveTab('read'); 
      },
      error => {
        console.error('Error updating Restaurant:', error);
      }
    );
  }

  
  deleteRestaurant(RestaurantName: string): void {
    this.RestaurantService.deleteRestaurant(RestaurantName).subscribe(
      () => {
        this.Restaurants = this.Restaurants.filter(Restaurant => Restaurant.RestaurantName !== RestaurantName); 
      },
      error => {
        console.error('Error deleting Restaurant:', error);
      }
    );
  }

  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.isMenuOpen = false; 
  }

  
  tabClass(tab: string): string {
    return this.activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-700';
  }

  
  selectRestaurantForUpdate(Restaurant: Restaurant): void {
    this.RestaurantForm.patchValue(Restaurant); 
    this.setActiveTab('update'); 
  }
}
