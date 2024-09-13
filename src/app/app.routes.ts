import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent), title: 'About'
    },
    {
        path: 'search-form',
        loadComponent: () => import('./search-form/search-form.component').then(m => m.SearchFormComponent), title: 'Dashboard'
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Not Found'
    },
];