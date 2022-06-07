import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';

import { Input } from '@nextui-org/react';

export interface LabeledPasswordFieldProps extends ComponentPropsWithoutRef<typeof Input> {
	/** Field name. */
	name: string;
	/** Field label. */
	label: string;
	/** Field type. Doesn't include radio buttons and checkboxes */
	type?: 'text' | 'password' | 'email' | 'number';
	outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
	labelProps?: ComponentPropsWithoutRef<'label'>;
	fieldProps?: UseFieldConfig<string>;
}

export const LabeledPasswordField = forwardRef<HTMLInputElement, LabeledPasswordFieldProps>(
	({ name, label, placeholder, outerProps, fieldProps, labelProps, ...props }, ref) => {
		const {
			input,
			meta: { touched, error, submitError, submitting },
		} = useField(name, {
			parse:
				props.type === 'number'
					? (Number as any)
					: // Converting `""` to `null` ensures empty values will be set to null in the DB
					  (v) => (v === '' ? null : v),
			...fieldProps,
		});

		const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError;

		return (
			<div {...outerProps}>
				{/* <label {...labelProps}> */}
				{/* @ts-ignore */}

				<Input.Password
					placeholder={placeholder}
					clearable
					{...input}
					disabled={submitting}
					{...props}
					// helperText={touched && normalizedError}
					ref={ref}
				/>
				{/* </label> */}
				{touched && normalizedError && (
					<div role="alert" style={{ color: 'red' }}>
						{normalizedError}
					</div>
				)}
			</div>
		);
	},
);

export default LabeledPasswordField;
