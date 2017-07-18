import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';

export const router: Routes = [
    { path: '', redirectTo: 'app-root', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'spinner', component: LoadingSpinnerComponent }
    
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);