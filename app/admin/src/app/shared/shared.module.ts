import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ColTemplate } from './directives/TableColDirective';
import { DialogModule } from '@angular/cdk/dialog';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormFieldErrorsComponent } from './components/form-field-errors/form-field-errors.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormDatePickerComponent } from './components/form-date-picker/form-date-picker.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { PageOptionsComponent } from './components/page-options/page-options.component';
import { PageComponent } from './components/page/page.component';
import { DetailsTemplate } from './directives/TableDetailsDirective';
import { DataTableSimpleComponent } from './components/data-table-simple/data-table-simple.component';
import { ClickStopPropagationDirective } from './directives/ClickStopPropagationDirective';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { TooltipDirective } from './directives/TooltipDirective';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormColorPickerComponent } from './components/form-color-picker/form-color-picker.component';
import { FileStoragePipe } from './pipes/fileStorage.pipe';
import { TreeListComponent } from './components/tree-list/tree-list.component';
import { TreeActionHolderTemplate } from './directives/TreeActionHolderDirective';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PageDateFilterComponent } from './components/page-date-filter/page-date-filter.component';
import { PageSelectFilterComponent } from './components/page-select-filter/page-select-filter.component';
import { FilterByFieldPipe } from './pipes/listFilter.pipe';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { DragAndDropTableComponent } from './components/drag-and-drop-table/drag-and-drop-table.component';
import { TreeListDragDropComponent } from './components/tree-list-drag-drop/tree-list-drag-drop.component';
import { FormSwitchComponent } from './components/form-switch/form-switch.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { DocIconComponent } from './components/doc-icon/doc-icon.component';
import { AppFileSizePipe } from './pipes/fileSize.pipe';
import { MoveFileModalComponent } from './components/file-manager/move-file-modal/move-file-modal.component';
import { NewFolderModalComponent } from './components/file-manager/new-folder-modal/new-folder-modal.component';
import { RenameFileModalComponent } from './components/file-manager/rename-file-modal/rename-file-modal.component';
import { FileManagerUploaderComponent } from './components/file-manager/file-manager-uploader/file-manager-uploader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FilePreviewModalComponent } from './components/file-manager/file-preview-modal/file-preview-modal.component';

@NgModule({
  providers: [
    FileStoragePipe,
    DatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CdkMenuModule,
    OverlayModule,
    DialogModule,
    TextFieldModule,
    NgSelectModule,
    DpDatePickerModule,
    DragDropModule,
    NgApexchartsModule,
    PdfViewerModule
  ],
  declarations: [
    SearchFilterComponent,
    DataTableComponent,
    ColTemplate,
    FormCheckboxComponent,
    FormRadioComponent,
    FormInputComponent,
    FormFieldErrorsComponent,
    FormTextareaComponent,
    FormSelectComponent,
    FormDatePickerComponent,
    LoaderSpinnerComponent,
    ConfirmationModalComponent,
    GoogleButtonComponent,
    MenuTopComponent,
    PageOptionsComponent,
    PageComponent,
    DetailsTemplate,
    DataTableSimpleComponent,
    ClickStopPropagationDirective,
    SafeHtmlPipe,
    TooltipDirective,
    FormColorPickerComponent,
    FileStoragePipe,
    TextEditorComponent,
    TreeListComponent,
    TreeActionHolderTemplate,
    PageDateFilterComponent,
    PageSelectFilterComponent,
    FormSelectComponent,
    FilterByFieldPipe,
    DragAndDropTableComponent,
    FormSwitchComponent,
    TreeListDragDropComponent,
    FileManagerComponent,
    MoveFileModalComponent,
    NewFolderModalComponent,
    RenameFileModalComponent,
    FileManagerUploaderComponent,
    DocIconComponent,
    AppFileSizePipe,
    FilePreviewModalComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SearchFilterComponent,
    CdkMenuModule,
    OverlayModule,
    DataTableComponent,
    ColTemplate,
    DialogModule,
    FormCheckboxComponent,
    FormRadioComponent,
    FormInputComponent,
    FormFieldErrorsComponent,
    FormTextareaComponent,
    TextFieldModule,
    NgSelectModule,
    FormSelectComponent,
    DpDatePickerModule,
    FormDatePickerComponent,
    LoaderSpinnerComponent,
    ConfirmationModalComponent,
    GoogleButtonComponent,
    MenuTopComponent,
    PageOptionsComponent,
    PageComponent,
    DetailsTemplate,
    DataTableSimpleComponent,
    ClickStopPropagationDirective,
    SafeHtmlPipe,
    TooltipDirective,
    DragDropModule,
    FormColorPickerComponent,
    FileStoragePipe,
    TreeListComponent,
    TreeActionHolderTemplate,
    NgApexchartsModule,
    PageDateFilterComponent,
    PageSelectFilterComponent,
    FormSelectComponent,
    FilterByFieldPipe,
    TextEditorComponent,
    DragAndDropTableComponent,
    TreeListDragDropComponent,
    FormSwitchComponent,
    FileManagerComponent,
    DocIconComponent,
    AppFileSizePipe,
    PdfViewerModule,
    FileManagerUploaderComponent
  ]
})
export class SharedModule { }
