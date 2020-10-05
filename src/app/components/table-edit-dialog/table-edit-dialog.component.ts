import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IMainData} from '../../interfaces/IMainData';
import {MainDataService} from '../../services/main-data.service';

@Component({
  selector: 'table-edit-dialog',
  templateUrl: './table-edit-dialog.component.html',
  styleUrls: ['./table-edit-dialog.component.scss']
})
export class TableEditDialogComponent implements OnInit {
  public dialogTitle: string;
  public cloneRowData: IMainData;
  public isError: boolean;

  readonly rowData: IMainData;
  readonly isNewRow: boolean;

  constructor(
    private mainDataService: MainDataService,
    private dialogRef: MatDialogRef<TableEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.isNewRow = data.selectedRowWithStatus.isNewRow;
    this.rowData = data.selectedRowWithStatus.selectedRow;
    this.cloneRowData = JSON.parse(JSON.stringify(this.rowData));
  }

  ngOnInit(): void {
    this.dialogTitle = (this.isNewRow) ? 'Create Campaign' : 'Edit Campaign';

    this.mainDataService.isErrorStatus$
      .subscribe( errStatus => {
        this.isError = errStatus;

        if (!this.isError) {
          this.closeDialog(200);
        }
      });
  }

  public closeDialog(statusCode: number = null): void {
    this.dialogRef.close(statusCode);
  }

  public saveChanges(): void {
    if (this.isNewRow) {
      this.mainDataService.addNewRow(this.cloneRowData);
    } else {
      this.mainDataService.updateExistingRow(this.cloneRowData);
    }
  }
}
