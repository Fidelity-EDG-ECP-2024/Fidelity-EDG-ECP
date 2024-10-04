import {Component, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ICellRendererParams } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community';
import { PopupCellRenderer } from './popup-cell/popup-cell-renderer.component';
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
 [gridOptions]="gridOptions"
[rowData]="rowData"
[columnDefs]="colDefs"
[defaultColDef]="defaultColDef"
 [editType]="'fullRow'"
 [suppressClickEdit]="true"
 [animateRows]="true"
 (gridReady)="onGridReady($event)"
 (selectionChanged)="onSelectionChanged($event)"
 (cellClicked)="onCellClicked($event)"
 />
`
})

export class AppComponent implements OnInit {
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public selectedRow: any;
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  onSelectionChanged(event: any) {
    this.selectedRow = event.api.getSelectedRows();
    console.log(this.selectedRow);
  }
  onCellClicked(params:any) {
    if (
      params.event.target.dataset.action == 'toggle' &&
      params.column.getColId() == 'action'
    ) {
      const cellRendererInstances = params.api.getCellRendererInstances({
        rowNodes: [params.node],
        columns: [params.column],
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        instance.togglePopup();
      }
    }
  }
  title = 'GridTest';
  public rowData: IRow[] = [];
  constructor (private http: HttpClient){
    this.gridOptions = {
      rowSelection: 'single', // or 'multiple'
      editType: 'fullRow',
      animateRows: true,
      suppressClickEdit: true,
      defaultColDef: { flex: 1, minWidth: 100 }
    };
  }
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

  public deleteRow(id: number) {
    let params = new HttpParams().set('id', id);
    this.http.post(`http://localhost:8080/api/delete_data?id=${id}`,{}) // Send the entire row object as the body
      .subscribe({
        next: () => {
          // // Remove the deleted row from local data
          // this.rowData = this.rowData.filter(r => r.id !== id);
          this.rowData=[];
          this.getMethod();

          this.gridApi.refreshCells();
          console.log(`Deleted row with id: ${id}`);
        },
        error: (err) => {
          console.error(`Error deleting row with id: ${id}`, err);
        }
      });
  }
//
// <div style="display: flex; justify-content: space-between;">
//   <button class="edit-button" style="background:none; border:none; cursor:pointer;"
//   onClick="window.angularComponentRef.editRow(${JSON.stringify(params.data)})">
//   <i class="fas fa-pencil-alt" style="color: #007bff;"></i>
//     </button>
//     <button class="delete-button" style="background:none; border:none; cursor:pointer;"
//   onClick="window.angularComponentRef.deleteRow(${params.data.id})">
//   <i class="fas fa-trash" style="color: #dc3545;"></i>
//     </button>
//     </div>
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef<IRow>[] = [
    {
      headerName: 'Action',
      cellRenderer: PopupCellRenderer,
      colId: 'action',
      pinned: 'left',
      editable: false,
      maxWidth: 150,
    },
    { field: 'id', editable:true},
    { field: 'lastName', editable:true},
    { field: 'firstName', editable:true},
    {
      field: 'dob', editable:true,
      valueGetter:  function(params) {
         {
            if (params.data && "dob" in params.data) {
              const birth: string = params.data.dob;
              const date = new Date(birth);
              return date.toISOString().split('T')[0];  // Format date to "YYYY-MM-DD"
            }
            return;

        }
        return params;
      }
    },
    { field: 'university' , editable:true},
    { field: 'major' , editable:true},
    { field: 'graduationYear' , editable:true},


  ];

  defaultColDef: ColDef = {

    flex: 1,
  };


}
