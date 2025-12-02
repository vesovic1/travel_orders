import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[rowDetails]'
})
export class DetailsTemplate {
  constructor(public template: TemplateRef<any>) {}
}