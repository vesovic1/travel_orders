import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import _ from 'lodash';
import { finalize, Subject, takeUntil } from 'rxjs';
import { NewFolderModalComponent } from './new-folder-modal/new-folder-modal.component';
import { RenameFileModalComponent } from './rename-file-modal/rename-file-modal.component';
import { MoveFileModalComponent } from './move-file-modal/move-file-modal.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { NotificationService } from '@features/notify/service/notify.service';
import { saveAs } from 'file-saver';
import { FilePreviewModalComponent } from './file-preview-modal/file-preview-modal.component';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent implements OnInit, OnDestroy {

  @Input() baseUrl: string = '';
  @Input() showNewFolder: boolean = true;
  public loading: boolean = true;
  public downloading: boolean = false;
  public documents: any[] = [];

  public selectedFolder: any = null;
  public folderStructure: any[] = [];

  private _onDestroy = new Subject<void>();

  constructor(
    private api: ApiService,
    private errorHandler: ServerErrorHandler,
    private dialog: Dialog,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.loading = true;

    let params: any = {};

    if (this.selectedFolder) {
      params.folder = this.selectedFolder;
    }

    this.api.get(this.baseUrl, params).pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (documents: any[]) => {
        this.prepareDocuments(documents);
      },
      error: (e: any) => {
        this.errorHandler.process(e);
      }
    });
  }

  private prepareDocuments(documents: any): void {

    if (this.selectedFolder) {
      documents.unshift({
        file_name: '/..',
        created_at: null,
        file_size: null,
        id: null,
        type: "folder"
      });
    }

    this.documents = documents;
  }

  public select(document: any): void {
    if (document.type === 'file') {
      this.preview(document);
    } else {
      if (!_.isNull(document.id)) {
        this.selectedFolder = document.id;
        this.folderStructure.push(this.selectedFolder);
        this.refresh();
      } else {
        this.back();
      }
    }
  }

  public back(): void {
    if (this.folderStructure.length > 1) {
      this.folderStructure.pop();
      this.selectedFolder = this.folderStructure[this.folderStructure.length - 1];
    } else {
      this.folderStructure = [];
      this.selectedFolder = null;
    }
    this.refresh();
  }

  public newFolder(): void {
    const modal: any = this.dialog.open(NewFolderModalComponent, {
      data: {
        baseUrl: this.baseUrl,
        selectedFolder: this.selectedFolder
      },
      disableClose: true,
      maxWidth: '50%',
    });

    modal.closed
    .pipe(takeUntil(this._onDestroy))
    .subscribe((dialogResponse: any) => {
      if (dialogResponse.refresh) {
        this.refresh();
      }
    });
  }

  public rename(item: any): void {
    const modal: any = this.dialog.open(RenameFileModalComponent, {
      data: {
        document: item,
        baseUrl: this.baseUrl,
        selectedFolder: this.selectedFolder
      },
      disableClose: true,
      maxWidth: '50%',
    });

    modal.closed
    .pipe(takeUntil(this._onDestroy))
    .subscribe((dialogResponse: any) => {
      if (dialogResponse.refresh) {
        this.refresh();
      }
    });
  }

  public move(item: any): void {
    const modal: any = this.dialog.open(MoveFileModalComponent, {
      data: {
        document: item,
        baseUrl: this.baseUrl,
        selectedFolder: this.selectedFolder
      },
      disableClose: true,
      maxWidth: '50%',
    });

    modal.closed
    .pipe(takeUntil(this._onDestroy))
    .subscribe((dialogResponse: any) => {
      if (dialogResponse.refresh) {
        this.refresh();
      }
    });
  }

  public remove(item: any): void {
    const confirmation = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Da li ste sigurni?',
        content: `${item.type === 'folder' ? 'Folder' : 'Fajl'} <b>${item.file_name}</b> će biti obrisan.`,
        closeLabel: 'Zatvori',
        theme: 'danger',
        confirmLabel: 'Obriši',
      },
      disableClose: true,
    });

    confirmation.closed
    .pipe(takeUntil(this._onDestroy))
    .subscribe((dialogResponse: any) => {
      if (dialogResponse) {
        this.loading = true;
        this.api.delete(`/${this.baseUrl}`, item.id)
        .pipe(
          takeUntil(this._onDestroy),
          finalize(() => {
            this.loading = false;
          })
        ).subscribe({
          next: () => {
            this.notify.success(`${item.type === 'folder' ? 'Folder' : 'Fajl'} je uspešno obrisan.`);
            this.refresh();
          },
          error: (err: any) => {
            this.errorHandler.process(err);
          }
        })
      }
    });
  }

  public download(item: any): void {

    if (this.loading || this.downloading) {
      return;
    }

    this.downloading = true;

    this.api.download(`${this.baseUrl}/${item.id}/download`)
    .pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.downloading = false;
      })
    ).subscribe({
      next: document => {
        saveAs(document, `${item.file_name}`);
      },
      error: (e: any) => {
        this.errorHandler.process(e);
      }
    });
  }

  public preview(item: any): void {
    console.log(item);
    this.dialog.open(FilePreviewModalComponent, {
      data: {
        document: item,
        baseUrl: this.baseUrl
      },
      disableClose: true
    });
  }

  public afterUpload(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
