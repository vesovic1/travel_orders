import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, SimpleChanges } from '@angular/core';
import { TreeNode } from './treeNode.interface';
import { ITreeNode } from '../tree-list/treeNode.interface';
import { TreeActionHolderTemplate } from '@shared/directives/TreeActionHolderDirective';
import { ComponentsModule } from 'src/app/pages/components/components.module';

@Component({
  selector: 'app-tree-list-drag-drop',
  templateUrl: './tree-list-drag-drop.component.html',
  styleUrls: ['./tree-list-drag-drop.component.scss']
})
export class TreeListDragDropComponent {

  @Input() data: ITreeNode[] = [];

  @Output() onDrop = new EventEmitter<any>();

  public tree: any = {
    root: {
      open: true,
      childs: []
    }
  };

  public dragItem: any;


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

  drop(event: CdkDragDrop<any[]>) {

    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.onDrop.next({
      item: this.data[event.currentIndex],
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex
    });


  }
  dropChilds(event: CdkDragDrop<any[]>, list: any[] ) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
    this.onDrop.next({
      item: list[event.currentIndex],
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex
    });
  }


  started(item: any) {
    this.dragItem = item;
  }

}

