import { useMutation } from 'blitz';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import signup from 'app/auth/mutations/signup';
import { Signup } from 'app/auth/validations';
import LabeledPasswordField from 'app/core/components/LabeledPasswordField';

type SignupFormProps = {
	onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
	const [signupMutation] = useMutation(signup);

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div>
				<h1>Create an Account</h1>
				<Form
					submitText="Create Account"
					schema={Signup}
					initialValues={{ email: '', password: '' }}
					onSubmit={async (values) => {
						try {
							await signupMutation(values);
							props.onSuccess?.();
						} catch (error: any) {
							if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
								// This error comes from Prisma
								return { email: 'This email is already being used' };
							} else {
								return { [FORM_ERROR]: error.toString() };
							}
						}
					}}
				>
					<LabeledTextField name="name" label="Name" placeholder="Name" />
					<LabeledTextField name="email" label="Email" placeholder="Email" />
					<LabeledTextField name="phone" label="" placeholder="phone" labelLeft="+91" />
					<LabeledTextField name="type" label="type" placeholder="type"  />
					<LabeledTextField name="organizationId" label="organizationId" placeholder="organizationId"  />
					<LabeledTextField name="organizationName" label="organizationName" placeholder="organizationName"  />
          <LabeledTextField name="address" label="address" placeholder="address" />
          <LabeledTextField name="city" label="city" placeholder="city" />
          <LabeledTextField name="state" label="state" placeholder="state" />
          <LabeledTextField name="country" label="country" placeholder="country" />
					<LabeledPasswordField
						name="password"
						label="Password"
						placeholder="Password"
						type="password"
					/>
					<LabeledPasswordField
						name="passwordConfirmation"
						label="Confirm Password"
						placeholder="Conform Password"
						type="password"
					/>
				</Form>
			</div>
		</div>
	);
};

export default SignupForm;
