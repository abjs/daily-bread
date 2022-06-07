import { DonationStatus } from '@prisma/client';
import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const UpdateDonation = z.object({
	id: z.number(),
	foodItem: z.string().min(3).max(50),
	quantity: z.number().min(1),
	address: z.string().min(10),
	city: z.string().min(3).max(50),
	state: z.string().min(3).max(50),
	country: z.string().min(3).max(50),
	pinCode: z.string().min(6).max(6),
	pickupBy: z.string().min(3).max(50),
	status: z.nativeEnum(DonationStatus),
	comments: z.string().optional(),
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
