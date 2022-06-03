import { Suspense } from 'react';
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getDonation from 'app/donations/queries/getDonation';
import deleteDonation from 'app/donations/mutations/deleteDonation';
import { Card, Text } from '@nextui-org/react';

export const Donation = () => {
	const router = useRouter();
	const donationId = useParam('donationId', 'number');
	const [deleteDonationMutation] = useMutation(deleteDonation);
	const [donation] = useQuery(getDonation, { id: donationId });

	return (
		<>
			<Head>
				<title>Donation {donation.id}</title>
			</Head>

			<div>
				<h1>Donation {donation.foodItem}</h1>
				{/* <pre>{JSON.stringify(donation, null, 2)}</pre> */}
				<Card css={{ mw: '330px' }}>
					<Text h4>{donation.foodItem}</Text>
					<Text>Quantity {donation.quantity}</Text>
					<Text>status {donation.status}</Text>
					<Card.Footer>
						<div className="flex">
							<Link href={Routes.EditDonationPage({ donationId: donation.id })}>
								<a>Edit</a>
							</Link>
							<a href="">
								<button
									type="button"
									onClick={async () => {
										if (window.confirm('This will be deleted')) {
											await deleteDonationMutation({ id: donation.id });
											router.push(Routes.DonationsPage());
										}
									}}
									style={{ marginLeft: '0.5rem' }}
								>
									Delete
								</button>
							</a>
						</div>
					</Card.Footer>
				</Card>
			</div>
		</>
	);
};

const ShowDonationPage: BlitzPage = () => {
	return (
		<div>
			<p>
				<Link href={Routes.DonationsPage()}>
					<a>Donations</a>
				</Link>
			</p>

			<Suspense fallback={<div>Loading...</div>}>
				<Donation />
			</Suspense>
		</div>
	);
};

ShowDonationPage.authenticate = true;
ShowDonationPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowDonationPage;
