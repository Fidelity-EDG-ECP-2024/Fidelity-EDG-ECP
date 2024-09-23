import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, GridApi } from 'ag-grid-community'; // GridApi for AG Grid
import { HttpClient } from '@angular/common/http'; // Import HttpClient for HTTP requests

// Interface to define the structure of row data
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
  template: `
    <button (click)="addNewRow()">Add New Row</button>
    <!-- The AG Grid component -->
    <ag-grid-angular
      class="ag-theme-quartz"
      style="height: 500px; width: 100%;"
      [rowData]="rowData"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `
})

export class AppComponent {
  title = 'GridTest';
  private gridApi!: GridApi; // Grid API to manipulate grid programmatically

  rowData: IRow[] = [
    { studentId: 1, lastName: "Sensat", firstName: "Michael", dateOfBirth: "3/5/2003", university: "WPI", major: "CS", graduationYear: 2025 },
    { studentId: 2, lastName: "Song", firstName: "Taeha", dateOfBirth: "3/5/2003", university: "WPI", major: "CS", graduationYear: 2025 },
    { studentId: 3, lastName: "Sensat", firstName: "Michael", dateOfBirth: "3/5/2003", university: "WPI", major: "CS", graduationYear: 2025 },
  ];

  // Column Definitions: Defines the columns to be displayed, including Edit and Delete actions
  colDefs: ColDef[] = [
    { field: 'studentId', headerName: 'Student ID' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'dateOfBirth', headerName: 'Date of Birth' },
    { field: 'university', headerName: 'University' },
    { field: 'major', headerName: 'Major' },
    { field: 'graduationYear', headerName: 'Graduation Year' },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const div = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.addEventListener('click', () => this.onEditRow(params));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => this.onDeleteRow(params));

        div.appendChild(editButton);
        div.appendChild(deleteButton);

        return div;
      }
    }
  ];

  defaultColDef: ColDef = {
    flex: 1, // Make all columns flexible in width
  };

  // Grid Ready event handler to get a reference to the grid API
  onGridReady(params: any) {
    this.gridApi = params.api; // Storing grid API for later use
  }

  onEditRow(params: any) {
    const selectedData = params.data;

    // Prompt for the new values
    const newFirstName = prompt("Edit First Name", selectedData.firstName);
    const newLastName = prompt("Edit Last Name", selectedData.lastName);
    const newGraduationYear = prompt("Edit Graduation Year", selectedData.graduationYear.toString());

    // If any prompt is cancelled, stop the edit
    if (newFirstName === null || newLastName === null || newGraduationYear === null) {
      return; // User cancelled the prompt
    }

    // Validate that the graduation year is a number
    const parsedGraduationYear = parseInt(newGraduationYear, 10);
    if (isNaN(parsedGraduationYear)) {
      alert("Invalid graduation year. Please enter a valid number.");
      return; // Stop if the input is invalid
    }

    // Update the row data with the new values
    const newData = {
      ...selectedData,
      firstName: newFirstName,
      lastName: newLastName,
      graduationYear: parsedGraduationYear
    };

    // Update the row data directly via grid API
    params.node.setData(newData); // Update the row directly
  }

  // Function to delete a row
  onDeleteRow(params: any) {
    const selectedData = params.data;
    this.gridApi.applyTransaction({ remove: [selectedData] }); // Delete row using grid API
  }

  // Function to add a new row
  addNewRow() {
    const newData: IRow = {
      studentId: this.rowData.length + 1,
      lastName: 'New',
      firstName: 'New',
      dateOfBirth: '00/00/0000',
      university: 'WPI',
      major: 'New',
      graduationYear: 2026
    };

    // Add the new row using grid API
    this.gridApi.applyTransaction({ add: [newData] });
  }
}
