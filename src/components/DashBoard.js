import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import banner from '../utilities/images/home/hero.jpg';


function DashBoard() {
	const user_detail = JSON.parse(localStorage.getItem('user_detail'));
	const [allClassifieds, setAllClassifieds] = useState('');
	const [userDetail, setUserDetail] = useState('');
	const [searchText, setSerachText] = useState('');
	const [clearAllSearchText, setClearAllSearchText] = useState(false);

	const deleteClassified = async (adId) => {
		await axios.delete('https://www.janathads.com/api/classified-delete/' + adId)
			.then((adsResponse) => {
				axiosClassifiedResponse()
				}
			)
		alert('Add successfully deleted ');
	}

	const axiosClassifiedResponse = async () => {
		await axios.get('https://www.janathads.com/api/classified-detail-byuser/' + user_detail.userId)
			.then((adsResponse) => {
				if (searchText.length === 1) {
					setSerachText('')
				}
				const filteredData = adsResponse.data.filter(item => {
					return Object.keys(item).some(key => {
						if (item[key]) {
							return item[key].toString().toLowerCase().includes(searchText)
						} else {
							return false;
						}
					})
				})
				setAllClassifieds(filteredData)
				setClearAllSearchText(false)
			}
			)
	}
	const axiosUserDetailResponse = async () => {
		await axios.get('https://www.janathads.com/api/user-detail/' + user_detail.userId)
			.then((adsResponse) => {
				setUserDetail(adsResponse.data)
			}
			)
	}
	useEffect(() => {
		axiosUserDetailResponse()
		axiosClassifiedResponse()
	}, [clearAllSearchText])


	const handleChange = (searchFieldText) => {
		setSerachText(searchFieldText)
		searchFieldText = searchFieldText.toLowerCase().trim()
		if (!searchFieldText) {
			axiosClassifiedResponse()
		} else {
			const filteredData = allClassifieds.filter(item => {
				return Object.keys(item).some(key => {
					if (item[key]) {
						return item[key].toString().toLowerCase().includes(searchFieldText)
					} else {
						return false;
					}
				})
			})
			setAllClassifieds(filteredData)
		}
	}

	const clearSearchText = (e) => {
		e.preventDefault();
		setClearAllSearchText(true)
		setSerachText('')
		axiosClassifiedResponse()
	}

	function findDayDifference(adUpdatedDate) {
		const current_date = new Date();
		adUpdatedDate = new Date(adUpdatedDate);
		return Math.floor((Math.abs(current_date - adUpdatedDate)) / (1000 * 60 * 60 * 24));
	}

	return (
		<div>

			<section className="dashboard section">
				<div className="container">
					<img src={banner} alt="My Ads" className="rounded-xl my-4 shadow-lg img-fluid" />
					<div className="row">
						<div className="col-lg-3">
							<div className="sidebar">
								<div className="widget user-dashboard-profile">
									<div className="profile-thumb">
										<img className="rounded-circle shadow-lg" src={"https://www.janathads.com/media/site_images/user-avatar.png"} alt="user-avatar" />
									</div>
									<h5 className="text-center">{userDetail.first_name + ' ' + userDetail.last_name}</h5>
									<p className="text-center small text-muted">Joined : {userDetail.created_at ? new Date(userDetail.created_at).toISOString().slice(0, 10) : ''}</p>

								</div>
								<div className="widget user-dashboard-menu">
									<ul className="list-group list-group-flush">
										<li className="list-group-item" ><Link to="/superadmin/dashboard" className="text-dark text-decoration-none">
											<i className="fa fa-user mr-3"></i> My Ads  <span>5</span></Link>
										</li>
										<li className="list-group-item"><a href="" className="text-danger text-decoration-none"><i className="fa fa-power-off mr-3"></i>Delete Account</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="bg-white mt-lg-n5 z-index-1 p-4 rounded-lg">
								<div className="block d-flex mb-4">
									<input type="text" onChange={(e) => handleChange(e.target.value)} value={searchText} className="form-control mb-2 mr-sm-2 mb-sm-0" id="ad_search" placeholder="Search for ads" />
									<button type="submit" onClick={clearSearchText} className="btn btn-danger">Clear</button>
								</div>
								<h3 className="heading">My Ads</h3>
								<div className="table-responsive">
									<table className="table product-dashboard-table">
										<thead>
											<tr>
												<th>Image</th>
												<th>Ad description</th>
												<th className="text-center">Ad Category</th>
												<th className="text-center">Ad Hidden</th>
												<th className="text-center">Ads Expire</th>
												<th className="text-center">How Old Ad is</th>
												<th className="text-center">Action</th>
											</tr>
										</thead>
										<tbody>
											{allClassifieds ?
												allClassifieds.map((eachAd, index) => {
													return (
														<tr key={index}>
															<td>
																<div className="ranbdom-color"><img width="80px" height="auto" src={"https://www.janathads.com/media/" + eachAd.images} alt="" /></div></td>
															<td className="product-details">
																<p className="font-weight-bold mb-1">{eachAd.title}</p>
																<p className="status active mb-0"><span className="badge badge-pill badge-success font-weight-normal">{eachAd.status_id.status}</span></p>
																<p className="add-id mb-0">Ad ID: {eachAd.id}</p>
																<p className="mb-0"><i className="fa fa-calendar mr-2"></i><time>{new Date(eachAd.created_at).toISOString().slice(0, 10)}</time> </p>
																<p className="location mb-0"><i className="fa fa-map-marker mr-2"></i>{eachAd.district_id.district}</p>
															</td>
															<td className="product-category"><span className="categories">{eachAd.category_id.category}</span></td>
															<td className="product-category"><span className="categories">{eachAd.is_hide ? "No" : "Yes"}</span></td>
															<td className="product-category"><span className="categories">{eachAd.ads_expire_day}</span></td>
															<td className="product-category"><span className="categories">{findDayDifference(eachAd.updated_at)}</span></td>
															<td className="action" data-title="Action">
																<div className="">
																	<ul className="list-inline justify-content-center text-nowrap">
																		<li className="list-inline-item">
																			<Link to={"/classified-view/" + eachAd.id} target={"_blank"} data-toggle="tooltip" data-placement="top" title="View Ad" className="view btn btn-sm btn-info" >
																				<i className="fa fa-eye"></i>
																			</Link>
																		</li>
																		<li className="list-inline-item">
																			<Link className="edit btn btn-sm btn-warning" title="Edit Ad" to={"/classified-edit/" + eachAd.id}>
																				<i className="fa fa-pencil"></i>
																			</Link>
																		</li>
																		<li className="list-inline-item">
																			<Link to="/superadmin/dashboard" onClick={() => deleteClassified(eachAd.id)} className="delete btn btn-sm btn-danger" title="Delete Ad">
																				<i className="fa fa-trash"></i>
																			</Link>
																		</li>
																	</ul>
																</div>
															</td>
														</tr>
													)
												})
												:
												<tr>
													<td className="product-details">None</td>
												</tr>
											}
										</tbody>
									</table>
								</div>

							</div>
						</div>
					</div>
				</div>
			</section>


		</div>
	)
}

export default DashBoard;