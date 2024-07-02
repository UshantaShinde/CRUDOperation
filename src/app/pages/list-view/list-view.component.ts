import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataServiceService } from 'src/app/services/user-data-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
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
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private _router: Router, private http: HttpClient,
    private _userService: UserDataServiceService) { this.dataSource = new MatTableDataSource([]) }

  ngOnInit(): void {
    this.getMethod();
  }
 

  getMethod() {
    this._userService.getAllPost().subscribe((data) => {
      console.table(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteItem(id: any) {

    if (id > -1) {
      let tempDatasource=this.dataSource.data;

      tempDatasource.splice(id-1, 1);
      this.dataSource.data=tempDatasource
      this._userService.deletePost(id).subscribe((res:any) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Entry Deleted',
          text: 'The entry has been successfully deleted.',
          allowOutsideClick: false
        });
      });
    }
  }




  editItem(): void {
    this._router.navigate(['/add-task', 'edit']);
  }

  addItem(): void {
    this._router.navigate(['/add-task', 'add']);
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
