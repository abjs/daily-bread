import { Input } from '@nextui-org/react';
import { resolver } from 'blitz';
import db, { DonationStatus } from 'db';
import { z } from 'zod';

const CreateDonation = z.object({
	id: z.number(),
	foodItem: z.string().min(3).max(50),
	quantity: z.number().min(1),
	address: z.string().min(10),
	city: z.string().min(3).max(50),
	state: z.string().min(3).max(50),
	country: z.string().min(3).max(50),
	pinCode: z.string().min(6).max(6),
	pickupBy: z.string().min(3).max(50),
	status: z.nativeEnum(DonationStatus).optional(),
	comments: z.string().optional(),
});

export default resolver.pipe(resolver.zod(CreateDonation), resolver.authorize(), async (input) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const donation = await db.donation.create({
		data: input,
	});

	return donation;
});
