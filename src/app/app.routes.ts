import { Routes, RouterModule } from '@angular/router';
// import { APP_ROUTES } from './app.routes';

export const routes: Routes = [
  {
    path: 'landing',
    title: 'Landing',
    loadComponent: () =>
      import('./views/landinpage/landinpage.component').then((m) => m.default),
  },
  {
    path: 'lugares/:id',
    title: 'Lugares',
    loadComponent: () =>
      import('./views/lugares/lugares.component').then((m) => m.default),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/pages/dashboard/dashboard.component').then(
        (m) => m.default
      ),
    children: [
      {
        path: 'sites',
        title: 'Lugares',
        loadComponent: () =>
          import('./dashboard/pages/sites/sites.component').then(
            (m) => m.default
          ),
      },
      {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
];
