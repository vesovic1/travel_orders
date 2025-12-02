import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import _ from 'lodash';
import { catchError, concatMap, EMPTY, finalize, of, Subject } from 'rxjs';

@Component({
  selector: 'app-file-manager-uploader',
  templateUrl: './file-manager-uploader.component.html',
  styleUrl: './file-manager-uploader.component.scss'
})
export class FileManagerUploaderComponent implements OnDestroy {

  @Input() baseUrl: any = '';
  @Input() folder: any = null;
  @Output() uploadFinished = new EventEmitter<boolean>();

  public uploading: boolean = false;
  public responseModal: boolean = false;
  public responseModalShowMore: boolean = false;
  public success: any[] = [];
  public errors: any[] = [];
  public totalFiles: number = 0;
  public totalFinished: number = 0;
  public uploadingProgress: number = 0;

  @ViewChild('documentsUploader') documentsUploader!: ElementRef;
  @Input() showNewFolder: boolean = true;
  private _onDestroy = new Subject<void>();

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  public handleImageFileInput(e: any): void {

    if (!e.target.files.length || this.uploading) {
      return;
    }

    this.uploading = true;

    this.reset();

    const files: FileList = e.target.files;

    this.totalFiles = files.length;

    this.closeResponseModal();


    const requestData: any = Array.from({ length: this.totalFiles }, (_, i) => ({ file: files[i] }));

    const requests: any = requestData.map((data: any) => this.api.postFormData(`${this.baseUrl}${!_.isNull(this.folder) ? `?folder=${this.folder}` : ''}`, { file: data.file }));

    let lastIndex: number = -1;

    of(...requests)
    .pipe(
      concatMap((request: any, index: number) =>
        request.pipe(
          finalize(() => {
            lastIndex = index;
          }),
          catchError((err: any) => {
            this.totalFinished++;
            this.uploadingProgress = (this.totalFinished * 100) / this.totalFiles;
            this.errors.push({ name: files[index].name, message: err.error });
            return EMPTY;
          })
        )
      )
    ).subscribe({
      next: () => {
        this.totalFinished++;
        this.uploadingProgress = (this.totalFinished * 100) / this.totalFiles;
        this.success.push(files[lastIndex]);
      },
      complete: () => {
        if (this.totalFinished === this.totalFiles) {
          this.uploading = false;
          this.documentsUploader.nativeElement.value = "";
          this.openResponseModal();
          this.uploadFinished.next(true);
        }
      }
    });

  }

  private reset(): void {
    this.success = [];
    this.errors = [];
    this.totalFiles = 0;
    this.totalFinished = 0;
    this.uploadingProgress = 0;
  }

  public closeResponseModal(): void {
    this.responseModal = false;
    this.responseModalShowMore = false;
  }

  private openResponseModal(): void {
    this.responseModal = true;
      this.responseModalShowMore = false;
      this.cdr.markForCheck();
  }

  public toggleResponseErrors(): void {
    this.responseModalShowMore = !this.responseModalShowMore;
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
