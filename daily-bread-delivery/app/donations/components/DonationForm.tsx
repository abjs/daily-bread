import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function DonationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
	return (
		<Form<S> {...props}>
			<LabeledTextField name="foodItem" label="foodItem" placeholder="foodItem" />
			<LabeledTextField
				name="quantity"
				label="quantity"
				placeholder="quantity"
				type="number"
			/>
			<LabeledTextField name="address" label="address" placeholder="address" />
			<LabeledTextField name="city" label="city" placeholder="city" />
			<LabeledTextField name="state" label="state" placeholder="state" />
			<LabeledTextField name="country" label="country" placeholder="country" />
			<LabeledTextField name="pinCode" label="pinCode" placeholder="pinCode" />
			<LabeledTextField name="pickupBy" label="pickupBy" placeholder="pickupBy" />
			<LabeledTextField name="comments" label="comments" placeholder="comments" />
		</Form>
	);
}
