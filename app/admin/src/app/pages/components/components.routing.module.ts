import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { CdkElementsComponent } from './cdk-elements/cdk-elements.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
    },
    { path: 'table', component: TableComponent },
    { path: 'form', component: FormElementsComponent },
    { path: 'custom', component: CdkElementsComponent },
    { path: 'buttons', component: ButtonsComponent },
    { path: 'dragdrop', component: DragAndDropComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule {}