
import { Component, ContentChildren, Input, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { ITreeNode } from './treeNode.interface';
import { TreeActionHolderTemplate } from '@shared/directives/TreeActionHolderDirective';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnChanges {

  @Input() data: ITreeNode[] = [];

  public tree: any = {
    root: {
      open: true,
      childs: []
    }
  };

  @ContentChildren(TreeActionHolderTemplate) templates!: QueryList<TreeActionHolderTemplate>;

  public templateDictionary: any;

  ngAfterContentInit() {
    if (this.templates.length) {
      this.templates.forEach((x: TreeActionHolderTemplate) => {
        this.templateDictionary = x.template;
      });
    }
  }

  public toggleNode(node: ITreeNode): void {
    node.open = !node.open;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tree.root.childs = changes.data.currentValue;
  }
}
