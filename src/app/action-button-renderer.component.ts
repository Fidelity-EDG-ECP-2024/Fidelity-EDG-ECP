import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-button-renderer',
  template: `
    <div>
      <button mat-fab color="primary" (click)="onHomeClick()">
        <mat-icon>home</mat-icon>
        Home
      </button>
      <button mat-mini-fab (click)="onEditClick()">
        <mat-icon>edit</mat-icon>
      </button>
      <button mat-mini-fab color="warn" (click)="onDeleteClick()">
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
})
export class ActionButtonRendererComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onHomeClick() {
    // Handle home button click
    console.log('Home clicked');
  }

  onEditClick() {
    this.params.context.componentParent.editRow(this.params.data.id);
  }

  onDeleteClick() {
    this.params.context.componentParent.deleteRow(this.params.data.id);
  }
}
