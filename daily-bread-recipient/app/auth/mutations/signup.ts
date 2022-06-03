import { resolver, SecurePassword } from 'blitz';
import db from 'db';
import { Signup } from 'app/auth/validations';
import { Role } from 'types';

export default resolver.pipe(
	resolver.zod(Signup),
	async (
		{
			email,
			password,
			name,
			phone,
			address,
			city,
			country,
			organizationId,
			pinCode,
			organizationName,
			state,
			totalMembers,
			type,
		},
		ctx,
	) => {
		const hashedPassword = await SecurePassword.hash(password.trim());
		const user = await db.user.create({
			data: {
				email: email.toLowerCase().trim(),
				hashedPassword,
				role: 'RECIPIENT',
				name,
				phone,
				address,
				city,
				country,
				organizationId,
				pinCode,
				organizationName,
				state,
				totalMembers,
				type,
			},
			select: { id: true, name: true, email: true, role: true },
		});

		await ctx.session.$create({ userId: user.id, role: user.role as Role });
		return user;
	},
);
