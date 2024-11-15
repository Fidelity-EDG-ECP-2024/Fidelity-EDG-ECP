import {Component, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ICellRendererParams } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbar} from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatSlider, MatSliderRangeThumb} from "@angular/material/slider";
// import FidelityLogo from "../../public/FidelityLogo.jpg"

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
  imports: [AgGridAngular, HttpClientModule, MatButtonModule, MatIconModule, MatTooltipModule, MatToolbar, NgOptimizedImage, MatTabGroup, MatTab, MatCardTitle, MatSelect, MatFormField, MatOption, MatLabel, MatSlider, MatSliderRangeThumb],
  styleUrls: ['./app.component.css'],
  standalone: true,
  template:
    `
      <mat-toolbar style="background: #6D933E">
        <img ngSrc="../assets/FidelityLogo.jpg" alt="Fidelity Logo Here" height="64" width="114">
      </mat-toolbar>
      <mat-card-title style="position: absolute;width: 100%;text-align: center; height: 50%; top:8%;">Configuration
        Settings
      </mat-card-title>
      <mat-tab-group style="position: absolute; top: 10%; left: 20%; width: 60%;">
        <mat-tab label="Manager Settings">
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; background-color: #f0f0f0; gap:1vh">
            <div></div>
            <mat-form-field appearance="fill" style="width: 45%; margin-bottom: 2vh;">
              <mat-label>Select A Manager</mat-label>
              <mat-select>
                <mat-option value="1">Bob</mat-option>
                <mat-option value="2">Steve</mat-option>
                <mat-option value="3">Joe</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="fill" style="align-self: start; padding-left: 5%; width: 20%;">
              <mat-label style="color: #368727;">Preferred Locations</mat-label>
              <mat-select multiple>
                <mat-option value="1">Boston</mat-option>
                <mat-option value="2">Rhode Island</mat-option>
                <mat-option value="3">New York</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-card-title style="align-self: start; padding-left: 5%">Label: Intern Bounds</mat-card-title>
            <mat-slider min="0" max="1200" discrete="" style="width: 90%;" showTickMarks="true">
              <input value="0" matSliderStartThumb>
              <input value="1200" matSliderEndThumb>
            </mat-slider>
            <div style="display: flex; justify-content: space-between; font-size: 12px; padding-top: 1vh;padding-left: 1.5%; width: 90%; padding-bottom: 1vh;">
              <span>0</span>
              <span>200</span>
              <span>400</span>
              <span>600</span>
              <span>800</span>
              <span>1000</span>
              <span>1200</span>
            </div>
          </div>
        </mat-tab>
        <mat-tab label="Location Settings" style="height: 100%">
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; background-color: #f0f0f0; gap:1vh">
            <div></div>
            <mat-form-field appearance="fill" style="width: 35%; margin-bottom: 2vh;">
              <mat-label>Select A Location</mat-label>
              <mat-select>
                <mat-option value="1">Bob</mat-option>
                <mat-option value="2">Steve</mat-option>
                <mat-option value="3">Joe</mat-option>
              </mat-select>
            </mat-form-field>
            <div style="height: 5.824vh"></div>
            <mat-card-title style="align-self: start; padding-left: 5%">Label: Intern Bounds</mat-card-title>
            <mat-slider min="0" max="1200" discrete="" style="width: 90%;" showTickMarks="true">
              <input value="0" matSliderStartThumb>
              <input value="1200" matSliderEndThumb>
            </mat-slider>
            <div style="display: flex; justify-content: space-between; font-size: 12px; padding-top: 1vh;padding-left: 1.5%; width: 90%;padding-bottom: 1vh;">
              <span>0</span>
              <span>200</span>
              <span>400</span>
              <span>600</span>
              <span>800</span>
              <span>1000</span>
              <span>1200</span>
            </div>
          </div>
        </mat-tab>
        <mat-tab label="Skill Profile" style="height: 100%">
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; background-color: #f0f0f0; gap:1vh">
            <div></div>
            <mat-form-field appearance="fill" style="width: 35%; margin-bottom: 2vh;">
              <mat-label>Select A Profile</mat-label>
              <mat-select>
                <mat-option value="1">CS</mat-option>
                <mat-option value="2">Marketing</mat-option>
                <mat-option value="3">HR</mat-option>
              </mat-select>
            </mat-form-field>
            <div style="height: 5.824vh"></div>
            <mat-card-title style="align-self: start; padding-left: 5%">Label: Intern Bounds</mat-card-title>
            <mat-slider min="0" max="1200" discrete="" style="width: 90%;" showTickMarks="true">
              <input value="0" matSliderStartThumb>
              <input value="1200" matSliderEndThumb>
            </mat-slider>
            <div style="display: flex; justify-content: space-between; font-size: 12px; padding-top: 1vh;padding-left: 1.5%; width: 90%;padding-bottom: 1vh;">
              <span>0</span>
              <span>200</span>
              <span>400</span>
              <span>600</span>
              <span>800</span>
              <span>1000</span>
              <span>1200</span>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>

      <div style="display: flex; justify-content: center; margin-top: 38vh;">
        <button mat-flat-button style="background-color: #368727">Generate Intern Placement</button>
      </div>
    `
})

export class AppComponent implements OnInit {
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public selectedRow: any;
  public icons = {
    edit: '<span class="ag-icon ag-icon-edit"></span>',
    delete: '<span class="ag-icon ag-icon-delete"></span>',
  }
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
  private validateRowData(row: IRow): boolean {
    return (
      row.lastName.trim() !== '' &&
      row.firstName.trim() !== '' &&
      row.university.trim() !== '' &&
      row.major.trim() !== '' &&
      row.graduationYear !== 0
    );
  }
  public onRowValueChanged(event: any) {
    const updatedRow: IRow = event.data; // Get the updated row data
    if(this.validateRowData(updatedRow)){
    this.editRowDB(updatedRow); // Call editRowDB to send updated data to the server
      }
  }
  public addRow() {
    // Create a new row object with default or blank values
    const newRow: IRow = {
      id: this.generateId(), // You should implement a unique ID generator or use a service
      firstName: '',
      lastName: '',
      university: '',
      major: '',
      graduationYear: 0,
      dob: new Date().toISOString()
    };
    this.addRowDB(newRow);
    // Use applyTransaction to add the new row
    this.gridApi.applyTransaction({ add: [newRow], addIndex: this.rowData.length });
    this.gridApi.refreshCells();
    this.editRow(newRow.id);
  }

  private generateId(): number {
    // Simple ID generator (can be replaced with more sophisticated logic)
    return this.rowData.length ? Math.max(...this.rowData.map(r => r.id)) + 1 : 1;
  }
  title = 'GridTest';
  public rowData: IRow[] = [];
  constructor (private http: HttpClient){
    this.gridOptions = {
      rowSelection: 'single', // or 'multiple'
      editType: 'fullRow',
      animateRows: true,
      suppressClickEdit: true,
      defaultColDef: { flex: 1, minWidth: 100 },
      getRowId: (params) => params.data.id.toString()
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
  public editRow(id:number){
    const rowNode = this.gridApi.getRowNode(id.toString());
    if (rowNode) {
      this.gridApi.startEditingCell({
        rowIndex: rowNode.rowIndex!,
        colKey: 'id'
      });
    }

  }

  public deleteRow(id: number) {
    let params = new HttpParams().set('id', id);
    this.http.post(`http://localhost:8080/api/delete_data?id=${id}`,{}) // Send the entire row object as the body
      .subscribe({
        next: () => {

          const rowNode = this.gridApi.getRowNode(id.toString()); // Assuming `id` is the key for the row

          if (rowNode) {
            // Use applyTransaction to remove the specific row
            this.gridApi.applyTransaction({ remove: [rowNode.data] });
          }
        this.gridApi.refreshCells();
          console.log(`Deleted row with id: ${id}`);
        },
        error: (err) => {
          console.error(`Error deleting row with id: ${id}`, err);
        }
      });
  }
//

  public editRowDB(row: IRow) {
    this.http.post(`http://localhost:8080/api/update_data`,row) // Send the entire row object as the body
      .subscribe({
        next: () => {
          this.getMethod();

          this.gridApi.refreshCells();
          console.log(`edited row with id: ${row.id}`);
        },
        error: (err) => {
          console.error(`Error editing row with id: ${row.id}`, err);
        }
      });
  }


  public addRowDB(row: IRow) {
    this.http.post(`http://localhost:8080/api/add_data`,row) // Send the entire row object as the body
      .subscribe({
        next: () => {
          this.getMethod();

          this.gridApi.refreshCells();
          console.log(`added row with id: ${row.id}`);
        },
        error: (err) => {
          console.error(`Error adding row with id: ${row.id}`, err);
        }
      });
  }

  colDefs: ColDef<IRow>[] = [

    { field: 'id', flex: 0.5, editable:false, sort: 'asc'},
    { field: 'lastName', editable:true, },
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
      }
    },
    { field: 'university' , editable:true },
    { field: 'major' , editable:true},
    { field: 'graduationYear' , editable:true},
    {
      headerName: 'Action',
      colId: 'action',
      pinned: 'right',
      editable: false,
      flex: 0.5,
      cellRenderer: (params: ICellRendererParams) => {
        return `
        <div>
          <button mat-mini-fab onclick="window.angularComponentRef.editRow(${params.data.id})">
            <span class="material-icons">edit</span>
          </button>
          <button mat-mini-fab color="warn" onclick="window.angularComponentRef.deleteRow(${params.data.id})">
            <span class="material-icons">delete</span>
          </button>
        </div>
      `;
      }
    },

  ];
  defaultColDef: ColDef = {

    flex: 1,
  };

}
