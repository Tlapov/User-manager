import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    userForm !: FormGroup;
    constructor(private formBuilder: FormBuilder, private api: ApiService ) {}   
    ngOnInit(): void {
      this.userForm = this.formBuilder.group({
        user : ["", Validators.required],
        email : ["", Validators.required],
        mobile : ["", Validators.required],
      })
    }
    addUser(){
      if(this.userForm.valid){
        this.api.postUser(this.userForm.value)
        .subscribe({
          next: (res) => {
            alert("User added succesfully");
            this.userForm.reset();
          },
          error: () => {
            alert("Erorr while adding...");
          }
        })
      }
    }
}
