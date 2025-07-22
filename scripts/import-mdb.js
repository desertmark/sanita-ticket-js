const { readFile, writeFile } = require('fs/promises');
const { resolve } = require('path');
const MDBReader = require('mdb-reader');

const path = require('path');
const { config } = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.resolve('dev.env');
const envs = config({ path: envPath });
console.log('Loading envs from:', envPath);
console.log('Loaded envs', envs);

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function readMDB() {
  const buffer = await readFile(resolve('C:\\Users\\Fer\\dev\\odbc-test\\sanita.mdb'));
  const reader = new MDBReader(buffer);
  const table = await reader.getTable('lista');
  const data = table.getData();
  return data;
}
/*
{
  precio: 50.060001373291016,
  bonif: 40,
  caja1: 9,
  caja2: 9,
  costo: 38.5099983215332,
  utilidad: 1.2999999523162842,
  pl: 56.189998626708984,
  iva: 21,
  dolar: 6.420000076293945,
  flete: 14,
  codigo: '01.01.00.03',
  descripcion: 'ABRAZADERAS T/AMERICANO 9-20   N* 0',
  rubro: 'ABRAZADERAS CARBIZ',
  bonif2: 0,
  tarjeta: 23
}

*/
function toProduct(row) {
  return {
    code: row.codigo,
    code_number: parseInt(row.codigo.replace(/\./g, '')),
    description: row.descripcion,
    price: row.precio,
    discount_percentage: row.bonif,
    discount_percentage_2: row.bonif2,
    cash_discount_1: row.caja1,
    cash_discount_2: row.caja2,
    cost: row.costo,
    profit: row.utilidad,
    list_price: row.pl,
    tax: row.iva,
    dollar: row.dolar,
    freight: row.flete,
    category: row.rubro,
    card: row.tarjeta,
  };
}

async function main() {
  const data = await readMDB();
  const products = data.map(toProduct);
  await writeFile(resolve('products.json'), JSON.stringify(products, null, 2));
  const res = await supabase.from('products').insert(products);
  console.log('Inserted response:', JSON.stringify(res, null, 2));
}

main();
