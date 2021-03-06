export declare const FileDoesNotExist: (file: string) => string;
export declare const FileCouldNotBeLoaded: (file: string, reason: string) => string;
export declare const DirDoesNotExist: (dir: string) => string;
export declare const ArgumentIsMissing: (arg: string) => string;
export declare const CommandDoesNotExist: (name: string) => string;
export declare const CommandAlreadyExists: (name: string) => string;
export declare const CommandCannotExecute: (name: string, reason: string) => string;
export declare const PluginCannotLoad: (name: string, reason: string) => string;
