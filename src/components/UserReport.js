import { useEffect, useState } from 'react'
import axios from 'axios';
// import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'ID',
		selector: row => row.id,
		sortable: true,
	},
	{
		name: 'Username',
		selector: row => row.user_name,
		sortable: true,
	},
	{
		name: 'First name',
		selector: row => row.first_name,
		sortable: true,
	},
	{
		name: 'Last name',
		selector: row => row.last_name,
		sortable: true,
	},
	// {
	// 	name: 'user_password',
	// 	selector: row => row.user_password,
	// 	sortable: true,
	// },
	{
		name: 'User email',
		selector: row => row.user_email,
		sortable: true,
	},
	{
		name: 'User number',
		selector: row => row.user_number,
		sortable: true,
	},
	// {
	//     name: 'is_admin',
	// 	selector: row => row.is_admin,
	// 	sortable: true,
	// },
	// {
	// 	name: 'created_at',
	// 	selector: row => row.created_at,
	// 	sortable: true,
	// },		
];

// const data = [
//     {
//         id: 1,
//         title: 'Beetlejuice',
//         year: '1988',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
// ]


function UserReport() {
	const [usersListResponse, setUsersListResponse] = useState('');

	const axiosUsersListResponse = async () => {
		const tempUsersListResponse = await axios.get('https://www.janathads.com/api/user-list/')
		setUsersListResponse(tempUsersListResponse.data)
	}

	useEffect(() => {
		axiosUsersListResponse()
	}, [])

	return (
		<div>
			<section className="popular-deals section bg-gray">
				<div className="container py-5">
					<h4 className="linetitle mb-4">Admin Users List</h4>
					<div className="row">
						<div className="col-md-12">
							<DataTable
								columns={columns}
								data={usersListResponse}
								pagination
							/>
						</div>
					</div>

				</div>
			</section>
		</div>
	)

}

export default UserReport;