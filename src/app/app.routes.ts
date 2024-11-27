import { Routes } from '@angular/router';

export const routes: Routes = [
  // landing page
  {
    path: 'landing',
    title: 'landing',
    loadComponent: () =>
      import('./views/landinpage/landinpage.component').then((m) => m.default),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/pages/dashboard/dashboard.component'),
    children: [
      {
        path: 'sites/:id',
        title: 'lugares',
        loadComponent: () => import('./dashboard/pages/sites/sites.component'),
      },

      {
        path: '',
        redirectTo: 'landing',
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
