import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/joy';
import { useAppState } from '../../providers/AppStateProvider';
import { useProductsStore } from '../../providers/StoreProvider';
import { ProductForm } from '../../components/Forms/ProductForm';
import { IDbProduct } from '../../../types';

export const EditProductView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IDbProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { loader } = useAppState();

  const products = useProductsStore((s) => s.products);
  const loadProducts = useProductsStore((s) => s.loadProducts);
  const updateProduct = useProductsStore((s) => s.updateProduct);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) {
        alert('Id de producto inválido');
        navigate('/products');
        return;
      }
      try {
        setLoading(true);
        // Try to find locally first
        const local = products.find((p) => p.id === Number(id));
        if (local) {
          if (mounted) setProduct(local);
        } else {
          // fallback to API via store
          const resp = await loadProducts();
          const found = resp.items.find((p) => p.id === Number(id));
          if (found && mounted) setProduct(found);
        }
      } catch (e: any) {
        alert(`No se pudo cargar el producto: ${e?.message || 'error'}`);
        navigate('/products');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (updates: Omit<IDbProduct, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await loader.waitFor(updateProduct(Number(id), updates));
      alert('Producto actualizado');
      navigate('/products');
    } catch (e: any) {
      alert(`Error al actualizar el producto: ${e?.message || 'desconocido'}`);
    }
  };

  if (loading) {
    return (
      <Stack sx={{ p: 2 }}>
        <Typography level="h2">Cargando producto...</Typography>
      </Stack>
    );
  }

  if (!product) {
    return (
      <Stack sx={{ p: 2 }}>
        <Typography level="h2">Producto no encontrado</Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography level="h1">Editar producto</Typography>
      <Typography level="body-sm">Modifica los campos del producto y guarda los cambios.</Typography>
      <ProductForm initialProduct={product} onSubmit={handleSubmit} onCancel={() => navigate('/products')} />
    </Stack>
  );
};

export default EditProductView;
