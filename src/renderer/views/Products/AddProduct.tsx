import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Stack, Typography, Link, IconButton } from '@mui/joy';
import { Breadcrumbs } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../../components/Forms/ProductForm';

export const AddProductView: FC = () => {
  const navigate = useNavigate();
  return (
    <Stack className="add-products-view" spacing={2}>
      <Stack direction="row" gap={2}>
        <IconButton variant="soft" onClick={() => navigate(-1)}>
          <KeyboardArrowLeft />
        </IconButton>
        <Typography level="h2">Crear producto</Typography>
      </Stack>
      <Typography level="body-sm">Crea un producto nuevo en el sistema ingresando su información básica.</Typography>
      <Breadcrumbs aria-label="breadcrumbs" separator={<KeyboardArrowRight />}>
        <Link color="primary" href="#valid" onClick={() => navigate('/products')}>
          Productos
        </Link>
        <Typography>Crear producto</Typography>
      </Breadcrumbs>

      <ProductForm />
    </Stack>
  );
};
