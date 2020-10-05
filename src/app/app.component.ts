import {Component, OnInit, ViewChild} from '@angular/core';
import {IMainData} from './interfaces/IMainData';
import {MainDataService} from './services/main-data.service';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {TableEditDialogComponent} from './components/table-edit-dialog/table-edit-dialog.component';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public mainData: MatTableDataSource<IMainData>;

  public mainDataTableHeaders = [
    'id',
    'name',
    'data',
    'maxCountPerUser',
    'maxCount'
  ];

  @ViewChild('campaignsTable')
  private campaignsTable: MatTable<IMainData[]>;

  constructor(
    private mainDataService: MainDataService,
    private matDialog: MatDialog
  ) {
    this.mainData = new MatTableDataSource<IMainData>();
  }

  public showTableEditDialog(selectedRow: IMainData = null): void {
    let isNewRow = false;

    if (selectedRow === null) {
      selectedRow = this.createRowFactory();
      isNewRow = true;
    }

    const selectedRowWithStatus = {
      selectedRow,
      isNewRow
    };

    const tableEditDialogCfg: MatDialogConfig = Object.assign(new MatDialogConfig(), {
      autoFocus: true,
      data: { selectedRowWithStatus }
    });

    const tableEditDialogRef: MatDialogRef<TableEditDialogComponent> = this.matDialog.open(TableEditDialogComponent, tableEditDialogCfg);

    tableEditDialogRef
      .afterClosed()
      .subscribe( (closedData => {
        if (closedData === 200 ) {
          // TODO: Add logic (if needed) to success or failure
        }
      }) );
  }

  public handleSelectedRow(tableRowItem): void {
    console.log('DK My Row Is: ', tableRowItem);
    this.showTableEditDialog(tableRowItem);
  }

  public addRowItem(): void {
    this.showTableEditDialog();
  }

  ngOnInit() {
    this.mainDataService.getMainData()
      .subscribe( campaignData => {
        this.mainData.data = campaignData;
      });
  }

  private createRowFactory(): IMainData {
    return {
      name: null,
      data: null,
      cap: {
        maxCountPerUser: null,
        maxCount: null
      }
    };
  }
}
