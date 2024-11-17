import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService, Branch } from '../../services/branch.service';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
  branchForm!: FormGroup;
  branches: Branch[] = [];
  activeTab: string = 'create'; // Set default active tab to 'create'
  isSubmitting: boolean = false;
  isMenuOpen: boolean = false;
  selectedBranch: Branch | null = null;
  searchQuery: string = '';
  todayDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // Set today's date in yyyy-MM-dd format

  constructor(private fb: FormBuilder, private branchService: BranchService) {}

  ngOnInit(): void {
    this.createBranchForm();
    this.getBranches(); // Fetch branches when the component is initialized
  }

  // Generate random integer for branch_id
  generateRandomBranchId(): number {
    const MAX = 1e9 + 7;
    return Math.floor(Math.random() * MAX) + 1; // Generate random integer between 1 and MAX
  }

  // Create the form for adding and updating a branch
  createBranchForm() {
    this.branchForm = this.fb.group({
      branch_id: [this.generateRandomBranchId(), [Validators.required]],  // Generate a random integer for branch_id
      branch_name: ['', [Validators.required, Validators.minLength(2)]],
      branch_email: ['', [Validators.required, Validators.email]],
      branch_phone: ['', [Validators.required]], // Phone should be string, but may need conversion for numeric services
      branch_website: ['', [Validators.required]],
      branch_desc: ['', [Validators.required]],
      branch_added: [this.todayDate, [Validators.required]], // Set current date by default
      branch_active: [false, [Validators.required]], // This should be a boolean
      restaurants_id: [uuidv4(), [Validators.required]], // Use 'restaurants_id' to match the API field name
      address_id: [uuidv4(), [Validators.required]], // Generate UUID for address_id
    });
  }

  // Filter branches based on the search query
  get filteredBranches() {
    return this.branches?.filter((branch) =>
      branch.branch_name?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Fetch all branches from the service using async/await
  async getBranches() {
    try {
      const response = await this.branchService.getAllBranches(); // Await the promise to get branches
      this.branches = response;
      console.log(this.branches)
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  }

  // Set the active tab for creating, reading, or updating a branch
  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'create') {
      this.branchForm.reset(); // Reset the form when switching to 'create' tab
      this.selectedBranch = null;
    }
  }

  // Toggle the side menu (used for mobile view)
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Handle form submission for creating a new branch
  async onSubmit() {
    if (this.branchForm.invalid) {
      console.log('Form is invalid!');
      console.log(this.branchForm.errors);
      Object.keys(this.branchForm.controls).forEach((key) => {
        console.log(key, this.branchForm.controls[key].errors);
      });
      return;
    }

    this.isSubmitting = true;

    let formData = { ...this.branchForm.value };
    console.log(formData);

    // Ensure UUIDs are present for the required fields
    if (!formData.branch_id) formData.branch_id = this.generateRandomBranchId(); // Ensure branch_id is generated
    if (!formData.restaurants_id) formData.restaurants_id = uuidv4(); // Ensure restaurants_id is present
    if (!formData.address_id) formData.address_id = uuidv4(); // Ensure address_id is generated

    // Convert string values to the appropriate type where necessary
    if (formData.branch_active === 'true') {
      formData.branch_active = true;
    } else if (formData.branch_active === 'false') {
      formData.branch_active = false;
    }

    // Ensure phone number is treated as a string or number as needed
    if (formData.branch_phone) {
      formData.branch_phone = formData.branch_phone.toString();
    }

    try {
      const response = await this.branchService.createBranch(formData); // Await the promise to create a branch
      console.log(response);
      this.isSubmitting = false;
      this.getBranches(); // Refresh the branch list
      this.setActiveTab('read'); // Switch to the "read" tab
      alert('Branch created successfully!');
    } catch (error) {
      this.isSubmitting = false;
      console.error('Error creating branch:', error);
    }
  }

  // Select a branch for editing (update)
  selectBranchForUpdate(branch: Branch) {
    this.selectedBranch = branch;
    this.branchForm.patchValue({
      branch_id: branch.branch_id,
      branch_name: branch.branch_name,
      branch_email: branch.branch_email,
      branch_phone: branch.branch_phone,
      branch_website: branch.branch_website,
      branch_desc: branch.branch_desc,
      branch_added: branch.branch_added,
      branch_active: branch.branch_active,
      restaurants_id: branch.restaurant_id, 
      address_id: branch.address_id,
    });
    this.setActiveTab('update');
  }

  // Handle the update of an existing branch
  async updateBranch() {
    if (this.branchForm.invalid) {
      console.log('Form is invalid!');
      Object.keys(this.branchForm.controls).forEach((key) => {
        console.log(key, this.branchForm.controls[key].errors);
      });
      return;
    }

    this.isSubmitting = true;

    const formData = { ...this.branchForm.value };

    // Ensure UUIDs are present for the required fields
    if (!formData.branch_id) formData.branch_id = this.generateRandomBranchId(); // Ensure branch_id is generated
    if (!formData.restaurants_id) formData.restaurants_id = uuidv4(); // Ensure restaurants_id is present
    if (!formData.address_id) formData.address_id = uuidv4(); // Ensure address_id is generated

    // Convert string values to the appropriate type where necessary
    if (formData.branch_active === 'true') {
      formData.branch_active = true;
    } else if (formData.branch_active === 'false') {
      formData.branch_active = false;
    }

    // Ensure phone number is treated as a string or number as needed
    if (formData.branch_phone) {
      formData.branch_phone = formData.branch_phone.toString();
    }

    try {
      const response = await this.branchService.updateBranch(formData.branch_id, formData); // Await the update promise
      console.log('Branch updated successfully:', response);
      this.isSubmitting = false;
      this.getBranches(); // Refresh the branch list
      this.setActiveTab('read'); // Switch to the "read" tab
      alert('Branch updated successfully!');
      this.branchForm.reset(); // Reset the form after updating
    } catch (error) {
      console.error('Error updating branch:', error);
      this.isSubmitting = false;
    }
  }

  // Delete a branch
  async deleteBranch(branch: Branch) {
    if (confirm(`Are you sure you want to delete the branch: ${branch.branch_name}?`)) {
      try {
        await this.branchService.deleteBranch(branch.branch_id); // Await the deletion promise
        this.getBranches(); // Refresh the branch list after deletion
        this.selectedBranch = null; // Clear the selected branch
        alert('Branch deleted successfully!');
      } catch (error) {
        console.error('Error deleting branch:', error);
      }
    }
  }

  // Utility function to apply different styles to the active tab
  tabClass(tab: string) {
    return this.activeTab === tab ? 'text-black border-b-2 border-black' : '';
  }
}
