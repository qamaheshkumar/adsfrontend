import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div>
          <footer className="footer section section-sm">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-7 offset-md-1 offset-lg-0">
                  <div className="block about">
                    <img src="images/logo-footer.png" alt=""/>
                    <p className="alt-color">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
                <div className="col-lg-4 offset-lg-1 col-md-3">
                  <div className="block">
                    <h4>Site Pages</h4>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/aboutus">About Us</Link></li>
                      <li><Link to="/contactus">Contact Us</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-7">
                  <div className="block-2 app-promotion">
                    <Link to="">
                      <img src={ "http://55mahesh.pythonanywhere.com/media/site_images/phone-icon.png"} alt="mobile-icon"/>
                    </Link>
                    <p>+91 9123456798</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <footer className="footer-bottom">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="copyright">
                      <p>Copyright © 2016. All Rights Reserved</p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <ul className="social-media-icons text-right">
                        <li><Link className="fa fa-facebook" to=""></Link></li>
                        <li><Link className="fa fa-twitter" to=""></Link></li>
                        <li><Link className="fa fa-whatsapp" to=""></Link></li>
                      </ul>
                  </div>
                </div>
              </div>
          </footer>

        </div>
    )
      
  }

export default Footer;