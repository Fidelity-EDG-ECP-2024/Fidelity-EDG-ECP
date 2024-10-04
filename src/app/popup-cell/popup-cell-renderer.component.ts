import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import tippy, { hideAll } from 'tippy.js';
import { GridApi } from 'ag-grid-community';


@Component({
  selector: 'simple-popup',
  styleUrls: ['./popup-cell-renderer.css'],
  standalone: true,
  imports: [CommonModule],

  template:
  `
    <div>
    <button #trigger class="btn btn-primary" data-action="toggle">Action</button>

    <div #content *ngIf="isOpen" class="menu-container">
      <div (click)="onClickHandler('create')" class="menu-item">
        Create New Row
      </div>
      <div (click)="onClickHandler('edit')" class="menu-item">Edit Row</div>
      <div (click)="onClickHandler('delete')" class="menu-item">Delete Row</div>
    </div>
  </div>

  `,

})
export class PopupCellRenderer implements AfterViewInit {
  private params:any;
  protected isOpen = false;
  private tippyInstance:any;
  private gridApi!: GridApi; // Declare gridApi for use within the component

  @ViewChild('content') container:any;

  @ViewChild('trigger') button:any;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params:any) {
    this.params = params;
    this.gridApi = params.api;
  }

  onClickHandler(option:any) {
    this.togglePopup();
    if (option === 'create') {
      this.gridApi.applyTransaction({
        add: [{}],
      });
    }
    if (option === 'delete') {
      this.gridApi.applyTransaction({ remove: [this.params.data] });
    }

    if (option === 'edit') {
      this.gridApi.startEditingCell({
        rowIndex: this.params.rowIndex,
        colKey: 'id',
      });
    }
  }

  configureTippyInstance() {
    this.tippyInstance.enable();
    this.tippyInstance.show();

    this.tippyInstance.setProps({
      trigger: 'manual',
      placement: 'right',
      arrow: false,
      interactive: true,
      appendTo: document.body,
      hideOnClick: false,
      onShow: (instance:any) => {
        hideAll({ exclude: instance });
      },
      onClickOutside: (instance:any, event:any) => {
        this.isOpen = false;
        instance.unmount();
      },
    });
  }

  togglePopup() {
    this.isOpen = !this.isOpen;
    this.changeDetector.detectChanges();
    if (this.isOpen) {
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }
}
