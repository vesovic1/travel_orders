import { AfterViewInit, Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import Quill from 'quill';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() editorId: string = 'hh-default-editor';
  @Input() theme: string = 'bubble';
  @Input() placeholder: string = 'Type something here...';
  @Input() value: any;

  @Output() editorOutput: EventEmitter<any> = new EventEmitter<any>();

  private dataType:string = 'html';

  private editorContents:any;

  private _onDestroy = new Subject<void>();

  public editor:any = {};

  public content: string = '';

  private toolbarOptions: any[] = [
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['video'],
    ['image'],
    ['clean']
  ];

  constructor() { }

  ngOnInit(): void {
    if (typeof(this.value) === 'object') {
      this.dataType = 'json';
    }

    if (typeof(this.value) === 'string') {
      this.dataType = 'html';
    }

    if (this.value) {
      this.editorContents = this.value;
    }
  }

  ngAfterViewInit(): void {
    this.editor = new Quill(`#${ this.editorId }`, {
      modules: {
        toolbar: this.toolbarOptions
      },
      placeholder: this.placeholder,
      theme: this.theme
    });

    if (this.editorContents) {
      switch(this.dataType) {
        case 'html':
          this.editor.root.innerHTML = this.editorContents;
          break;
        case 'json':
          this.editor.setContents(this.editorContents);
          break;
        default:
          this.editor.root.innerHTML = this.editorContents;
          break;
      }
    }

    this.onEditorChange();
  }

  private onEditorChange():void {
    this.editor.on('editor-change', () => {
      let content = this.editor.root.innerHTML;
      if (this.dataType === 'html') {
        content = this.editor.root.innerHTML;
      }
      if (this.dataType === 'json') {
        content = this.editor.getContents();
      }

      this.editorOutput.emit(content);
    });

  }

  public setValue(content: any): void {
    if (this.editor && content) {
      this.editor.root.innerHTML = content;
    }

  }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}