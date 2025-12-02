import { ITreeNode } from "../tree-list/treeNode.interface";

export interface TreeNode {
    id: number;
    parent: number;
    name: string;
    print: number;
    disabled: number;
    active: number;
    calculus_name: string;
    childs?: ITreeNode[];
  }