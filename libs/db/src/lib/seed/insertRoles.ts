import { db } from '../db';
import { roles } from '../schemas/roles';

const main = async () => {
  try {
    await db.insert(roles).values([
      {
        name: 'SiteAdmin',
      },
      {
        name: 'ShelterAdmin',
      },
      {
        name: 'ShelterSuperAdmin',
      },
    ]);
    console.error('Successfully inserted roles');
  } catch (error) {
    console.error('Unable to insert roles', error);
  }
};

main();
