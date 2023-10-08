import { FC } from 'react';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/joy';
import { ITicketLine } from '../../types';
import logo from '../../../assets/ticket-logo.png';

export interface TicketProps {
  lines: ITicketLine[];
}

export const Ticket: FC<TicketProps> = ({ lines }) => {
  const theme = useTheme();
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      backgroundColor: 'white',
      p: 2,
      border: '1px solid black',
      borderRadius: 5,
      width: 400,
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
    },
    headerData: {
      display: 'flex',
    },
    headerCol: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    headerText: {
      ...theme.typography['title-md'],
      color: 'black',
    },
    body: { mt: 2 },
    bodyHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '2px solid black',
      pb: 1,
    },
    bodyLine: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    bodyCell: {
      color: 'black',
    },
    footerTitle: {
      ...theme.typography['title-lg'],
      color: 'black',
    },
    footerValue: {
      ...theme.typography['body-lg'],
      color: 'black',
    },
  };
  return (
    <Box id="ticket" sx={styles.container}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <img alt="logo" src={logo} />
        <Box sx={styles.headerData}>
          <Box sx={styles.headerCol}>
            <Typography sx={styles.headerText}>Nombre:</Typography>
            <Typography sx={styles.headerText}>Fecha:</Typography>
            <Typography sx={styles.headerText}>Hora:</Typography>
            <Typography sx={styles.headerText}>Ticket N°: </Typography>
          </Box>
          <Box sx={styles.headerCol}>
            <Typography sx={styles.headerText}>Consumidor Final</Typography>
            <Typography sx={styles.headerText}>10/08/2023</Typography>
            <Typography sx={styles.headerText}>12:25 hs.</Typography>
            <Typography sx={styles.headerText}>00000</Typography>
          </Box>
        </Box>
      </Box>
      {/* BODY */}
      <Box sx={styles.body}>
        {/* HEADER */}
        <Grid container>
          {/* <Grid xs={2.5}>
            <Typography sx={styles.headerText}>Codigo</Typography>
          </Grid> */}
          <Grid xs={8}>
            <Typography sx={styles.headerText}>Descripcion</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography sx={styles.headerText}>P.U.</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography sx={styles.headerText}>Cant</Typography>
          </Grid>
          {/* DIVIDER */}
          <Grid xs={12} id="ticket-divider">
            <Divider sx={{ backgroundColor: 'black', my: 2 }} />
          </Grid>
          {/* LINES */}
          <Grid xs={12} container>
            <Grid xs={8}>
              <Typography level="body-xs" sx={styles.bodyCell}>
                Abrazadera americana T/1
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Typography level="body-xs" sx={styles.bodyCell}>
                $300.00
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Typography level="body-xs" sx={styles.bodyCell}>
                2
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* DIVIDER */}
      <Divider sx={{ backgroundColor: 'black', my: 1 }} />
      {/* FOOTER */}
      <Box>
        <Grid container>
          <Grid xs={8}>
            <Typography sx={styles.footerTitle}>Total</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography sx={styles.footerValue}>$600.00</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
