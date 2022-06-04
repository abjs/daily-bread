import { DonationStatus } from '@prisma/client';
import { z } from 'zod';
export const CreateDonation = z.object({
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
