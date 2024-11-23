export type TPosition = {
    x: number;
    y: number;
};

export interface INote {
    id: string;
    color?: string;
    name: string;
    position: TPosition;
    content: string;
    zIndex: number;
    minimized: boolean;
}

export interface INotesList {
    [key: string]: INote;
}
