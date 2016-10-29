
export interface IAppConfig {
  baseFolder?: string;
  defaultExt?: string;
  projects: IProjectConfig[];
}

export interface IProjectConfig {
  id: string;
  name: string;
  folder?: string;
  ext?: string;
  gallery: IItemConfig[];
}

export interface IItemConfig {
  name: string;
}

export const appConfig: IAppConfig = window['appConfig'];