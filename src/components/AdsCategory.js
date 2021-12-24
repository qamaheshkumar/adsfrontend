import {useEffect, useState} from 'react'
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

// import { useLocation } from 'react-router-dom';
// import { usePosition } from 'use-position';


function AdsCategory() {
	console.log('display header ---');

	// const currentLocation = useLocation();
	// const {latitude, longitude, error} = usePosition();
	// console.log('currentLocation --> ' + latitude);
	// console.log('currentLocation --> ' + longitude);

	// <Header></Header>
	// useEffect(() => {
	// // 	console.log('display header ---')
	// // 	<Header></Header>
	// 	const userDetails = sessionStorage.getItem('user_detail')
	// 	console.log('tset ==> '+ JSON.stringify(userDetails))
	// 	if(userDetails){
	// 		console.log('tset 11 ==> '+ JSON.stringify(userDetails));
	// 		// <Index values={userDetails}></Index>
	// 		// return (
	// 		// 	console.log('tset 11 ==> '+ JSON.stringify(userDetails));
	// 		// 	<Header values={userDetails}></Header>
	// 		// );
	// 	}
	// }, [])

	const { categoryId } = useParams();
    console.log('categoryId ==> ', categoryId)

	const [allClassifieds, setAllClassifieds] = useState('');
	const [disctrictId, setDisctrictId] = useState('0');
	const [allDistrict, setAllDistrict] = useState('');
	const [searchText, setSerachText] = useState('');
	const [allCategory, setAllCategory] = useState('');
	const [adsCategory, setAdsCategory] = useState('');
	const [clearAllSearchText, setClearAllSearchText] = useState(false);
	// const [, setSerachText] = useState('');
	// const [filteredData, setFilteredData] = useState('');
	const history = useNavigate();

    const axiosClassifiedResponse = async (disctrictId) => {
		console.log('disctrictId 11 => ' + disctrictId)
		setDisctrictId(disctrictId)
		console.log('searchFieldText 1111 ==========> ', searchText)
		let classifiedUrl = 'http://55mahesh.pythonanywhere.com/api/classified-list-bydistrict/'+disctrictId+'/'
		if(disctrictId === '0'){
			classifiedUrl = 'http://55mahesh.pythonanywhere.com/api/category-view/'+categoryId
		}
		await axios.get(classifiedUrl)
			.then((adsResponse) => {
				// setAllClassifieds(adsResponse.data)
				console.log(' leng -------------------->>> ', searchText.length)
				if(searchText.length == 1){
					setSerachText('')
				}			
				console.log('leng ************************ -> ', searchText)
				const filteredData = adsResponse.data.filter(item =>{
					return Object.keys(item).some(key => {
						if(item[key] && item['category_id']['id']==categoryId){
							return item[key].toString().toLowerCase().includes(searchText)
						}
					})
				})				
				setAllClassifieds(filteredData)
				setClearAllSearchText(false)
				// console.log('searchFieldText 5555 ==========> ', searchText)
			}
		)
	}
    const axiosDistrictResponse = async () => {
		await axios.get('http://55mahesh.pythonanywhere.com/api/district-list/')
			.then((districtResponse) => {
				setAllDistrict(districtResponse.data)
			}
		)
        // const districtResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/district-list/')
		// const tempAllDistrict = await districtResponse.data
        // setAllDistrict(tempAllDistrict)
        console.log('allDistrict ==> ', allDistrict)
    }	



	const handleChange = (searchFieldText) => {
		setSerachText(searchFieldText)
		// setSerachText()
		// const searchFieldText = searchText.toLowerCase().trim()
		searchFieldText = searchFieldText.toLowerCase().trim()
		console.log('searchFieldText ==========> ', searchFieldText)
		if(!searchFieldText){
			console.log('m here ', disctrictId)
			setAllClassifieds(getDistValue(disctrictId))
			// const filteredData = allClassifieds.filter(item =>{
			// 	return Object.keys(item).some(key => {
			// 		return item[key].toString().toLowerCase().includes(searchFieldText)
			// 	})
			// })
			// setAllClassifieds(allClassifieds)			
		} else{
			console.log('m here 22 ', disctrictId)
			const filteredData = allClassifieds.filter(item =>{
				return Object.keys(item).some(key => {
					if(item[key]){
						return item[key].toString().toLowerCase().includes(searchFieldText)
					}		
				})
			})
			console.log('hndle change -->', filteredData)
			setAllClassifieds(filteredData)
		}
		// allClassifieds.
	}	

	const clearSearchText = (e) => {
		e.preventDefault();
		setClearAllSearchText(true)
		setSerachText('')
		axiosClassifiedResponse(disctrictId)
		// console.log('clear 1 => ', disctrictId)
		// console.log('clear 2 => ', searchText)
		// if(searchText){
		// 	setSerachText('')
		// 	axiosClassifiedResponse(disctrictId)
		// } else {
		// 	axiosClassifiedResponse(disctrictId)
		// }

		// console.log('disctrictId push ===> ', disctrictId)
		// setSerachText('')
		// getDistValue(disctrictId)
		// setAllClassifieds()
		// setAllClassifieds(getDistValue(disctrictId))
		// history('')
	}

    const axiosCategoryResponse = async () => {
        const categoryResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/category-list/')
        setAllCategory(categoryResponse.data)
		const allCategory = await categoryResponse.data
		const selectedCategory = allCategory.map(item =>{
			if(item.id == categoryId){
				return item.category	
			}	
		}).filter(function(elm){
			return elm !== undefined;
		})
		console.log('allCategory ==> ', allCategory)
		setAdsCategory(selectedCategory[0])
		console.log('allCategory  selectedCategory ==> ', selectedCategory[0])
    }	

	useEffect(() => {
		console.log('disctrictId 00 => ' + disctrictId)
		axiosDistrictResponse()
		axiosCategoryResponse()
		axiosClassifiedResponse(disctrictId)
		// handleChange(searchText)
	}, [clearAllSearchText])

	// setFilteredData(allClassifieds)
	console.log('allClassifieds 22 ==> ', allClassifieds)	
	// console.log('allDistrict 22 ==> ', allDistrict)
	
	const getDistValue = (disctrictId) => {
		console.log('test ==> ' + disctrictId)
		setDisctrictId(disctrictId)
		axiosClassifiedResponse(disctrictId)
	}	

    return (
        <div>
{/*===============================
=            Hero Area            =
================================*/}
<section className="hero-area bg-1 text-center overly">
	{/* Container Start */}
	<div className="container">
		<div className="row">
			<div className="col-md-12">
				{/* Header Contetnt */}
				<div className="content-block">
					{/* <h1>Buy and Sell Near You </h1> */}
					<h1>Advertisements for {adsCategory}</h1>
					{/* <p>Join the millions who buy and sell from each other</p> <br> <p> everyday in local communities around the world</p> */}
					<div className="short-popular-category-list text-center">
						<h2>Ads Available In Locations</h2>
						<ul className="list-inline">
							<li className="list-inline-item">
								<Link to="" onClick={()=>getDistValue("0")} > All</Link>
							</li>
							{allDistrict?
								allDistrict.map((district, index) => {
									return(
										<li className="list-inline-item" key={index}>
											<Link to="" onClick={()=>getDistValue(district.id)} > {district.district}</Link>
										</li>										
									)
								}
							)
							:
							""
							}
						</ul>
					</div>
					{/* <div className="short-popular-category-list text-center">
						<h2>Popular Category</h2>
						<ul className="list-inline">
							<li className="list-inline-item">
								<a href=""><i className="fa fa-bed"></i> Hotel</a></li>
							<li className="list-inline-item">
								<a href=""><i className="fa fa-grav"></i> Fitness</a>
							</li>
							<li className="list-inline-item">
								<a href=""><i className="fa fa-car"></i> Cars</a>
							</li>
							<li className="list-inline-item">
								<a href=""><i className="fa fa-cutlery"></i> Restaurants</a>
							</li>
							<li className="list-inline-item">
								<a href=""><i className="fa fa-coffee"></i> Cafe</a>
							</li>
						</ul>
					</div>					 */}
					
				</div>
				{/* Advance Search */}
				<div className="advance-search">
					<form action="#">
						<div className="row">
							{/* Store Search */}
							{/* <div className="col-lg-6 col-md-12">
								<div className="block d-flex">
									<input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="search" placeholder="Search for store"/>
								</div>
							</div> */}
							<div className="col-lg-12 col-md-8">
								<div className="block d-flex">
									<input type="text" onChange={(e)=> handleChange(e.target.value)} value={searchText} className="form-control mb-2 mr-sm-2 mb-sm-0" id="ad_search" placeholder="Search for ads"/>
									{/* Search Button */}
									<button type="submit" onClick={clearSearchText} className="btn btn-main">Clear</button>
								</div>
							</div>
						</div>
					</form>
					
				</div>
				
			</div>
		</div>
	</div>
	{/* Container End */}
</section>

{/*===================================
=            Client Slider            =
====================================*/}


{/*===========================================
=            Popular deals section            =
============================================*/}

<section className="popular-deals section bg-gray">
	<div className="container">
		<div className="row">
			{/* offer 01 */}
			{allClassifieds?
				allClassifieds.map((eachAd, index) =>  {
					if(eachAd.is_hide){
						return(
							<div className="col-sm-12 col-lg-4" key={index}>
								{/* product card */}
								<div className="product-item bg-light">
									<div className="card">
										<div className="thumb-content">
											{/* <div className="price">$200</div> */}
											{eachAd.images?
											<Link to={"/classified-view/"+eachAd.id}>
												{/* <img className="card-img-top img-fluid" src="images/products/products-1.jpg" alt="Card image cap"/> */}
												<img className="card-img-top img-fluid" src={ "http://55mahesh.pythonanywhere.com/media/"+eachAd.images} alt="image description"/>
											</Link>
											: ''
											}
										</div>
										<div className="card-body">
											<h4 className="card-title"><Link to={"/classified-view/"+eachAd.id}>{eachAd.title}</Link></h4>
											<ul className="list-inline product-meta">
												<li className="list-inline-item">
													<i className="fa fa-folder-open-o"></i>{eachAd.district_id.district}
												</li>										
												<li className="list-inline-item">
													<i className="fa fa-folder-open-o"></i>{eachAd.category_id.category}
												</li>
												<li className="list-inline-item">
													<i className="fa fa-calendar"></i>{new Date(eachAd.updated_at).toISOString().slice(0, 10)}
												</li>
											</ul>
											<p className="card-text">{eachAd.description}</p>
											<p className="card-text">Phone: {typeof eachAd.phone_number !=='undefined'?eachAd.phone_number:''}</p>
										</div>
									</div>
								</div>
							</div>							
						)
					}
				}):
				<div><h4>None</h4></div>
			}	
 		</div>
	</div>
</section>

        </div>
    )
      
  }

export default AdsCategory;