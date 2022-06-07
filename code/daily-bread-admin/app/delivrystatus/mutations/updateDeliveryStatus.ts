import { DonationStatus } from '@prisma/client';
import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const UpdateDonation = z.object({
	id: z.number(),
	status: z.nativeEnum(DonationStatus),
});

export default resolver.pipe(
	resolver.zod(UpdateDonation),
	resolver.authorize(),
	async ({ id, ...data }) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const donation = await db.donation.update({ where: { id }, data });

		return donation;
	},
);
