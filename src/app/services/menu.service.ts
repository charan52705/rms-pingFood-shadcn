// menu.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

// Menu Interface
export interface Menu {
  _id: string;
  menu_id: number;
  menu_name: string;
  menu_description: string;
  menu_type: string;
  menu_added: string;
  menu_active: boolean;
  restaurant_id: string;
  branch_id: number;
  item_id: number;
  item_name: string;
  item_description: string;
  item_price: number;
  item_active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'http://localhost:8000';  // Replace this with your actual API URL

  constructor() {}

  // Fetch all menu items
  getMenuItems() {
    return axios.get<Menu[]>(`${this.apiUrl}/menu-items`)
      .then((response: AxiosResponse<Menu[]>) => response.data)
      .catch((error) => {
        console.error('Error fetching menu items:', error);
        throw error;
      });
  }

  // Add a new menu item
  addMenuItem(menu: Menu) {
    return axios.post<Menu>(`${this.apiUrl}/create-menu-item`, menu)
      .then((response: AxiosResponse<Menu>) => response.data)
      .catch((error) => {
        console.error('Error adding menu item:', error);
        throw error;
      });
  }

  // Update an existing menu item
  updateMenuItem(menu: Menu) {
    return axios.put<Menu>(`${this.apiUrl}/menu-item/${menu.menu_id}`, menu)
      .then((response: AxiosResponse<Menu>) => response.data)
      .catch((error) => {
        console.error('Error updating menu item:', error);
        throw error;
      });
  }

  // Delete a menu item
  deleteMenuItem(menuId: string) {
    return axios.delete<void>(`${this.apiUrl}/menu-item/${menuId}`)
      .then((response: AxiosResponse<void>) => response.data)
      .catch((error) => {
        console.error('Error deleting menu item:', error);
        throw error;
      });
  }
}
