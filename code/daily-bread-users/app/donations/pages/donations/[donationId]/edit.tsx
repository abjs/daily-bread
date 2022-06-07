import { Suspense } from 'react';
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getDonation from 'app/donations/queries/getDonation';
import updateDonation from 'app/donations/mutations/updateDonation';
import { DonationForm, FORM_ERROR } from 'app/donations/components/DonationForm';
import { Card, Text } from '@nextui-org/react';

export const EditDonation = () => {
	const router = useRouter();
	const donationId = useParam('donationId', 'number');
	const [donation, { setQueryData }] = useQuery(
		getDonation,
		{ id: donationId },
		{
			// This ensures the query never refreshes and overwrites the form data while the user is editing.
			staleTime: Infinity,
		},
	);
	const [updateDonationMutation] = useMutation(updateDonation);

	return (
		<>
			<Head>
				<title>Edit Donation {donation.id}</title>
			</Head>

			<div>
				<h1>Edit Donation {donation.id}</h1>
				<DonationForm
					submitText="Update Donation"
					// TODO use a zod schema for form validation
					//  - Tip: extract mutation's schema into a shared `validations.ts` file and
					//         then import and use it here
					// schema={UpdateDonation}
					initialValues={donation}
					onSubmit={async (values) => {
						try {
							const updated = await updateDonationMutation({
								id: donation.id,
								...values,
							});
							await setQueryData(updated);
							router.push(Routes.ShowDonationPage({ donationId: updated.id }));
						} catch (error: any) {
							console.error(error);
							return {
								[FORM_ERROR]: error.toString(),
							};
						}
					}}
				/>
			</div>
		</>
	);
};

const EditDonationPage: BlitzPage = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<EditDonation />
			</Suspense>

			<p>
				<Link href={Routes.DonationsPage()}>
					<a>Donations</a>
				</Link>
			</p>
		</div>
	);
};

EditDonationPage.authenticate = true;
EditDonationPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditDonationPage;
