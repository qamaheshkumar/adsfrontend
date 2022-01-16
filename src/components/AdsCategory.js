import {useEffect, useState} from 'react'
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function AdsCategory() {
	const { categoryId } = useParams();
	const [allClassifieds, setAllClassifieds] = useState('');
	const [disctrictId, setDisctrictId] = useState('0');
	const [allDistrict, setAllDistrict] = useState('');
	const [searchText, setSerachText] = useState('');
	const [allCategory, setAllCategory] = useState('');
	const [adsCategory, setAdsCategory] = useState('');
	const [clearAllSearchText, setClearAllSearchText] = useState(false);
	const history = useNavigate();

    const axiosClassifiedResponse = async (disctrictId) => {
		setDisctrictId(disctrictId)
		let classifiedUrl = 'http://55mahesh.pythonanywhere.com/api/classified-list-bydistrict/'+disctrictId+'/'
		if(disctrictId === '0'){
			classifiedUrl = 'http://55mahesh.pythonanywhere.com/api/category-view/'+categoryId
		}
		await axios.get(classifiedUrl)
			.then((adsResponse) => {
				if(searchText.length == 1){
					setSerachText('')
				}			
				const filteredData = adsResponse.data.filter(item =>{
					return Object.keys(item).some(key => {
						if(item[key] && item['category_id']['id']==categoryId){
							return item[key].toString().toLowerCase().includes(searchText)
						}
					})
				})				
				setAllClassifieds(filteredData)
				setClearAllSearchText(false)
			}
		)
	}
    const axiosDistrictResponse = async () => {
		await axios.get('http://55mahesh.pythonanywhere.com/api/district-list/')
			.then((districtResponse) => {
				setAllDistrict(districtResponse.data)
			}
		)
    }	



	const handleChange = (searchFieldText) => {
		setSerachText(searchFieldText)
		searchFieldText = searchFieldText.toLowerCase().trim()
		if(!searchFieldText){
			setAllClassifieds(getDistValue(disctrictId))
		} else{
			const filteredData = allClassifieds.filter(item =>{
				return Object.keys(item).some(key => {
					if(item[key]){
						return item[key].toString().toLowerCase().includes(searchFieldText)
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
		axiosClassifiedResponse(disctrictId)
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
		setAdsCategory(selectedCategory[0])
    }	

	useEffect(() => {
		axiosDistrictResponse()
		axiosCategoryResponse()
		axiosClassifiedResponse(disctrictId)
	}, [clearAllSearchText])

	const getDistValue = (disctrictId) => {
		setDisctrictId(disctrictId)
		axiosClassifiedResponse(disctrictId)
	}	

    return (
        <div>
			<section className="hero-area bg-1 text-center overly">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="content-block">
								<h1>Advertisements for {adsCategory}</h1>
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
							</div>
							<div className="advance-search">
								<form action="#">
									<div className="row">
										<div className="col-lg-12 col-md-8">
											<div className="block d-flex">
												<input type="text" onChange={(e)=> handleChange(e.target.value)} value={searchText} className="form-control mb-2 mr-sm-2 mb-sm-0" id="ad_search" placeholder="Search for ads"/>
												<button type="submit" onClick={clearSearchText} className="btn btn-main">Clear</button>
											</div>
										</div>
									</div>
								</form>
								
							</div>
							
						</div>
					</div>
				</div>
			</section>
			<section className="popular-deals section bg-gray">
				<div className="container">
					<div className="row">
						{allClassifieds?
							allClassifieds.map((eachAd, index) =>  {
								if(eachAd.is_hide){
									return(
										<div className="col-sm-12 col-lg-4" key={index}>
											<div className="product-item bg-light">
												<div className="card">
													<div className="thumb-content">
														{eachAd.images?
														<Link to={"/classified-view/"+eachAd.id}>
															<img className="card-img-top img-fluid" src={ "http://127.0.0.1:8000"+eachAd.images} alt="image description"/>
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
														<p className="card-text">Phone: {eachAd.phone_number}</p>
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