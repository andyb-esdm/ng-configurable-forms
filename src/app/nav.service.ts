import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  readonly links = [
    { title: 'Home', fragment: 'home' },
    { title: 'Search Form', fragment: 'search-form' },
    { title: 'About', fragment: 'about' },
  ];
}

