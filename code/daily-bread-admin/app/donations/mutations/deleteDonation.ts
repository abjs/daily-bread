import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeleteDonation = z.object({
	id: z.number(),
});

export default resolver.pipe(resolver.zod(DeleteDonation), resolver.authorize(), async ({ id }) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const donation = await db.donation.deleteMany({ where: { id } });

	return donation;
});
