import { extendTheme } from '@mui/joy';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: '#eee',
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
