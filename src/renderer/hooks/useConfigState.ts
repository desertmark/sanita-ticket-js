import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppState } from '../providers/AppStateProvider';

export interface IPasswordChangeValues {
  password: string;
  confirmPassword: string;
}

export type IFormik = ReturnType<typeof useFormik<IPasswordChangeValues>>;

export interface IConfigState {
  passwordChangeForm: IFormik;
}

const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .matches(/\d/, 'La contraseña debe contener al menos un número'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es requerida'),
});

export const useConfigState = (): IConfigState => {
  const { setAdminPassword } = useAppState();
  const passwordChangeForm = useFormik<IPasswordChangeValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values: IPasswordChangeValues) => {
      try {
        console.log('Form submitted', values);
        await setAdminPassword(values.password);
        passwordChangeForm.resetForm();
      } catch (error: Error | any) {
        console.error('Error changing password', error);
        alert(`Error cambiando la contraseña: ${error?.message || error}`);
      }
    },
  });

  return {
    passwordChangeForm,
  };
};
