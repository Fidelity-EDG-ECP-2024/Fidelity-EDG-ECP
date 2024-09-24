import {Component, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
// import { MatDialog } from '@angular/material/dialog';

interface IRow {
  id: number;
  lastName: string;
  firstName: string;
  dob: string;
  university: string;
  major: string;
  graduationYear: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular, CommonModule, HttpClientModule], // Add Angular Data Grid Component
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

export class AppComponent implements OnInit {
  title = 'GridTest';
  public rowData: IRow[] = [];

  constructor (private http: HttpClient){}
  ngOnInit() {
    this.getMethod();
  }

  public getMethod(){
    this.http.get<IRow[]>('http://localhost:8080/api/get_data')
      .subscribe((data) => {
        if (data && data.length > 0) {
          this.rowData = data;
        } else {
          console.log('No data found, retaining default data.');
        }
    });
  }

  // Row Data: The data to be displayed.

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef<IRow>[] = [
    { field: 'id'},
    { field: 'lastName'},
    { field: 'firstName'},
    { field: 'dob' },
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
