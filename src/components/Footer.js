import { Link } from 'react-router-dom';
import logo from '../utilities/images/logo-footer.png';

function Footer() {
  return (
    <div>
      <footer className="footer section section-sm text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="block about">
                <img src={logo} alt="Logo" className="mb-3" />
                <p className="text-size-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block">
                <h4>Quick Links</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent border-0 py-2 px-0"><Link to="/" className="text-white">Home</Link></li>
                  <li className="list-group-item bg-transparent border-0 py-2 px-0"><Link to="/aboutus" className="text-white">About Us</Link></li>
                  <li className="list-group-item bg-transparent border-0 py-2 px-0"><Link to="/contactus" className="text-white">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-2 app-promotion">
                <h4>Contact</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent border-0 py-2 px-0"><i className="fa fa-map text-info mr-3"></i> Near bustand, Thenkpete, Maruthi Veethika, Udupi, Karnataka 576101</li>
                  <li className="list-group-item bg-transparent border-0 py-2 px-0"><i className="fa fa-phone text-info mr-3"></i> +91 9123456798</li>
                  <li className="list-group-item bg-transparent border-0 py-2 px-0"><i className="fa fa-envelope-o text-info mr-3"></i> janathads@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-bottom text-white py-3">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-12">
              <div className="copyright">
                <p className="mb-0 small text-uppercase">Copyright © 2022. All Rights Reserved</p>
              </div>
            </div>
            <div className="col-sm-6 col-12 text-right">
              <Link className="fa fa-facebook text-white px-3 text-decoration-none" to=""></Link>
              <Link className="fa fa-twitter text-white px-3 text-decoration-none" to=""></Link>
              <Link className="fa fa-whatsapp text-white px-3 text-decoration-none" to=""></Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )

}

export default Footer;