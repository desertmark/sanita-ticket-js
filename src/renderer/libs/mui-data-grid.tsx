import { DataGrid as MuiDataGrid, DataGridProps } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { useColorScheme, useTheme } from '@mui/joy';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { FC } from 'react';

export const DataGrid: FC<DataGridProps> = (props: DataGridProps) => {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const materialTheme = createTheme(
    {
      palette: {
        mode: (mode as PaletteMode) || 'light',
      },
      typography: {
        fontFamily: theme.fontFamily.body,
      },
    },
    esES,
  );
  return (
    <ThemeProvider theme={materialTheme}>
      <MuiDataGrid
        sx={{
          borderRadius: theme.radius.md,
          backgroundColor: theme.palette.background.surface,
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.primary.softBg,
          },
        }}
        slotProps={{
          basePopper: {
            style: {
              backgroundColor: theme.palette.background.surface,
              borderColor: theme.palette.divider,
              boxShadow: theme.shadow.md,
            },
          },
        }}
        paginationMode="server"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </ThemeProvider>
  );
};
