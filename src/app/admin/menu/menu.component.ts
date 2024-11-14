import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Menu, MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']  // Corrected styleUrls
})
export class MenuComponent {
  MenuForm: FormGroup;
  isSubmitting: boolean = false;
  activeTab: string = 'create'; 
  isMenuOpen: boolean = false; 

  Menus: Menu[] = [];

  constructor(private fb: FormBuilder, private menuService: MenuService) {  // Fixed the lowercase menuService
    this.MenuForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]], // Adjusted field names
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  // Get menus
  loadMenus(): void {
    this.menuService.getMenuItems().subscribe(  // Corrected method name
      menus => {
        this.Menus = menus;
      },
      error => {
        console.error('Error fetching Menus:', error);
      }
    );
  }

  // Submit form
  onSubmit(): void {
    if (this.MenuForm.valid) {
      this.isSubmitting = true;
      const formData: Menu = this.MenuForm.value;

      if (this.activeTab === 'create') {
        this.addMenu(formData);
      } else if (this.activeTab === 'update') {
        this.updateMenu(formData);
      }
    }
  }

  // Add new menu
  addMenu(menu: Menu): void {
    this.menuService.addMenuItem(menu).subscribe(
      newMenu => {
        this.Menus.push(newMenu); 
        this.MenuForm.reset(); 
        this.setActiveTab('read');  // Adjusted tab
      },
      error => {
        console.error('Error adding Menu:', error);
      }
    );
  }

  // Update existing menu
  updateMenu(menu: Menu): void {
    this.menuService.updateMenuItem(menu).subscribe(
      updatedMenu => {
        const index = this.Menus.findIndex(existingMenu => existingMenu.name === updatedMenu.name);  // Corrected field name
        if (index !== -1) {
          this.Menus[index] = updatedMenu; 
        }
        this.MenuForm.reset(); 
        this.setActiveTab('read');  // Adjusted tab
      },
      error => {
        console.error('Error updating Menu:', error);
      }
    );
  }

  // Delete menu
  deleteMenu(name: string): void {
    this.menuService.deleteMenuItem(name).subscribe(
      () => {
        this.Menus = this.Menus.filter(menu => menu.name !== name);  // Corrected field name
      },
      error => {
        console.error('Error deleting Menu:', error);
      }
    );
  }

  // Toggle menu visibility
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Set active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.isMenuOpen = false; 
  }

  // Get tab style class
  tabClass(tab: string): string {
    return this.activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-700';
  }

  // Pre-fill form for update
  selectMenuForUpdate(menu: Menu): void {
    this.MenuForm.patchValue(menu);  // Corrected field names
    this.setActiveTab('update'); 
  }
}
