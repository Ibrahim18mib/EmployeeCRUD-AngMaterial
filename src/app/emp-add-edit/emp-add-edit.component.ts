import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormField,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent {
  education: string[] = ['Mechanic', 'Engineer', 'Degree', 'Post-Degree'];

  empObj: FormGroup;

  constructor(private _fb: FormBuilder,private _empServ:EmployeeService,private _dialogRef:DialogRef<EmpAddEditComponent>) {
    this.empObj = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      designation: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  onFormSubmit() {
    console.log('Form submit clicked');
    if (this.empObj.valid) {
      this._empServ.addEmployee(this.empObj.value).subscribe({
        next: (res:any) => {
          alert('Employee Added Successfully.');
          this._dialogRef.close();
        },
        error: (err:any)=> {
          alert(err);
        }
      })
    }
  }
}
