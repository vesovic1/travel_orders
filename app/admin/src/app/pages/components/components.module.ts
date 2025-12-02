import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components.routing.module';
import { SharedModule } from '@shared/shared.module';
import { TableComponent } from './table/table.component';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { CdkElementsComponent } from './cdk-elements/cdk-elements.component';
import { TestModalComponent } from './cdk-elements/test-modal/test-modal.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';

@NgModule({
  declarations: [
    TableComponent,
    FormElementsComponent,
    CdkElementsComponent,
    TestModalComponent,
    ButtonsComponent,
    DragAndDropComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }