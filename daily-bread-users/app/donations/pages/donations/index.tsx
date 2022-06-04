import { Suspense } from 'react';
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getDonations from 'app/donations/queries/getDonations';

const ITEMS_PER_PAGE = 100;

export const DonationsList = () => {
	const router = useRouter();
	const page = Number(router.query.page) || 0;
	const [{ donations, hasMore }] = usePaginatedQuery(getDonations, {
		orderBy: { id: 'asc' },
		skip: ITEMS_PER_PAGE * page,
		take: ITEMS_PER_PAGE,
	});

	const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
	const goToNextPage = () => router.push({ query: { page: page + 1 } });

	return (
		<div>
			<ul>
				{donations.map((donation) => (
					<li key={donation.id}>
						<Link href={Routes.ShowDonationPage({ donationId: donation.id })}>
							<a>{donation.foodItem}</a>
						</Link>
					</li>
				))}
			</ul>

			<button disabled={page === 0} onClick={goToPreviousPage}>
				Previous
			</button>
			<button disabled={!hasMore} onClick={goToNextPage}>
				Next
			</button>
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
				<p>
					<Link href={Routes.NewDonationPage({ id: 'w' })}>
						<a>Create Donation</a>
					</Link>
				</p>

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
