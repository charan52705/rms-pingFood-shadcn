import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService, Branch } from '../../services/branch.service';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent {
  branchForm!: FormGroup;
  branches: Branch[] = [];
  activeTab: string = 'create';  // Default to 'create' tab
  isSubmitting: boolean = false;
  isMenuOpen: boolean = false;
  selectedBranch: Branch | null = null;  // To store selected branch for update

  constructor(private fb: FormBuilder, private branchService: BranchService) {}

  ngOnInit(): void {
    this.createBranchForm();
    this.getBranches();  // Fetch branches on component initialization
  }

  // Initialize the form
  createBranchForm() {
    this.branchForm = this.fb.group({
      branchName: ['', [Validators.required, Validators.minLength(2)]],
      branchLocation: ['', [Validators.required]],
      branchManager: ['', [Validators.required]]
    });
  }

  // Get list of all branches
  getBranches() {
    this.branchService.getBranches().subscribe(
      (data) => {
        this.branches = data;
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  // Handle tab change
  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'create') {
      this.branchForm.reset();
      this.selectedBranch = null;
    }
  }

  // Toggle mobile menu visibility
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Submit form to add a new branch
  onSubmit() {
    if (this.branchForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const newBranch: Branch = this.branchForm.value;

    if (this.selectedBranch) {
      // If editing, update the branch
      this.branchService.updateBranch(this.selectedBranch.id, newBranch).subscribe(
        () => {
          this.isSubmitting = false;
          this.getBranches();
          this.setActiveTab('read');  // Switch to the "Show Branches" tab
        },
        (error) => {
          console.error('Error updating branch:', error);
          this.isSubmitting = false;
        }
      );
    } else {
      // If adding new, create the branch
      this.branchService.createBranch(newBranch).subscribe(
        () => {
          this.isSubmitting = false;
          this.getBranches();
          this.setActiveTab('read');  // Switch to the "Show Branches" tab
        },
        (error) => {
          console.error('Error creating branch:', error);
          this.isSubmitting = false;
        }
      );
    }
  }

  // Set branch for update
  selectBranchForUpdate(branch: Branch) {
    this.selectedBranch = branch;
    this.branchForm.setValue({
      branchName: branch.branchName,
      branchLocation: branch.branchLocation,
      branchManager: branch.branchManager
    });
    this.setActiveTab('update');
  }

  // Delete branch
  deleteBranch(branchName: string) {
    if (confirm(`Are you sure you want to delete the branch: ${branchName}?`)) {
      this.branchService.deleteBranch(branchName).subscribe(
        () => {
          this.getBranches();  // Refresh the list
        },
        (error) => {
          console.error('Error deleting branch:', error);
        }
      );
    }
  }

  // Dynamically set active tab styling
  tabClass(tab: string) {
    return this.activeTab === tab ? 'text-black border-b-2 border-black' : '';
  }
}
