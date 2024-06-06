/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

export interface IpcHandlerOptions {
  name?: string;
}

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function handlerName(
  target: any,
  propertyKey: string | symbol,
  options?: IpcHandlerOptions,
) {
  return (
    options?.name ||
    `${target.constructor.name?.replace(
      'Controller',
      '',
    )}.${propertyKey.toString()}`
  );
}
