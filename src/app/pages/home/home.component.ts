import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navigateToList() {
    this._router.navigate(['/list-view']);
  }

  navigateToDetail() {
    this._router.navigate(['/detail-view']);
  }

  constructor(private _router: Router) { }
  ngOnInit(): void {
  }
}
