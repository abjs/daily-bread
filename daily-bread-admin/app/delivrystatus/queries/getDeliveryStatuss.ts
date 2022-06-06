import { resolver } from 'blitz';
import db from 'db';

export default resolver.pipe(resolver.authorize(), async () => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const donations = await db.donation.findMany({
		select: {
			id: true,
			foodItem: true,
			quantity: true,
			address: true,
			city: true,
			pickupBy: true,
			status: true,
			user: {
				select: {
					name: true,
					email: true,
					phone: true,
				},
			},
		},
		where: {
			OR: [
				{
					status: 'DELIVERED',
				},
				{
					status: 'ONTHEWAY',
				},
				{
					status: 'COMPLETED',
				},
				{
					status: 'ONTHEWAY',
				},
			],
		},
	});
	return {
		donations,
	};
});
