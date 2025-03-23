import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'map' },
    { path: 'map', title: 'GIS', loadComponent: () => import('./map/map.component').then(c => c.MapComponent) },
    { path: '**', redirectTo: 'map' },
];
