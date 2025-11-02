export enum SettingKeys {
  PRODUCTS_IMPORT_LAST_UPDATED_AT = 'products_import_last_updated_at',
  PRODUCTS_IMPORT_LAST_UPDATE_BY = 'products_import_last_updated_by',
  PRODUCTS_IMPORT_LAST_UPDATE_FROM = 'products_import_last_updated_from',
  PRODUCTS_IMPORT_LAST_UPDATE_FILE = 'products_import_last_updated_file',
}

export interface ISettings {
  updatedLastAt?: string;
  updatedLastBy?: string;
  updatedLastFile?: string;
  updatedLastFrom?: string;
}
