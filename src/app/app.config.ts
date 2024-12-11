import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
  withJsonpSupport,
} from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withJsonpSupport()
    ),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        // onViewTransitionCreated: (transitionInfo) => {
        //   console.log('View transitionInfo created:', transitionInfo);
        // },
      })
    ),
    provideClientHydration(),
    provideHttpClient(),

    importProvidersFrom(HttpClientModule),
  ],
};
