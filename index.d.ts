
declare namespace Getopt {
    type Option = [string]|[string, string]|[string, string, string];
    function create(options: Option[]): Getopt;

    interface ParsedOptions {
        argv: string[];
        options: {
            [key: string]: boolean | string | string[];
        };
    }
}

declare class Getopt {
    constructor(options: Getopt.Option[]);
    bindHelp(template?: string): this;
    setHelp(template: string): this;
    getHelp(): string;
    showHelp(): void;
    parseSystem(): Getopt.ParsedOptions;
    parse(argv: string[]): Getopt.ParsedOptions;
    on(optionName: string, action: (this: Getopt, argv: string[], options: Getopt.ParsedOptions) => void): void;
    error(callback: (error: Error) => void): void;
}

export = Getopt;