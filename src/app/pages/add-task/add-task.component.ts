import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataServiceService } from 'src/app/services/user-data-service.service';
import Swal from 'sweetalert2';
import { MyDate } from './myDate';

@Component({
  selector: 'app-task-form',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  crudOperation: FormGroup;
  formType: any;
  submitted: boolean = false;
  resultsLength: any;
  dataSource: any;
  paginator: any;
  sort: any;
  http: any;
  inputvalue = "";
  age: any;
  date: any;
  formHeading: string; 
  private _userDataService: any;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _userService: UserDataServiceService) {
    this.formType = this._activatedRoute.snapshot.paramMap.get('id1');
    this.formHeading = this.formType === 'edit' ? 'Edit Form' : 'Add Form';

    //Validations
    this.crudOperation = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]+$"),
      ]),
      body: new FormControl(''),
    //   email: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    //   ]),
    //   date: new FormControl('', [
    //     Validators.required
    //   ]),
    //   pancard: new FormControl('', [
    //     Validators.pattern("/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/")
    //   ]),
    //   age: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.formType === 'edit') {
      const record = this._userService.getEditRecord();
      console.log('Record to edit:', record);
      if (record) {
        this.crudOperation.patchValue({
          id: record.id,
          title: record.title,
          body: record.body
        });
        this.crudOperation.controls['id'].disable();
      }
    }
    this.getMethod();
  }

  // get All post
  getMethod() {
    this._userService.getAllPost().subscribe((data: any) => {
      this.resultsLength = data.length;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
//Add post
  addForm() {
    if (this.crudOperation.valid) {
      this._userService.addPost(this.crudOperation.getRawValue()).subscribe(
        (response: any) => {
          if (response) {
            console.log('New post added:', response);
            Swal.fire({
              icon: 'success',
              title: 'Entry Added',
              text: 'The entry has been successfully Added.',
              allowOutsideClick: false
            });
            this._router.navigate(['/detail-view']);
          }
        },
        (error) => {
          console.error('Error adding post:', error);
        }
      );
    }
  }
//Update Post
  updateForm() {
    if (this.crudOperation.valid) {
      this._userService.updatePost(this.crudOperation.getRawValue()).subscribe(
        (response: any) => {
          console.log('Post updated:', response);
          Swal.fire({
            icon: 'success',
            title: 'Entry Edited',
            text: 'The entry has been successfully edited.',
            allowOutsideClick: false
          });
          this._router.navigate(['/detail-view']);
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.formType == "add") {
      this.crudOperation.patchValue({
        id: this.generateUniqueId() 
      });
      this.addForm();
    } else if (this.formType == "edit") {
      this.updateForm();
      console.log("edit");
    }
    this._router.navigate(['/detail-view']);
  }
 //Auto Id generator
    private generateUniqueId(): number {
      return Math.floor(Math.random() * 1000); 
    }
    
//Age Calculator
  ageCalculator() {
    if (this.crudOperation.value.date) {
      const dob = new Date(this.crudOperation.value.date);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      this.age = age;
    }
  }
}



