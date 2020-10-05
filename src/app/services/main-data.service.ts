import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IMainData } from '../interfaces/IMainData';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {
  public isErrorStatus$: Subject<boolean> = new Subject<boolean>();

  private mainData$: BehaviorSubject<IMainData[]> = new BehaviorSubject<IMainData[]>([]);
  private mainData: IMainData[];

  constructor(private http: HttpClient) { }

  public getMainData(): Observable<IMainData[]> {
    return this.http.get<IMainData[]>('http://localhost:8080/walkme/api/campaigns/')
      .pipe(
        switchMap( campaignData => {
          this.mainData = campaignData;
          this.mainData$.next(this.mainData);
          return this.mainData$;
        })
      );
  }

  public addNewRow(newRowData: IMainData): void {
    this.http.post<IMainData>(`http://localhost:8080/walkme/api/campaigns/add?data=${newRowData.data}&maxCount=${newRowData.cap.maxCount}&maxCountPerUser=${newRowData.cap.maxCountPerUser}&name=${newRowData.name}`, {})
      .subscribe( newRowFromServer => {
        Object.assign(newRowData, newRowFromServer);
        this.mainData.push(newRowData);
        this.mainData$.next(this.mainData);
        this.isErrorStatus$.next(false);
      });
  }

  public updateExistingRow(updatedRowData: IMainData): void {
    this.http.put(`http://localhost:8080/walkme/api/campaigns/update/${updatedRowData.id}?maxCount=${updatedRowData.cap.maxCount}&maxCountPerUser=${updatedRowData.cap.maxCountPerUser}`, {})
      .subscribe( () => {
        this.mainData.forEach( (dataRow) => {
          if (dataRow.id === updatedRowData.id) {
            Object.assign(dataRow, updatedRowData);
          }
        });

        this.isErrorStatus$.next(false);
      });
  }
}
