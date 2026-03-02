import { FC, useMemo } from 'react';
import { useFormik } from 'formik';
import { FormControl, FormHelperText, FormLabel, Input, Stack, Grid, Typography, Sheet, Card } from '@mui/joy';
import { IDbProduct } from '../../../types/products';
import { formatCode, ProductCalculator, toDecimalProportion } from '../../../utils';

export interface ProductFormProps {}
export interface IProductValues {
  code: string;
  description: string;
  list_price: number;
  tax: number;
  discount_percentage: number;
  discount_percentage_2: number;
  cash_discount_1: number;
  cash_discount_2: number;
  profit: number;
  freight: number;
  category: string;
  dollar: number;
  card: number;
}
export const ProductForm: FC<ProductFormProps> = () => {
  const formik = useFormik<IProductValues>({
    initialValues: {
      code: '',
      description: '',
      list_price: 0,
      tax: 21,
      discount_percentage: 0,
      discount_percentage_2: 0,
      cash_discount_1: 0,
      cash_discount_2: 0,
      profit: 0,
      freight: 20,
      category: '',
      dollar: 0,
      card: 10,
    },
    onSubmit(values: IProductValues) {
      // Calcular propiedades derivadas
      const codeNumberText = values.code.replace(/\./g, '');
      const codeNumber = parseInt(codeNumberText) || 0;

      const discounts = [
        toDecimalProportion(values.discount_percentage),
        toDecimalProportion(values.discount_percentage_2),
        toDecimalProportion(values.cash_discount_1),
        toDecimalProportion(values.cash_discount_2),
      ];

      const cost = ProductCalculator.cost(values.list_price, values.tax / 100, discounts);
      const price = ProductCalculator.price(cost, values.profit / 100, values.freight / 100);

      const dbProduct: Omit<IDbProduct, 'id' | 'created_at' | 'updated_at'> = {
        code: values.code,
        code_number: codeNumber,
        code_number_text: codeNumberText,
        description: values.description,
        list_price: values.list_price,
        tax: values.tax,
        discount_percentage: values.discount_percentage,
        discount_percentage_2: values.discount_percentage_2,
        cash_discount_1: values.cash_discount_1,
        cash_discount_2: values.cash_discount_2,
        cost,
        profit: values.profit,
        price,
        freight: values.freight,
        category: values.category,
        dollar: values.dollar,
        card: values.card,
      };

      console.log(dbProduct);
    },
  });

  // Calcular valores derivados para mostrar
  const derivedValues = useMemo(() => {
    const discounts = [
      toDecimalProportion(formik.values.discount_percentage),
      toDecimalProportion(formik.values.discount_percentage_2),
      toDecimalProportion(formik.values.cash_discount_1),
      toDecimalProportion(formik.values.cash_discount_2),
    ];

    const cost = ProductCalculator.cost(formik.values.list_price, formik.values.tax / 100, discounts);
    const price = ProductCalculator.price(cost, formik.values.profit / 100, formik.values.freight / 100);

    return { cost, price };
  }, [
    formik.values.list_price,
    formik.values.tax,
    formik.values.discount_percentage,
    formik.values.discount_percentage_2,
    formik.values.cash_discount_1,
    formik.values.cash_discount_2,
    formik.values.profit,
    formik.values.freight,
  ]);

  return (
    <Stack gap={3}>
      {/* Información básica */}
      <Card variant="outlined" color="primary" sx={{ p: 2, bgcolor: (t) => t.palette.background.body }}>
        <Typography level="title-md">Información Básica</Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>Codigo</FormLabel>
              <Input
                placeholder="00.00.00.00"
                value={formik.values.code}
                slotProps={{
                  input: {
                    maxLength: 11,
                  },
                }}
                onChange={(e) => formik.setFieldValue('code', formatCode(e.target.value))}
              />
              <FormHelperText>Codigo del producto.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Input
                placeholder="p. ej. Sanitarios"
                value={formik.values.category}
                onChange={(e) => formik.setFieldValue('category', e.target.value)}
              />
              <FormHelperText>Categoría del producto.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel>Descripcion</FormLabel>
              <Input
                placeholder="p. ej. Deposito a codo loza bco onix 7 lts..."
                value={formik.values.description}
                onChange={(e) => formik.setFieldValue('description', e.target.value)}
              />
              <FormHelperText>Ingresa una descripcion significativa para este producto.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      {/* Cálculo de Costo */}
      <Card variant="outlined" color="primary" sx={{ p: 2, bgcolor: (t) => t.palette.background.body }}>
        <Typography level="title-md">Cálculo de Costo</Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>Precio de Lista</FormLabel>
              <Input
                type="number"
                startDecorator="$"
                placeholder="0"
                value={formik.values.list_price}
                onChange={(e) => formik.setFieldValue('list_price', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Precio de lista del proveedor.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>IVA</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="21"
                value={formik.values.tax}
                onChange={(e) => formik.setFieldValue('tax', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Porcentaje de IVA.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={3}>
            <FormControl>
              <FormLabel>Bonificación 1</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="0"
                value={formik.values.discount_percentage}
                onChange={(e) => formik.setFieldValue('discount_percentage', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    max: 100,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Primera bonificación.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={3}>
            <FormControl>
              <FormLabel>Bonificación 2</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="0"
                value={formik.values.discount_percentage_2}
                onChange={(e) => formik.setFieldValue('discount_percentage_2', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    max: 100,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Segunda bonificación.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={3}>
            <FormControl>
              <FormLabel>Descuento Caja 1</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="0"
                value={formik.values.cash_discount_1}
                onChange={(e) => formik.setFieldValue('cash_discount_1', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    max: 100,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Primer descuento en efectivo.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={3}>
            <FormControl>
              <FormLabel>Descuento Caja 2</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="0"
                value={formik.values.cash_discount_2}
                onChange={(e) => formik.setFieldValue('cash_discount_2', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    max: 100,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Segundo descuento en efectivo.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel>Costo (calculado)</FormLabel>
              <Input type="number" startDecorator="$" value={derivedValues.cost.toFixed(2)} readOnly disabled />
              <FormHelperText>Calculado automáticamente: (Precio Lista × (1 + IVA - Descuentos)).</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      {/* Cálculo de Precio */}
      <Card variant="outlined" color="primary" sx={{ p: 2, bgcolor: (t) => t.palette.background.body }}>
        <Typography level="title-md">Cálculo de Precio</Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <FormControl>
              <FormLabel>Utilidad</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="0"
                value={formik.values.profit}
                onChange={(e) => formik.setFieldValue('profit', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Porcentaje de ganancia.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={4}>
            <FormControl>
              <FormLabel>Flete</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="20"
                value={formik.values.freight}
                onChange={(e) => formik.setFieldValue('freight', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Porcentaje de transporte.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12} md={4}>
            <FormControl>
              <FormLabel>Tarjeta</FormLabel>
              <Input
                type="number"
                startDecorator="%"
                placeholder="10"
                value={formik.values.card}
                onChange={(e) => formik.setFieldValue('card', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Recargo por tarjeta.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel>Precio (calculado)</FormLabel>
              <Input type="number" startDecorator="$" value={derivedValues.price.toFixed(2)} readOnly disabled />
              <FormHelperText>Calculado automáticamente: (Costo × (1 + Utilidad + Flete)).</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Otros datos */}
      <Card variant="outlined" color="primary" sx={{ p: 2, bgcolor: (t) => t.palette.background.body }}>
        <Typography level="title-md">Otros Datos</Typography>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <FormControl>
              <FormLabel>Precio en dólares</FormLabel>
              <Input
                type="number"
                startDecorator="USD"
                placeholder="0"
                value={formik.values.dollar}
                onChange={(e) => formik.setFieldValue('dollar', parseFloat(e.target.value) || 0)}
                slotProps={{
                  input: {
                    min: 0,
                    step: 0.01,
                  },
                }}
              />
              <FormHelperText>Precio en dólares estadounidenses.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
