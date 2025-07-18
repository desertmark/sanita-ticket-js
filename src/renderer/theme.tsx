import { extendTheme } from '@mui/joy';

export const theme = extendTheme({
  fontFamily: {
    body: 'Space Grotesk',
    display: 'Space Grotesk',
    code: 'Space Grotesk',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: '#FFFFFF',
        },
        primary: {
          '50': '#ecfdf5',
          '100': '#d1fae5',
          '200': '#a7f3d0',
          '300': '#6ee7b7',
          '400': '#34d399',
          '500': '#10b981',
          '600': '#059669',
          '700': '#047857',
          '800': '#065f46',
          '900': '#064e3b',
          softBg: '#dcfce7',
          outlinedColor: '#047857',
        },
      },
    },
  },
  components: {
    JoyCard: {
      styleOverrides: {
        root: ({ ownerState, theme: t }) => ({
          ...(ownerState.variant === 'outlined2' && {
            ...t.variants.outlined.neutral,
            backgroundColor: t.palette.background.body,
          }),
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'xs' && {
            fontSize: '0.75rem',
            padding: '4px 8px',
            minHeight: '24px',
            lineHeight: 1.2,
          }),
        }),
      },
    },
  },
});
