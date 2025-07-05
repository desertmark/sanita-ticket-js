export * from './auth';
export * from './tickets';
export * from './history';
export * from './products';

declare module '@mui/joy/Card' {
  interface CardPropsVariantOverrides {
    outlined2: true;
  }
}

declare module '@mui/joy/Button' {
  interface ButtonPropsSizeOverrides {
    xs: true;
  }
}
