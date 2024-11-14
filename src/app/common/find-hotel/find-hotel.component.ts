import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FindHotel, FindHotelService } from '../../services/find-hotel.service'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-find-hotel',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './find-hotel.component.html',
  styleUrls: ['./find-hotel.component.css'],
})
export class FindHotelComponent implements OnInit {
  hotelForm: FormGroup;
  hotels: FindHotel[] = [];
  searchQuery: string = '';
  isSubmitting: boolean = false;
  activeTab: string = 'search';

  constructor(private fb: FormBuilder, private hotelService: FindHotelService) {
    this.hotelForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadHotels();
  }

  
  loadHotels(): void {
    this.hotelService.getHotels().subscribe(
      (hotels) => {
        this.hotels = hotels;
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }

  
  onSearchSubmit(): void {
    if (this.hotelForm.valid) {
      this.searchQuery = this.hotelForm.value.search;
      this.hotelService.searchHotels(this.searchQuery).subscribe(
        (hotels) => {
          this.hotels = hotels;
        },
        (error) => {
          console.error('Error searching hotels:', error);
        }
      );
    }
  }

  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  
  tabClass(tab: string): string {
    return this.activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-700';
  }
}
