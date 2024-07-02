import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  title: any;
  stauts: any;
  private editRecord: any; 
  apiUrl = "https://jsonplaceholder.typicode.com"

  constructor(private http: HttpClient) { }

  passTask(record: any) { 
    this.editRecord = record;
  }

  getEditRecord() { 
    return this.editRecord;
  }

  setStatus(status: any) {
    this.stauts = status;
  }

  getAllPost() {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  deletePost(id: any) {
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }

  addPost(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, data).pipe(
      catchError(error => {
        console.error('Error adding post:', error);
        throw error;
      })
    );
  }

  updatePost(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${data.id}`,data).pipe(
      catchError(error => {
        console.error('Error adding post:', error);
        throw error;
      })
    );
  }
}
