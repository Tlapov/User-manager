import { Component, OnInit, Inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  userForm !: FormGroup;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(private api : ApiService, private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData : any) {}
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user : ["", Validators.required],
      email : ["", Validators.required],
      mobile : ["", Validators.required],
    })
    if(this.editData){
      this.userForm.controls["user"].setValue(this.editData.user)
      this.userForm.controls["email"].setValue(this.editData.email)
      this.userForm.controls["mobile"].setValue(this.editData.mobile)
    }
  }
  updateUser(){
    this.api.putUser(this.userForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("User updated succesfully")
        this.userForm.reset();
      },
      error:() => {
        alert("Error while updating....")
      }
    })
  }
    
}
