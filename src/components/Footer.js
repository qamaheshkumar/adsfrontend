import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div>
{/*============================
=            Footer            =
=============================*/}

<footer className="footer section section-sm">
  {/* Container Start */}
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-7 offset-md-1 offset-lg-0">
        {/* About */}
        <div className="block about">
          {/* footer logo */}
          <img src="images/logo-footer.png" alt=""/>
          {/* description */}
          <p className="alt-color">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
      {/* Link list */}
      <div className="col-lg-4 offset-lg-1 col-md-3">
        <div className="block">
          <h4>Site Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            {/* <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li> */}
          </ul>
        </div>
      </div>
      {/* Link list */}
      {/* <div className="col-lg-2 col-md-3 offset-md-1 offset-lg-0">
        <div className="block">
          <h4>Admin Pages</h4>
          <ul>
            <li><a href="#">Boston</a></li>
            <li><a href="#">How It works</a></li>
            <li><a href="#">Deals and Coupons</a></li>
            <li><a href="#">Articls and Tips</a></li>
            <li><a href="#">Terms of Services</a></li>
          </ul>
        </div>
      </div> */}
      {/* Promotion */}
      <div className="col-lg-4 col-md-7">
        {/* App promotion */}
        <div className="block-2 app-promotion">
          <Link to="">
            {/* Icon */}
            {/* <img src="images/footer/phone-icon.png" alt="mobile-icon"/> */}
            <img src={ "http://127.0.0.1:8000/media/site_images/phone-icon.png"} alt="mobile-icon"/>
          </Link>
          <p>+91 9123456798</p>
        </div>
      </div>
    </div>
  </div>
  {/* Container End */}
</footer>
{/* Footer Bottom */}
<footer className="footer-bottom">
    {/* Container Start */}
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-12">
          {/* Copyright */}
          <div className="copyright">
            <p>Copyright © 2016. All Rights Reserved</p>
          </div>
        </div>
        <div className="col-sm-6 col-12">
          {/* Social Icons */}
          <ul className="social-media-icons text-right">
              <li><Link className="fa fa-facebook" to=""></Link></li>
              <li><Link className="fa fa-twitter" to=""></Link></li>
              <li><Link className="fa fa-pinterest-p" to=""></Link></li>
              <li><Link className="fa fa-vimeo" to=""></Link></li>
            </ul>
        </div>
      </div>
    </div>
    {/* Container End */}
    {/* To Top */}
    {/* <div className="top-to">
      <a id="top" className="" href=""><i className="fa fa-angle-up"></i></a>
    </div> */}
</footer>

        </div>
    )
      
  }

export default Footer;