import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[col]'
})
export class ColTemplate {
  @Input() col!: string;
  constructor(public template: TemplateRef<any>) {}
}