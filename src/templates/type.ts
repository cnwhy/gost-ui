export type Template = {
    label: string;
    json: string;
    cli?: string;
    children?: Template[];
}