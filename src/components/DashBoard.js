import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function DashBoard(){
    const user_detail = JSON.parse(localStorage.getItem('user_detail')); 
	const [allClassifieds, setAllClassifieds] = useState('');
	const [userDetail, setUserDetail] = useState('');
	const [searchText, setSerachText] = useState('');
	const [clearAllSearchText, setClearAllSearchText] = useState(false);	

	const deleteClassified = async (adId) => {
        await axios.delete('http://55mahesh.pythonanywhere.com/api/classified-delete/'+adId)
            .then((adsResponse) => {
				axiosClassifiedResponse()
			}
		)
		alert('Add '+ adId +' successfully deleted ');
	}		

    const axiosClassifiedResponse = async () => {
        await axios.get('http://55mahesh.pythonanywhere.com/api/classified-detail-byuser/'+user_detail.userId)
            .then((adsResponse) => {
				if(searchText.length === 1){
					setSerachText('')
				}				
				const filteredData = adsResponse.data.filter(item =>{
					return Object.keys(item).some(key => {
						if(item[key]){
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
        await axios.get('http://55mahesh.pythonanywhere.com/api/user-detail/'+user_detail.userId)
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
		if(!searchFieldText){
			axiosClassifiedResponse()
		} else {
			const filteredData = allClassifieds.filter(item =>{
				return Object.keys(item).some(key => {
					if(item[key]){
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
		return Math.floor((Math.abs(current_date-adUpdatedDate))/(1000*60*60*24));
	}

    return(
    <div>

		<section className="dashboard section">
			<div className="container">
				<div className="row">
					<div className="col-md-10 offset-md-1 col-lg-4 offset-lg-0">
						<div className="sidebar">
							<div className="widget user-dashboard-profile">
								<div className="profile-thumb">
									<img className="rounded-circle" src={ "http://55mahesh.pythonanywhere.com/media/site_images/user-avatar.png"} alt="user-avatar"/>
								</div>
								<h5 className="text-center">{userDetail.first_name + ' ' + userDetail.last_name}</h5>
								<p>Joined at {userDetail.created_at?new Date(userDetail.created_at).toISOString().slice(0, 10):''}</p>
								<Link className="btn btn-main-sm" to={{pathname:'/admin/edit-dashboard/', state:userDetail}}>Edit Profile</Link>
							</div>
							<div className="widget user-dashboard-menu">
								<ul>
									<li className="active" ><Link to="/admin/dashboard">
										<i className="fa fa-user"></i> My Ads  <span>-</span></Link>
									</li>
									<li><a href=""><i className="fa fa-power-off"></i>Delete Account</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-md-10 offset-md-1 col-lg-8 offset-lg-0">
						<div className="widget dashboard-container my-adslist">
							<h3 className="widget-header">My Ads</h3>
							<div className="col-lg-8 col-md-6">
								<div className="block d-flex">
									<input type="text" onChange={(e)=> handleChange(e.target.value)} value={searchText} className="form-control mb-2 mr-sm-2 mb-sm-0" id="ad_search" placeholder="Search for ads"/>
									<button type="submit" onClick={clearSearchText} className="btn btn-main">Clear</button>
								</div>
							</div>					
							<table className="table table-responsive product-dashboard-table">
								<thead>
									<tr>
										<th>Image</th>
										<th>Ad description</th>
										<th className="text-center">Ad Category</th>
										<th className="text-center">Ad Hidden</th>
										<th className="text-center">How Old Ad is</th>
										<th className="text-center">Action</th>								
									</tr>
								</thead>
								<tbody>
									{allClassifieds ?
									allClassifieds.map((eachAd, index) => {
										return(
											<tr key={index}>
											<td className="product-thumb">
												<img width="80px" height="auto" src={"http://55mahesh.pythonanywhere.com/media/"+eachAd.images} alt="asaimage"/></td>
											<td className="product-details">
												<h3 className="title">{eachAd.title}</h3>
												<span className="add-id"><strong>Ad ID:</strong> {eachAd.id}</span>
												<span><strong>Posted on:</strong><time>{new Date(eachAd.created_at).toISOString().slice(0, 10)}</time> </span>
												<span className="status active"><strong>Status</strong>{eachAd.status_id.status}</span>
												<span className="location"><strong>Location</strong>{eachAd.district_id.district}</span>
											</td>
											<td className="product-category"><span className="categories">{eachAd.category_id.category}</span></td>
											<td className="product-category"><span className="categories">{eachAd.is_hide?"No":"Yes"}</span></td>
											<td className="product-category"><span className="categories">{findDayDifference(eachAd.updated_at)}</span></td>									
											<td className="action" data-title="Action">
												<div className="">
													<ul className="list-inline justify-content-center">
														<li className="list-inline-item">
															<Link target={"_blank"}  to={"/classified-view/"+eachAd.id} data-toggle="tooltip" data-placement="top" title="View Ad" className="view" >
																<i className="fa fa-eye"></i>
															</Link>
														</li>
														<li className="list-inline-item">
															<Link className="edit" title="Edit Ad" to={"/classified-edit/"+eachAd.id}>
																<i className="fa fa-pencil"></i>
															</Link>
														</li>
														<li className="list-inline-item">
															<Link to="/admin/dashboard" onClick={() => deleteClassified(eachAd.id)} className="delete" title="Delete Ad">
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
		</section>

        
    </div>
    )
}

export default  DashBoard;