export type WithDefault<S extends string, D, T = Record<S, D>> = keyof T extends S ? T : Record<S, D> & T;
