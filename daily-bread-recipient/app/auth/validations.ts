import { z } from 'zod';

enum userType {
	INDIVIDUAL = 'INDIVIDUAL',
	ORGANIZATION = 'ORGANIZATION',
}

export const email = z
	.string()
	.email()
	.transform((str) => str.toLowerCase().trim());

export const name = z
	.string()
	.min(3)
	.transform((str) => str.toLowerCase().trim());
export const city = z.string().optional();
export const organizationId = z.string().optional();
export const organizationName = z.string().optional();
export const address = z.string().optional();
export const state = z.string().optional();
export const country = z.string().optional();
export const totalMembers = z.number().min(1).optional();
export const pinCode = z.string().min(6).max(6).optional();
export const type = z.nativeEnum(userType).optional();
export const phone = z
	.string()
	.max(10)
	.min(10)
	.transform((str) => str.toLowerCase().trim());

export const password = z
	.string()
	.min(10)
	.max(100)
	.transform((str) => str.trim());

export const Signup = z
	.object({
		name,
		type,
		phone,
		email,
		city,
		state,
		country,
		pinCode,
		address,
		password,
		passwordConfirmation: password,
		totalMembers,
		organizationId,
		organizationName,
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation'], // set the path of the error
	});

export const Login = z.object({
	email,
	password: z.string(),
});

export const ForgotPassword = z.object({
	email,
});

export const ResetPassword = z
	.object({
		password: password,
		passwordConfirmation: password,
		token: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation'], // set the path of the error
	});

export const ChangePassword = z.object({
	currentPassword: z.string(),
	newPassword: password,
});
