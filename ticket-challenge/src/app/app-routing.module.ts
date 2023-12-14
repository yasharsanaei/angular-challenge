import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { SalonsListComponent } from './salons-list/salons-list.component';

const routes: Routes = [
    {
        path: '',
        component: SalonsListComponent,
    },
    {
        path: ':map_id',
        component: PlanComponent,
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
