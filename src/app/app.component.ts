import {Component, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ICellRendererParams } from 'ag-grid-community';
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
declare global {
  interface Window {
    angularComponentRef: AppComponent; // Change to your component's name
  }
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
    (window as any).angularComponentRef = this; // Expose the component methods globally

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

  public deleteRow(row: IRow) {
    this.http.delete(`http://localhost:8080/api/delete`, { body: row }) // Send the entire row object as the body
      .subscribe({
        next: () => {
          // Remove the deleted row from local data
          this.rowData = this.rowData.filter(r => r.id !== row.id);
          console.log(`Deleted row with id: ${row.id}`);
        },
        error: (err) => {
          console.error(`Error deleting row with id: ${row.id}`, err);
        }
      });
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef<IRow>[] = [
    { field: 'id'},
    { field: 'lastName'},
    { field: 'firstName'},
    {
      field: 'dob',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toISOString().split('T')[0];  // Format date to "YYYY-MM-DD"
      }
    },
    { field: 'university' },
    { field: 'major' },
    { field: 'graduationYear' },
    {
      headerName: 'Actions',
      cellRenderer: (params: ICellRendererParams) => {
        return `
          <div style="display: flex; justify-content: space-between;">
            <button class="edit-button" style="background:none; border:none; cursor:pointer;"
              onClick="window.angularComponentRef.editRow(${JSON.stringify(params.data)})">
              <i class="fas fa-pencil-alt" style="color: #007bff;"></i>
            </button>
            <button class="delete-button" style="background:none; border:none; cursor:pointer;"
              onClick="window.angularComponentRef.deleteRow(${JSON.stringify(params.data)})">
              <i class="fas fa-trash" style="color: #dc3545;"></i>
            </button>
          </div>
        `;
      }
    }
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };


}
