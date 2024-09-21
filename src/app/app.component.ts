import {Component, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {HttpClient} from "@angular/common/http";
// import { MatDialog } from '@angular/material/dialog';

interface IRow {
  studentId: number;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  university: string;
  major: string;
  graduationYear: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular], // Add Angular Data Grid Component
  styleUrls: ['./app.component.css'],
  template:
    `
 <!-- The AG Grid component -->
 <ag-grid-angular
 class="ag-theme-quartz"
 style="height: 500px;"
[rowData]="rowData"
[columnDefs]="colDefs"
[defaultColDef]="defaultColDef"

 />
`
})

export class AppComponent /*implements OnInit*/{
  public getJsonValue:  any;
  //constructor(private http: HttpClient){}
 /* ngOnInit() {
    this.getMethod();
  }

  public getMethod(){
    this.http.get('https://localhost:8080/get_data').subscribe((data) => {
      this.getJsonValue = data;
    })
  }*/
  // Row Data: The data to be displayed.

  rowData: IRow [] =[
    { studentId: 1, lastName: "Sensat", firstName: "Michael", dateOfBirth: "3/5/2003", university: "WPI" , major: "CS", graduationYear: 2025},
    { studentId: 2, lastName: "Song", firstName: "Taeha", dateOfBirth: "3/5/2003", university: "WPI" , major: "CS", graduationYear: 2025},
    { studentId: 3, lastName: "Sensat", firstName: "Michael", dateOfBirth: "3/5/2003", university: "WPI" , major: "CS", graduationYear: 2025},
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef<IRow>[] = [
    { field: 'studentId'},
    { field: 'lastName'},
    { field: 'firstName'},
    { field: 'dateOfBirth' },
    { field: 'university' },
    { field: 'major' },
    { field: 'graduationYear' },
    // {
    //   field: 'actions',
    //   cellRenderer:(params:any) => `
    //   <button class="editbutton" Edit</button>
    //   `
    // }
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };


}
