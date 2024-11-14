import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindFood, FindFoodService } from '../../services/find-food.service'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-find-food',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './find-food.component.html',
  styleUrls: ['./find-food.component.css'],
})
export class FindFoodComponent implements OnInit {
  foodForm: FormGroup;
  foods: FindFood[] = [];
  searchQuery: string = '';
  isSubmitting: boolean = false;
  activeTab: string = 'search'; // Default tab

  constructor(private fb: FormBuilder, private foodService: FindFoodService) {
    this.foodForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFoods();
  }

  // Load all food items
  loadFoods(): void {
    this.foodService.getFoods().subscribe(
      (foods) => {
        this.foods = foods;
      },
      (error) => {
        console.error('Error fetching foods:', error);
      }
    );
  }

  // Handle search submission
  onSearchSubmit(): void {
    if (this.foodForm.valid) {
      this.searchQuery = this.foodForm.value.search;
      this.foodService.searchFoods(this.searchQuery).subscribe(
        (foods) => {
          this.foods = foods;
        },
        (error) => {
          console.error('Error searching foods:', error);
        }
      );
    }
  }

  // Set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Tab class for active tab styling
  tabClass(tab: string): string {
    return this.activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-700';
  }
}
