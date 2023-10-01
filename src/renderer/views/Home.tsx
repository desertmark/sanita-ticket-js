import { Box, Typography, Button } from '@mui/joy';
import { FC, useEffect, useRef } from 'react';
import { FileOpen } from '@mui/icons-material';
export const HomeView: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const handleFileOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filePath = e.target.files?.[0].path;
    console.log(filePath);
  };
  return (
    <Box className="home-view">
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2">Productos</Typography>
        <input
          ref={ref}
          onChange={handleFileOpen}
          type="file"
          style={{ display: 'none' }}
        />
        <Button
          startDecorator={<FileOpen />}
          onClick={() => ref.current?.click()}
        >
          Abrir
        </Button>
      </Box>
    </Box>
  );
};
