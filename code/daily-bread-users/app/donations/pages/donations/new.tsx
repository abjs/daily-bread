import { Link, useRouter, useMutation, BlitzPage, Routes, useQuery, useParam } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import createDonation from 'app/donations/mutations/createDonation';
import { DonationForm, FORM_ERROR } from 'app/donations/components/DonationForm';
import { CreateDonation } from 'app/donations/validations';

export const NewDonationPage: BlitzPage = () => {
	const router = useRouter();
	const [createDonationMutation] = useMutation(createDonation);
	const userId = useParam('userId', 'number');

	return (
		<div>
			<h1>Create New Donation</h1>

			<DonationForm
				submitText="Create Donation"
				// TODO use a zod schema for form validation
				//  - Tip: extract mutation's schema into a shared `validations.ts` file and
				//         then import and use it here
				schema={CreateDonation}
				initialValues={{
					state: 'Kerala',
					country: 'India',
				}}
				onSubmit={async (values) => {
					try {
						const donation = await createDonationMutation({
							...values,
							id: userId as number,
						});
						router.push(Routes.ShowDonationPage({ donationId: donation.id }));
					} catch (error: any) {
						console.error(error);
						return {
							[FORM_ERROR]: error.toString(),
						};
					}
				}}
			/>

			<p>
				<Link href={Routes.DonationsPage()}>
					<a>Donations</a>
				</Link>
			</p>
		</div>
	);
};

NewDonationPage.authenticate = true;
NewDonationPage.getLayout = (page) => <Layout title={'Create New Donation'}>{page}</Layout>;

export default NewDonationPage;
