import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService, Menu } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  MenuForm: FormGroup;
  Menus: Menu[] = [];
  selectedMenuId!: number;  
  selectedMenu: Menu | null = null;  
  isSubmitting: boolean = false;
  activeTab: string = 'create'; 
  isMenuOpen: boolean = false;
  searchQuery: string = ''; 
  addMenuForm!:FormGroup

  constructor(private fb: FormBuilder, private menuService: MenuService, private router: Router) {
    
    this.MenuForm = this.fb.group({
      menu_id: ['', [Validators.required]],
      menu_name: ['', [Validators.required, Validators.minLength(2)]],
      menu_description: ['', [Validators.required]],
      menu_type: ['', [Validators.required]],
      menu_active: [false, [Validators.required]],
    });


    
  }

  ngOnInit(): void {

    this.addMenuForm = this.fb.group({
    
      menu_name: ['', [Validators.required, Validators.minLength(2)]],
      menu_description: ['', Validators.required],
      menu_type: ['', Validators.required],
      menu_active: [true],
      item_name: ['', [Validators.required, Validators.minLength(2)]],
      item_description: ['', Validators.required],
      item_price: [0, [Validators.required, Validators.min(0)]],
      item_active: [true],
      restaurant_id: [''], 
      branch_id: [0], 
      item_id: [0], 
    });
    this.loadMenus(); 
  }


  
  loadMenus(): void {
    this.menuService.getMenuItems().then(
      (menus) => {
        this.Menus = menus;
      },
      (error) => {
        console.error('Error fetching menus:', error);
      }
    );
  }

  
  get filteredMenus(): Menu[] {
    return this.Menus.filter((menu) =>
      menu.menu_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  addMenu(): void {
    if (this.addMenuForm.invalid) {
      return; // Stop submission if form is invalid
    }

    this.isSubmitting = true;
    const menuId = this.generateMenuId()
    const menuData: Menu = {
      ...this.addMenuForm.value,
      menu_id: menuId,
      menu_added: new Date().toISOString(), // Auto-generate menu_added timestamp
    };

    // Call the service method to send the menu data to the backend
    this.menuService.addMenuItem(menuData).then(
      (response) => {
        console.log('Menu item added successfully:', response);
        this.isSubmitting = false;

        // Optionally redirect to another page, such as a list of menus
        this.router.navigate(['/menus']);
      },
      (error) => {
        console.error('Error adding menu item:', error);
        this.isSubmitting = false;
      }
    );
  }
  
  generateMenuId(): number {
    return Math.floor(Math.random() * 10000); 
  }
  
  
  
  selectMenuForUpdate(menu: Menu): void {
    
    this.selectedMenu = menu;
    this.MenuForm.patchValue({
      menu_id: menu.menu_id,
      menu_name: menu.menu_name,
      menu_description: menu.menu_description,
      menu_type: menu.menu_type,
      menu_active: menu.menu_active,
    });
    this.setActiveTab('update'); 
  }

  
  updateMenu(): void {
    if (this.MenuForm.valid) {
      this.isSubmitting = true;
      const updatedMenu: Menu = {
        ...this.selectedMenu!, 
        ...this.MenuForm.value, 
      };

      this.menuService.updateMenuItem(updatedMenu).then(
        (updatedMenu) => {
          const index = this.Menus.findIndex(
            (existingMenu) => existingMenu.menu_id === updatedMenu.menu_id
          );
          if (index !== -1) {
            this.Menus[index] = updatedMenu; 
          }
          this.MenuForm.reset(); 
          this.setActiveTab('read'); 
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Error updating menu:', error);
          this.isSubmitting = false;
        }
      );
    }
  }

  
  deleteMenu(menu: Menu): void {
    const confirmation = confirm('Are you sure you want to delete this menu item?');
    if (confirmation) {
      this.menuService.deleteMenuItem(menu.menu_id.toString()).then(
        () => {
          this.Menus = this.Menus.filter((m) => m.menu_id !== menu.menu_id);
        },
        (error) => {
          console.error('Error deleting menu:', error);
        }
      );
    }
  }

  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.isMenuOpen = false; 
  }

  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
  tabClass(tab: string): string {
    return this.activeTab === tab
      ? 'text-black border-b-2 border-black'
      : 'text-gray-700';
  }
}
