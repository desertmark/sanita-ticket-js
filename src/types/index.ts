export * from './auth';
export * from './tickets';
export * from './history';
export * from './products';

declare module '@mui/joy/Card' {
  interface CardPropsVariantOverrides {
    outlined2: true;
  }
}
