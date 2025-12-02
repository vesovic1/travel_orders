import { Component, Input, OnInit } from '@angular/core';
import { getFileTypeIconNameFromExtensionOrType } from './libs/getFileTypeIconProps';

@Component({
  selector: 'app-doc-icon',
  templateUrl: './doc-icon.component.html',
  styleUrls: ['./doc-icon.component.scss']
})
export class DocIconComponent implements OnInit {

  // https://res-1.cdn.office.net/files/fabric-cdn-prod_20230106.001/assets/item-types/32_1.5x/code.png --- PNG EXAMPLE
  // https://res-1.cdn.office.net/files/fabric-cdn-prod_20230106.001/assets/item-types/32/code.svg -- SVG EXAMPLE

  @Input() fileName: string = '';
  @Input() size: number = 20;
  public iconUrl: string = '';
  private iconPath: string = 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230106.001/assets/item-types/';

  public icon: string = 'icon-file-empty';

  ngOnInit():void {
    if (this.fileName === 'folder') {
      this.iconUrl = this.iconPath + `/${this.size}/folder.svg`;
    } else {
      const extension = this.getExtension(this.fileName);
      const icon = getFileTypeIconNameFromExtensionOrType(extension, 1);
      this.iconUrl = this.iconPath + `/${this.size}/${icon}.svg`;
    }
  }

  private getExtension(filename:string): string {
    const re = /(?:\.([^.]+))?$/;
    return re.exec(filename)![1];
  }

}
