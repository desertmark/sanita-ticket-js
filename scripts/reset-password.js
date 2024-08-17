const path = require('path');
const { config } = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.resolve('prod.env');
const envs = config({ path: envPath });
console.log('Loading envs from:', envPath);
console.log('Loaded envs', envs);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

async function resetPassword(email, password) {
  const usersRes = await supabase.auth.admin.listUsers({
    page: 0,
    perPage: 100000,
  });
  if (usersRes.error) {
    console.error('Error fetching user:', usersRes.error);
    process.exit(1);
  }
  const user = usersRes.data.users.find((u) => u.email === email);
  if (!user) {
    console.error('User not found');
    process.exit(1);
  }
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    password,
  });
  if (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
  console.log('Password reset to', password);
}

const email = process.argv[2];
console.log('Resetting password for', email);
resetPassword(email, 'Password.123');
