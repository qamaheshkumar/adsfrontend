
import banner from '../utilities/images/home/hero.jpg';

function AboutUs() {

    return (
        <>
            <section className="hero-area bg-1 text-center text-white overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content-block">
                                <h1 className="display-4 mb-3">About Us</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="container bg-white mt-n5 z-index-1 position-relative rounded shadow p-4 mb-4">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="linetitle">Who We Are</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>
                        <div className="col-md-4">
                            <img src={banner} alt="My Ads" className="rounded-xl my-4 shadow-lg img-fluid" /></div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default AboutUs;