# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2025-05-18

## Add

- Code filter for history page
- When list is filtered by code, all rows expand and bought products are highlighted in green and return products in red.
- New migration for tickets history to change column type from json to jsonb.

## [1.4.0] - 2025-02-23

## Add

- Return ticket selection when creating a ticket for return amount discount.

## [1.3.1] - 2025-01-20

## Fixed

- Code column not being exported with the correct value when exporting as xsls with detail.

## [1.3.0] - 2024-12-09

## Add

- New method of payment: transaferencia

## [1.2.0] - 2024-08-31

## Add

- Download history items as CSV file.

## Fixed

- Page size not working

## [1.1.0] - 2024-08-31

## Add

- Print modal opens with ticket and print button after saving ticket.

## Fixed

- Fixed discount column on history table showing same as subtotal. Now it shows the discount amount.

## Fixed

- Ticket history print button now prints ok.

## [1.0.1] - 2024-08-17

## Add

- Fix print from modal.

## [1.0.0] - 2024-06-05

## Add

- Ticket history page.
- Integration with Supabase for data storage and login.
- Home buttons rearranged.
- Login with username and password.

## Removed

- Local administrator password.
- Local storage of ticket number.

## [0.8.1] - 2024-86-17

## Fix

- Width de impresion haciendo overflow de la impresora de tickets.

## [0.8.0] - 2024-06-05

## Add

- Menu de navegacion
- Vista de settings
- Cambio de contraseña
- Autenticacion con password de administrador para editar numero de ticket y cambio de contraseña

## [0.7.0] - 2024-06-05

## Add

- Clean product list button
- Last open file and date time

## [0.6.2] - 2024-01-27

## Fixed

- Revert and show price column again.

## [0.6.1] - 2023-11-04

## Fixed

- Calcular y mostrar el precio final correcto

## [0.6.0] - 2023-10-22

## Add

- Selector de metodo de pago
- Input para ingresar el un porcentage de descuento

## [0.5.0] - 2023-10-22

## Add

- Numero de version en el header
- Logo antes del titulo de la app

## [0.4.0] - 2023-10-22

## Fixed

- Downgrade electron to 22.x version so it works in windows 7

## [0.3.0] - 2023-10-22

## Add

- Lista de productos presistente en el localstorage.
- Tooltip en los botones nuevo ticket y abrir.

## [0.2.0] - 2023-10-22

## Add

- Numero de ticket editable y funcional.
- Boton para incrementar el numero de ticket y limpiar el formulario.
- Numero de ticket persistente en el localstorage.

## [0.1.0] - 2023-10-14

## Add

- Columna importe en el ticket
- Consumidor Final como cabecera del ticket.
- Muchas gracias en el footer del ticket.
- Boton para limpiar pantalla
- Eliminacion de menus y cambio de nombre a sanita ticket.

## [0.0.1] - 2023-10-01

## Add

- Electron app with NestJS in the backend, react in the frontend along with mui/joy components framework.
