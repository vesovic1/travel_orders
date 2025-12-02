import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '@core/services/api.service';
import { ServerErrorHandler } from '@core/services/server-error-handler.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { getPreviewType } from './libs/preview.helper';

@Component({
  selector: 'app-file-preview-modal',
  templateUrl: './file-preview-modal.component.html',
  styleUrl: './file-preview-modal.component.scss'
})
export class FilePreviewModalComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  private _onDestroy = new Subject<void>();

  public fileUrl: any;

  public type: string = 'undefined';
  public tempBlob: any;

  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: any,
    private errorHandler: ServerErrorHandler,
    private api: ApiService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.getFileData();
  }

  private getFileData():void {
    this.loading = true;
    this.api.download(`${this.data.baseUrl}/${this.data.document.id}/download`)
    .pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {

        this.type = getPreviewType(data.type);

        switch(this.type) {
          case 'image':
            let objectURL = URL.createObjectURL(data);
            this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            break;
          case 'pdf':
              this.tempBlob = new Blob([data], { type: data.type });
              const fileReader = new FileReader();
              fileReader.onload = () => {
                  this.fileUrl = new Uint8Array(fileReader.result as ArrayBuffer);
              };
              fileReader.readAsArrayBuffer(this.tempBlob);
            break;
        }

      },
      error: e => {
        this.errorHandler.process(e);
      }
    })
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
