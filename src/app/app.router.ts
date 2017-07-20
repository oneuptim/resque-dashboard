import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';

export const router: Routes = [
    { path: '', redirectTo: 'app-root', pathMatch: 'full' },
    { path: 'spinner', component: LoadingSpinnerComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);