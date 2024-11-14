import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemService, Item } from '../../services/item.service';


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  itemForm: FormGroup;
  isSubmitting: boolean = false;
  activeTab: string = 'create'; 
  isMenuOpen: boolean = false; 

  
  items: Item[] = [];

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(2)]],
      itemDescription: ['', [Validators.required]],
      itemPrice: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    
    this.loadItems();
  }

  
  loadItems(): void {
    this.itemService.getItems().subscribe(
      items => {
        this.items = items;
      },
      error => {
        console.error('Error fetching items:', error);
      }
    );
  }

  
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isSubmitting = true;
      const formData: Item = this.itemForm.value;

      if (this.activeTab === 'create') {
        this.addItem(formData);
      } else if (this.activeTab === 'update') {
        this.updateItem(formData);
      }
    }
  }

  
  addItem(item: Item): void {
    this.itemService.addItem(item).subscribe(
      newItem => {
        this.items.push(newItem); 
        this.itemForm.reset(); 
        this.setActiveTab('read'); 
      },
      error => {
        console.error('Error adding item:', error);
      }
    );
  }

  
  updateItem(item: Item): void {
    this.itemService.updateItem(item).subscribe(
      updatedItem => {
        const index = this.items.findIndex(existingItem => existingItem.itemName === updatedItem.itemName);
        if (index !== -1) {
          this.items[index] = updatedItem; 
        }
        this.itemForm.reset(); 
        this.setActiveTab('read'); 
      },
      error => {
        console.error('Error updating item:', error);
      }
    );
  }

  
  deleteItem(itemName: string): void {
    this.itemService.deleteItem(itemName).subscribe(
      () => {
        this.items = this.items.filter(item => item.itemName !== itemName); 
      },
      error => {
        console.error('Error deleting item:', error);
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

  
  selectItemForUpdate(item: Item): void {
    this.itemForm.patchValue(item); 
    this.setActiveTab('update'); 
  }
}
