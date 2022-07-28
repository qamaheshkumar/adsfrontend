import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button"; //Add this line Here

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
		let classifiedUrl = 'https://www.janathads.com/api/classified-list-bydistrict/' + disctrictId + '/'
		if (disctrictId === '0') {
			classifiedUrl = 'https://www.janathads.com/api/category-view/' + categoryId
		}
		await axios.get(classifiedUrl)
			.then((adsResponse) => {
				if (searchText.length == 1) {
					setSerachText('')
				}
				const filteredData = adsResponse.data.filter(item => {
					return Object.keys(item).some(key => {
						if (item[key] && item['category_id']['id'] == categoryId) {
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
		await axios.get('https://www.janathads.com/api/district-list/')
			.then((districtResponse) => {
				setAllDistrict(districtResponse.data)
			}
			)
	}

	const handleChange = (searchFieldText) => {
		setSerachText(searchFieldText)
		searchFieldText = searchFieldText.toLowerCase().trim()
		if (!searchFieldText) {
			setAllClassifieds(getDistValue(disctrictId))
		} else {
			const filteredData = allClassifieds.filter(item => {
				return Object.keys(item).some(key => {
					if (item[key]) {
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
		await axios.get('https://www.janathads.com/api/category-list/')
			.then((categoryResponse) => {
				setAllCategory(categoryResponse.data)
			})
		// const allCategory = await categoryResponse.data
		if (allCategory) {
			const selectedCategory = allCategory.map(item => {
				if (item.id == categoryId) {
					return item.category
				}
			}).filter(function (elm) {
				return elm !== undefined;
			})
			setAdsCategory(selectedCategory[0])
		}
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

	function openWhatsApp(classifiedId) {
		window.open('whatsapp://send?text= https://www.janathads.com/classified-view/' + classifiedId);
	}	

	const backToHomePage = (e) => {
		history('/')
	}

	return (
		<div>
			<section className="hero-area bg-1 text-center text-white overlay">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="content-block">
								<h1 className="">Advertisements Near You</h1>
								<div className="short-popular-category-list text-center">
									<h3 className="body-font text-uppercase font-size-sm mb-3">Ads Available In Locations</h3>
									<ul className="list-inline text-uppercase mt-3 locations">
										<li className="list-inline-item">
											<Link to="" onClick={() => getDistValue("0")} className="text-white px-3 py-1 text-decoration-none" > All</Link>
										</li>
										{allDistrict ?
											allDistrict.map((district, index) => {
												return (
													<li className="list-inline-item" key={index}>
														<Link to="" onClick={() => getDistValue(district.id)} className="text-white px-3 py-1 border-left text-decoration-none" > {district.district}</Link>
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
									<div className="row justify-content-center">
										<div className="col-md-8">
											<div className="rounded-pill bg-white d-flex align-items-center p-2">
												<input type="text" onChange={(e) => handleChange(e.target.value)} value={searchText} className="form-control bg-transparent border-0" id="ad_search" placeholder="Search for ads" />
												<button type="submit" onClick={clearSearchText} className="btn btn-danger btn-main  rounded-pill py-2 px-4  ">Clear</button>
											</div>
										</div>
									</div>
								</form>

							</div>


							<button type="submit" onClick={backToHomePage} className="btn rounded-pill text-white mt-3 btn-brand">Back to Home</button>

						</div>
					</div>
				</div>
			</section>
			<section className="popular-deals section bg-gray">
				<div className="container py-3">
				<ScrollUpButton />
					<div className="row all-products">
						{allClassifieds ?
							allClassifieds.map((eachAd, index) => {
								if (eachAd.is_hide) {
									return (
										<div className="col-sm-12 col-lg-4 mb-4 " key={index}>
											<div className="product-item rounded-4">
												<div className="card border-0 mb-0 rounded-lg shadow-pop border-primary">
													
														{eachAd.images ?
															// <Link target={"_blank"} to={"/classified-view/" + eachAd.id}>
															// 	<img className="card-img-top img-fluid" src={"https://www.janathads.com/media/" + eachAd.images} alt="adsimage" />
															// </Link>
															<img className="card-img-top img-fluid shadow-pop" src={"https://www.janathads.com/media/" + eachAd.images} alt="adsimage" />
															: ''
														}
													
													<div className="card-body rounded-lg shadow-pop pb-2">
														{/* <div className="card-pop">
															<p className="mb-0 small"><i className="fa fa-tag mr-2 text-info"></i>{eachAd.category_id.category}</p>
														</div> */}
														{eachAd.title !== '-' ?
															// <h4 className="card-title"><Link className="text-dark text-decoration-none" target={"_blank"} to={"/classified-view/" + eachAd.id}>{eachAd.title}</Link></h4>
															<h4 className="card-title text-dark text-decoration-none">{eachAd.title}</h4>
															: ''}
														{eachAd.description !== '-' ?	
															// <p className="card-text">{eachAd.description}</p>
															<p className="card-text" dangerouslySetInnerHTML={{ __html: eachAd.description !== '[object Object]' ? eachAd.description.replace('/\n/g', '<br />') : ''}}></p>
															: ''}
														<p className="small text-muted mb-0 row d-inline">
															<i className="fa fa-map-marker mr-0 mb-0 col-1"></i>{eachAd.district_id.district}  
															<i className="fa fa-key fa-fw mr-0 mb-0 col-1"></i>{eachAd.category_id.category}
															<i className="fa fa-calendar mr-0 mb-0 col-1"></i>{new Date(eachAd.updated_at).toISOString().slice(0, 10)}
														</p>
														{/* <p className="small text-muted mb-0"><i className="fa fa-calendar mr-2 px-md-5"></i>{new Date(eachAd.updated_at).toISOString().slice(0, 10)}</p> */}
													</div>
													<div className="card-footer d-flex justify-content-between bg-white rounded-lg shadow-pop pb-1 d-inline">

														<p className="card-text mb-0 fa fa-phone mr-0 align-item-center pt-2 ">{typeof eachAd.phone_number !== 'undefined' && eachAd.phone_number !=='' && eachAd.phone_number !== 'null' ? <a href={'tel:+91' + eachAd.phone_number } className="text-dark text-decoration-none"><i></i> {eachAd.phone_number}</a> : ''}</p>
														<i className="fa fa-whatsapp text-success fa_custom fa-2x" onClick={() => openWhatsApp(eachAd.id)} />
													</div>
												</div>
											</div>
										</div>
									)
									// return(<button type="submit" onClick={backToHomePage} className="btn rounded-pill text-white mt-3 btn-brand">Back to Home</button>)
								}
							})  :
							'none'
						}
					</div>
					<div className='d-flex justify-content-center'>
						{allClassifieds ? <button type="submit" onClick={backToHomePage} className="btn rounded-pill text-white mt-3 btn-brand">Back to Home</button> : ('No ads found for this category') }
					</div>
				</div>
			</section>

		</div>
	)

}

export default AdsCategory;