import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[actionHolder]'
})
export class TreeActionHolderTemplate {
  constructor(public template: TemplateRef<any>) {}
}