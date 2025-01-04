import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'explorer' },
    { path: 'explorer', loadComponent: () => import('./modules/explorer/explorer.component').then(m => m.ExplorerComponent) }
];
