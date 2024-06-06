import { generateSalt, hashPassword } from '../../utils';
import { useStorage } from './useStorage';

export const useHashedStorage = (key: string) => {
  const saltKey = `__salt__${key}`;
  const { set: setHash, value: hash } = useStorage<string>(key, '');
  const { set: setSalt, value: salt } = useStorage<string>(saltKey, '');
  return {
    async set(newVal: string) {
      const newSalt = generateSalt();
      setSalt(newSalt);
      const newHash = await hashPassword(newVal, newSalt);
      setHash(newHash);
    },

    async isEqual(val: string) {
      const valHash = await hashPassword(val, salt);
      return valHash === hash;
    },
    hash,
  };
};
