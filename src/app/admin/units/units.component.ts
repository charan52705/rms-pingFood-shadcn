import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UnitsService, Unit } from '../../services/units.service';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css'
})
export class UnitsComponent {
  UnitForm: FormGroup;
  isSubmitting: boolean = false;
  activeTab: string = 'create'; 
  isMenuOpen: boolean = false; 

  
  Units: Unit[] = [];

  constructor(private fb: FormBuilder, private UnitService: UnitsService) {
    
    this.UnitForm = this.fb.group({
      UnitName: ['', [Validators.required, Validators.minLength(2)]],
      UnitDescription: ['', [Validators.required]],
      UnitPrice: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    
    this.loadUnits();
  }

  
  loadUnits(): void {
    this.UnitService.getUnits().subscribe(
      Units => {
        this.Units = Units;
      },
      error => {
        console.error('Error fetching Units:', error);
      }
    );
  }

  
  onSubmit(): void {
    if (this.UnitForm.valid) {
      this.isSubmitting = true;
      const formData: Unit = this.UnitForm.value;

      if (this.activeTab === 'create') {
        this.addUnit(formData);
      } else if (this.activeTab === 'update') {
        this.updateUnit(formData);
      }
    }
  }

  
  addUnit(Unit: Unit): void {
    this.UnitService.addUnit(Unit).subscribe(
      newUnit => {
        this.Units.push(newUnit); 
        this.UnitForm.reset(); 
        this.setActiveTab('read'); 
      },
      error => {
        console.error('Error adding Unit:', error);
      }
    );
  }

  
  updateUnit(Unit: Unit): void {
    this.UnitService.updateUnit(Unit).subscribe(
      updatedUnit => {
        const index = this.Units.findIndex(existingUnit => existingUnit.UnitName === updatedUnit.UnitName);
        if (index !== -1) {
          this.Units[index] = updatedUnit; 
        }
        this.UnitForm.reset(); 
        this.setActiveTab('read'); 
      },
      error => {
        console.error('Error updating Unit:', error);
      }
    );
  }

  
  deleteUnit(UnitName: string): void {
    this.UnitService.deleteUnit(UnitName).subscribe(
      () => {
        this.Units = this.Units.filter(Unit => Unit.UnitName !== UnitName); 
      },
      error => {
        console.error('Error deleting Unit:', error);
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

  
  selectUnitForUpdate(Unit: Unit): void {
    this.UnitForm.patchValue(Unit); 
    this.setActiveTab('update'); 
  }
}
