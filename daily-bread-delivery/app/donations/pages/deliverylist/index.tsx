import { Suspense } from 'react';
import { Head, usePaginatedQuery, BlitzPage, useMutation } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { Table, Tooltip } from '@nextui-org/react';
import getDonations from 'app/donations/queries/getDonations';
import updateDonationStatus from 'app/donations/mutations/updateDonationStatus';

export const DonationsList = () => {
	const [updateDonationMutation] = useMutation(updateDonationStatus);
	const [{ donations }] = usePaginatedQuery(getDonations, {});
	return (
		<div>
			<Table
				aria-label="Example table with static content"
				css={{
					height: 'auto',
					minWidth: '100%',
				}}
			>
				<Table.Header>
					<Table.Column>Food Items</Table.Column>
					<Table.Column>quantity</Table.Column>
					<Table.Column>address</Table.Column>
					<Table.Column>city</Table.Column>
					<Table.Column>pickby</Table.Column>
					<Table.Column>name</Table.Column>
					<Table.Column>email</Table.Column>
					<Table.Column>phone</Table.Column>
					<Table.Column>Approve</Table.Column>
					<Table.Column>Reject</Table.Column>
				</Table.Header>
				<Table.Body>
					{donations.map((donation, index) => (
						<Table.Row key={index}>
							<Table.Cell>{donation.foodItem}</Table.Cell>
							<Table.Cell>{donation.quantity}</Table.Cell>
							<Table.Cell>{donation.address}</Table.Cell>
							<Table.Cell>{donation.city}</Table.Cell>
							<Table.Cell>{donation.pickupBy}</Table.Cell>
							<Table.Cell>{donation.user?.name}</Table.Cell>
							<Table.Cell>{donation.user?.email}</Table.Cell>
							<Table.Cell>{donation.user?.phone}</Table.Cell>
							<Table.Cell>
								<Tooltip content="D">
									<button
										onClick={async () => {
											// await db.donation.update({
											// 	where: { id: donation.id },
											// 	data: {
											// 		status: 'APPROVED',
											// 	},
											// });
											await updateDonationMutation({
												id: donation.id,
												status: 'ONTHEWAY',
											});
										}}
									>
										Pickup
									</button>
								</Tooltip>
							</Table.Cell>
							<Table.Cell>
								<Tooltip content="D">
									<button
										onClick={async () => {
											await updateDonationMutation({
												id: donation.id,
												status: 'DELIVERED',
											});
											// await db.donation.update({
											// 	where: { id: donation.id },
											// 	data: {
											// 		status: 'REJECTED',
											// 	},
											// });
										}}
									>
										Delivered
									</button>
								</Tooltip>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

const DonationsPage: BlitzPage = () => {
	return (
		<>
			<Head>
				<title>Donations</title>
			</Head>

			<div>
				<Suspense fallback={<div>Loading...</div>}>
					<DonationsList />
				</Suspense>
			</div>
		</>
	);
};

DonationsPage.authenticate = true;
DonationsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default DonationsPage;
