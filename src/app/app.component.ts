import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FormArray SetValue & PatchValue Example';

  public addStockForm: any;

  public filterStockLabel: any;
  public filterStockLabelDropdown: any;
  public filterStockLabelSpecDropdown: any;
  constructor(private fb: FormBuilder) {
    this.setFormBuilder();
  }
  public stockLabelList: Array<{ text: string; value: number }> = [
    { text: 'Material', value: 1 },
    { text: 'Thickness', value: 2 },
  ];
  public lableType: Array<{ text: string; value: number }> = [
    { text: 'Radio button', value: 1 },
    { text: 'Dropdown', value: 2 },
    { text: 'Description input', value: 3 },
  ];
  public stockLabelListDropdown: Array<{ text: string; value: number }> = [];

  // user role as stock label
  get labelsSection() {
    return this.addStockForm.get('labelArray') as FormArray;
  }
  setFormBuilder() {
    this.addStockForm = this.fb.group({
      stockcode: [''],
      stockGroup: [''],
      stockSubCategory: [''],
      description: [''],
      notes: [''],
      unitOfMeasure: [''],
      labelArray: this.fb.array([
        this.fb.group({
          labelName: [],
          labelType: [],
          labelDescription: [],
          labelRadio: [],
          labelDropdown: [],
          optional: [],
        }),
      ]),
      stockSpecifiction: this.fb.array([
        this.fb.group({
          specifiacationName: [],
          specifiacationType: [],
          specifiacationRadio: [],
          specifiacationDropdown: [],
          specifiacationInput: [],
          specifiacationOptional: [],
          specifiacationShowPO: [],
        }),
      ]),
    });
  }
  public allocateRadio;
  public allocateDropdown;
  public allocateinput;
  public valueChange(e, i) {
    console.log('this worked', e);
    console.log(i);
    switch (e.text) {
      case 'Radio button': {
        this.allocateRadio = true;
        console.log('object', this.allocateRadio);
        break;
      }
      case 'Dropdown': {
        this.allocateDropdown = true;
        // console.log("object", this.allocate);
        break;
      }
      case 'Description input': {
        this.allocateinput = true;
        // console.log("object", this.allocate);
        break;
      }
    }
  }

  addUserRole() {
    this.labelsSection.push(
      this.fb.group({
        labelName: [],
        labelType: [],
        labelDescription: [],
        labelRadio: [],
        labelDropdown: [],
        optional: [],
      })
    );
    console.log(this.labelsSection);
  }
  public addNewStockLabel(): void {
    this.stockLabelList.push({
      text: this.filterStockLabel,
      value: 0,
    });
    this.handleFilterStockLabel(this.filterStockLabel);
  }

  public handleFilterStockLabel(value: any) {
    this.filterStockLabel = value;
    this.stockLabelList = this.stockLabelList.filter(
      (s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  public handleFilterStockDropdown(value: any) {
    this.filterStockLabelDropdown = value;
    this.stockLabelListDropdown = this.stockLabelListDropdown.filter(
      (s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
  public addNewStockLabelDropdown(): void {
    this.stockLabelListDropdown.push({
      text: this.filterStockLabelDropdown,
      value: 0,
    });
    this.handleFilterStockDropdown(this.filterStockLabelDropdown);
  }
  deleteUserRoleSection(index: any) {
    this.labelsSection.removeAt(index);
  }
}
