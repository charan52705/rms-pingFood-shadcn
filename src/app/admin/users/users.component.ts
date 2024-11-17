import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';  // Import the service and User interface
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AxiosError } from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isMenuOpen: boolean = false;
  activeTab: string = 'create';  // Default active tab
  Users: User[] = [];
  selectedUser: User | null = null;  // To track the selected user for updating or deleting
  UserForm: FormGroup;
  isSubmitting: boolean = false;
  searchQuery: string = '';  // For search functionality

  constructor(private userService: UserService, private fb: FormBuilder) {
    // Initialize the form group
    this.UserForm = this.fb.group({
      user_id: [''],  // For user ID (hidden)
      UserName: ['', [Validators.required, Validators.minLength(2)]],
      UserState: ['', [Validators.required, Validators.minLength(2)]],
      UserCountry: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]] // Simple postal code validation
    });
  }

  ngOnInit(): void {
    this.getAllUsers();  // Fetch users on component initialization
  }

  // Toggle menu for mobile view
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'update' && this.selectedUser) {
      // Pre-populate the form with the selected user's data for updating
      this.UserForm.patchValue({
        user_id: this.selectedUser.id,
        UserName: this.selectedUser.firstname,
        UserState: this.selectedUser.address_state,
        UserCountry: this.selectedUser.address_city,
        postalCode: this.selectedUser.address_zip
      });
    }
  }

  // Return dynamic classes for active tab
  tabClass(tab: string): string {
    return this.activeTab === tab ? 'border-b-4 border-black' : 'text-gray-600 hover:text-black';
  }

  // Fetch all users
  getAllUsers(): void {
    this.userService.getAllUsers().then(
      (response) => {
        this.Users = response.data;
      },
      (error: AxiosError) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Filter users based on the search query
  get filteredUsers(): User[] {
    if (!this.searchQuery) {
      return this.Users;
    }
    return this.Users.filter((user) =>
      user.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Handle form submission for creating a user
  onSubmit(): void {
    if (this.UserForm.invalid) {
      return; // Return early if form is invalid
    }

    this.isSubmitting = true;
    const user: User = {
      id: 0, // id will be set by the backend or generated
      firstname: this.UserForm.value.UserName,
      lastname: '',
      email: '',
      phone: '',
      password: '',
      address_street: '',
      address_city: this.UserForm.value.UserCountry,
      address_state: this.UserForm.value.UserState,
      address_zip: parseInt(this.UserForm.value.postalCode),
      user_active: true,
      role: 'User',  // Default to 'User' role, adjust as needed
    };

    this.userService.createUser(user).then(
      (response) => {
        console.log('User created successfully:', response.data);
        this.UserForm.reset(); // Reset the form after successful submission
        this.getAllUsers();  // Refresh the list of users
        this.isSubmitting = false;
      },
      (error: AxiosError) => {
        console.error('Error creating user:', error);
        this.isSubmitting = false;
      }
    );
  }

  // Handle edit user (populate the form for update)
  onEditUser(user: User): void {
    this.selectedUser = user;
    this.setActiveTab('update');
  }

  // Handle user update
  updateUser(): void {
    // Ensure a user is selected
    if (!this.selectedUser) {
      return; // Return early if no user is selected
    }

    // Ensure the form is valid
    if (this.UserForm.invalid) {
      return; // Return early if form is invalid
    }

    // Construct the updated user object based on form values
    const updatedUser: User = {
      ...this.selectedUser,  // Keep existing user data
      firstname: this.UserForm.value.UserName,  // Update fields from the form
      address_state: this.UserForm.value.UserState,
      address_city: this.UserForm.value.UserCountry,
      address_zip: parseInt(this.UserForm.value.postalCode, 10), // Ensure postal code is a number
    };

    // Set the submitting flag
    this.isSubmitting = true;

    // Call the service to update the user, passing the user ID and updated user data
    this.userService.updateUser(this.selectedUser.id, updatedUser).then(
      (response) => {
        console.log('User updated successfully:', response.data);
        this.getAllUsers();  // Refresh the list of users after update
        this.isSubmitting = false;
        this.selectedUser = null;  // Reset the selected user after update
        this.setActiveTab('read'); // Switch back to 'read' tab
      },
      (error: AxiosError) => {
        console.error('Error updating user:', error);
        this.isSubmitting = false;
      }
    );
  }

  // Handle user deletion
  onDeleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).then(
        (response) => {
          console.log('User deleted successfully:', response.data);
          this.getAllUsers();  // Refresh the list of users after deletion
        },
        (error: AxiosError) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
