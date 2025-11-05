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

// export const useAgTheme = () => {
//   const theme = useTheme();
//   const { mode } = useColorScheme();
//   const colorScheme = theme.colorSchemes[(mode as DefaultColorScheme) || 'light'];
//   // to use myTheme in an application, pass it to the theme grid option
//   const agTheme = themeQuartz.withParams({
//     backgroundColor: colorScheme.palette.background.surface,
//     fontFamily: theme.fontFamily.body,
//     foregroundColor: colorScheme.palette.text.primary,
//     borderColor: colorScheme.palette.divider,
//     // borderRadius: 20,
//     // browserColorScheme: mode,
//     // cellHorizontalPaddingScale: 1,
//     // chromeBackgroundColor: {
//     //   ref: 'backgroundColor',
//     // },
//     // columnBorder: false,
//     // fontSize: theme.fontSize.md,
//     headerBackgroundColor: colorScheme.palette.primary.softBg,
//     // headerFontSize: theme.fontSize.xs,
//     // headerFontWeight: theme.fontWeight.md,
//     headerTextColor: colorScheme.palette.text.secondary,
//     // headerVerticalPaddingScale: 0.9,
//     // iconSize: 20,
//     // rowBorder: false,
//     // rowVerticalPaddingScale: 1.2,
//     // sidePanelBorder: false,
//     // spacing: 8,
//     // wrapperBorder: false,
//     // wrapperBorderRadius: 0,
//   });
//   return agTheme;
// };
