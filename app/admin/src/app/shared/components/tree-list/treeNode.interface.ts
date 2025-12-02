export interface ITreeNode {
    initialSyncClicked?: boolean;
    id: number;
    parent: number;
    name: string;
    open?: boolean;
    childs?: ITreeNode[];
    parents?: string[];
    calculus_name?: string;
    description?: string;
    disabled?: boolean;
    sync?: boolean;

}