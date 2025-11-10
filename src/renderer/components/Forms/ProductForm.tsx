import { FormControl, FormHelperText, FormLabel, Input, Stack } from '@mui/joy';
import { useFormik } from 'formik';
import { FC } from 'react';
import { formatCode } from '../../../utils';

export interface ProductFormProps {}
export interface IProductValues {
  code: string;
  description: string;
}
export const ProductForm: FC<ProductFormProps> = () => {
  const formik = useFormik<IProductValues>({
    initialValues: {
      code: '',
      description: '',
    },
    onSubmit(values: IProductValues) {
      console.log(values);
    },
  });
  return (
    <Stack gap={3}>
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
      <FormControl>
        <FormLabel>Descripcion</FormLabel>
        <Input
          placeholder="p. ej. Deposito a codo loza bco onix 7 lts..."
          value={formik.values.description}
          onChange={(e) => formik.setFieldValue('description', e.target.value)}
        />
        <FormHelperText>Ingresa una descripcion sigificativa para este producto.</FormHelperText>
      </FormControl>
    </Stack>
  );
};
