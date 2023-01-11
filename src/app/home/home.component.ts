import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  displayedColumns: string[] = ["user", "email", "mobile", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(private api : ApiService, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.getUser()

  }

  getUser(){
    this.api.getUser()
    .subscribe({
      next:(res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Something went wrong....")
      }
    }) 
  }
  editUser(row : any){
    this.dialog.open(DialogComponent, {
      width: "40%",
      data: row 
    }).afterClosed().subscribe( () => {
      this.getUser();
      window.location.reload();
    });
  }
  deleteUser(id:number){
    this.api.deleteUser(id)
    .subscribe({
      next:(res) => {
        confirm("User deleted")
        this.getUser()
      },
      error:() => {
        alert("Error while deleting")
      }
    })
  } 
}
