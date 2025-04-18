import { Routes } from '@angular/router';
import { AllTitlesComponent } from './titles/all-titles/all-titles.component';
import { AddTitlesComponent } from './titles/add-titles/add-titles.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path: 'allTitles',
                component: AllTitlesComponent,
                canActivate: [authGuard]
            },
            {
                path: 'addTitle',
                component: AddTitlesComponent,
                canActivate: [authGuard]
            }
        ]
    }
];