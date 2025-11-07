import { useColorScheme, useTheme } from '@mui/joy';
import { merge } from 'lodash';
// import { themeQuartz } from 'ag-grid-community'; // or themeBalham, themeAlpine
import { TableStyles } from 'react-data-table-component';
import { DefaultColorScheme } from '@mui/joy/styles/types';

export const useTableTheme = (overrides?: TableStyles) => {
  const theme = useTheme();
  return merge(
    {
      header: {
        style: {
          backgroundColor: theme.palette.background.level1,
        },
      },
      subHeader: {
        style: {
          backgroundColor: theme.palette.background.level1,
        },
      },
      noData: {
        style: {
          backgroundColor: theme.palette.background.level1,
        },
      },
      pagination: {
        style: {
          backgroundColor: theme.palette.background.level1,
        },
      },
      headCells: {
        style: {
          ...theme.typography['body-md'],
          background: theme.palette.background.level1,
          color: theme.palette.text.primary,
          fontWeight: theme.fontWeight.lg,
        },
      },
      cells: {
        style: {
          cursor: 'pointer',
        },
      },
      rows: {
        style: {
          background: theme.palette.background.surface,
        },
        highlightOnHoverStyle: {
          background: theme.palette.background.level2,
        },
      },
    },
    overrides,
  ) as TableStyles;
};
