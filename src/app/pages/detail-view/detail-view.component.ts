import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataServiceService } from 'src/app/services/user-data-service.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})


export class DetailViewComponent implements OnInit {
  filterValue = '';
  public getJsonValue: any;
  public postJsonValue: any;
 
  displayedColumns: any = ['id',
    'title',
    'body',
    'action',
  ];
  public dataSource: any = [];
  resultsLength: any;
  @ViewChild(MatPaginator) paginator: MatPaginator |undefined;
  @ViewChild(MatSort) sort: MatSort| undefined;
 

  constructor(private _router: Router, private http: HttpClient,
    private _userService:UserDataServiceService
  ) { }

  ngOnInit(): void {
    this.getMethod();
   
  }

  public getMethod() {
    this._userService.getAllPost().subscribe((data:any) => {
      this.resultsLength=data.length;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateForm(record: any): void {
    this._userService.passTask(record);
    this._router.navigate(['/add-task', 'edit']);
}


  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

navigateToAddTaskForm(): void {
  this._router.navigate(['/add-task','add'])
}


}
