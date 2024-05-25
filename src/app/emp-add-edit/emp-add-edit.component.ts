import { Component, Inject, OnInit } from '@angular/core';
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
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { SnackService } from '../core/snack.service';

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
    HttpClientModule,
    MatDialogClose,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent implements OnInit {
  education: string[] = ['Mechanic', 'Engineer', 'Degree', 'Post-Degree'];

  empObj: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empServ: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snack: SnackService
  ) {
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

  ngOnInit(): void {
    this.empObj.patchValue(this.data);
  }

  onFormSubmit() {
    console.log('Form submit clicked');
    if (this.empObj.valid) {
      if (this.data) {
        this._empServ
          .updateEmployee(this.data.id, this.empObj.value)
          .subscribe({
            next: (res: any) => {
              // alert('Employee AddUpdateded Success.');
              this._snack.openSnackBar('Employee AddUpdateded Success.');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              alert(err);
            },
          });
      } else {
        this._empServ.addEmployee(this.empObj.value).subscribe({
          next: (res: any) => {
            // alert('Employee Added Successfully.');
            this._snack.openSnackBar('Employee Added Successfully.', 'Added');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      }
    }
  }
}
