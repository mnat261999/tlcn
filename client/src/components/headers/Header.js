import React from 'react';
import {Link} from 'react-router-dom'

function Header() {
    return (
      <header id="wn__header" className="header__area header__absolute sticky__header">	
        <div className="container-fluid">
  <div className="row">
    <div className="col-md-6 col-sm-6 col-6 col-lg-2">
      <div className="logo">
        <Link to="/">
          <img src="https://res.cloudinary.com/lucy2619288/image/upload/v1618116404/logo/logo_znsdkq.jpg" alt="logo images" />
        </Link>
      </div>
    </div>
    <div className="col-lg-8 d-none d-lg-block">
      <nav className="mainmenu__nav">
        <ul className="meninmenu d-flex justify-content-start">
          <li className="drop"><a href="#">Shop</a></li>
          <li className="drop"><a href="shop-grid.html">Books</a></li>
          <li className="drop"><a href="shop-grid.html">Kids</a></li>
          <li className="drop" style={{position: 'relative'}}><a href="#">Pages</a></li>
          <li className="drop" style={{position: 'relative'}}><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
    <div className="col-md-6 col-sm-6 col-6 col-lg-2">
      <ul className="header__sidebar__right d-flex justify-content-end align-items-center">
        <li className="shop_search"><a className="search__active" href="#" /></li>
        <li className="wishlist"><a href="#" /></li>
        <li className="shopcart"><a className="cartbox_active" href="#"><span className="product_qun">3</span></a>
          {/* Start Shopping Cart */}
          <div className="block-minicart minicart__active">
            <div className="minicart-content-wrapper">
              <div className="micart__close">
                <span>close</span>
              </div>
              <div className="items-total d-flex justify-content-between">
                <span>3 items</span>
                <span>Cart Subtotal</span>
              </div>
              <div className="total_amount text-right">
                <span>$66.00</span>
              </div>
              <div className="mini_action checkout">
                <a className="checkout__btn" href="cart.html">Go to Checkout</a>
              </div>
              <div className="single__items">
                <div className="miniproduct">
                  <div className="item01 d-flex">
                    <div className="thumb">
                      <a href="product-details.html"><img src="images/product/sm-img/1.jpg" alt="product images" /></a>
                    </div>
                    <div className="content">
                      <h6><a href="product-details.html">Voyage Yoga Bag</a></h6>
                      <span className="prize">$30.00</span>
                      <div className="product_prize d-flex justify-content-between">
                        <span className="qun">Qty: 01</span>
                        <ul className="d-flex justify-content-end">
                          <li><a href="#"><i className="zmdi zmdi-settings" /></a></li>
                          <li><a href="#"><i className="zmdi zmdi-delete" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="item01 d-flex mt--20">
                    <div className="thumb">
                      <a href="product-details.html"><img src="images/product/sm-img/3.jpg" alt="product images" /></a>
                    </div>
                    <div className="content">
                      <h6><a href="product-details.html">Impulse Duffle</a></h6>
                      <span className="prize">$40.00</span>
                      <div className="product_prize d-flex justify-content-between">
                        <span className="qun">Qty: 03</span>
                        <ul className="d-flex justify-content-end">
                          <li><a href="#"><i className="zmdi zmdi-settings" /></a></li>
                          <li><a href="#"><i className="zmdi zmdi-delete" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="item01 d-flex mt--20">
                    <div className="thumb">
                      <a href="product-details.html"><img src="images/product/sm-img/2.jpg" alt="product images" /></a>
                    </div>
                    <div className="content">
                      <h6><a href="product-details.html">Compete Track Tote</a></h6>
                      <span className="prize">$40.00</span>
                      <div className="product_prize d-flex justify-content-between">
                        <span className="qun">Qty: 03</span>
                        <ul className="d-flex justify-content-end">
                          <li><a href="#"><i className="zmdi zmdi-settings" /></a></li>
                          <li><a href="#"><i className="zmdi zmdi-delete" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mini_action cart">
                <a className="cart__btn" href="cart.html">View and edit cart</a>
              </div>
            </div>
          </div>
          {/* End Shopping Cart */}
        </li>
        <li className="setting__bar__icon"><a className="setting__active" href="#" />
          <div className="searchbar__content setting__block">
            <div className="content-inner">
              <div className="switcher-currency">
                <strong className="label switcher-label">
                  <span>My Account</span>
                </strong>
                <div className="switcher-options">
                  <div className="switcher-currency-trigger">
                    <div className="setting__menu">
                      <span><a href="#">My Account</a></span>
                      <span><a href="#">My Wishlist</a></span>
                      <span><a href="#">Sign In</a></span>
                      <span><a href="#">Create An Account</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  {/* Start Mobile Menu */}
  <div className="row d-none">
    <div className="col-lg-12 d-none">
      <nav className="mobilemenu__nav" style={{display: 'block'}}>
        <ul className="meninmenu">
          <li><a href="index.html">Home</a></li>
          <li><a href="#">Pages</a>
            <ul>
              <li><a href="about.html">About Page</a></li>
              <li><a href="portfolio.html">Portfolio</a>
                <ul>
                  <li><a href="portfolio.html">Portfolio</a></li>
                  <li><a href="portfolio-details.html">Portfolio Details</a></li>
                </ul>
              </li>
              <li><a href="my-account.html">My Account</a></li>
              <li><a href="cart.html">Cart Page</a></li>
              <li><a href="checkout.html">Checkout Page</a></li>
              <li><a href="wishlist.html">Wishlist Page</a></li>
              <li><a href="error404.html">404 Page</a></li>
              <li><a href="faq.html">Faq Page</a></li>
              <li><a href="team.html">Team Page</a></li>
            </ul>
          </li>
          <li><a href="shop-grid.html">Shop</a>
            <ul>
              <li><a href="shop-grid.html">Shop Grid</a></li>
              <li><a href="single-product.html">Single Product</a></li>
            </ul>
          </li>
          <li><a href="blog.html">Blog</a>
            <ul>
              <li><a href="blog.html">Blog Page</a></li>
              <li><a href="blog-details.html">Blog Details</a></li>
            </ul>
          </li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>
  {/* End Mobile Menu */}
  <div className="mobile-menu d-block d-lg-none">
  </div>
  {/* Mobile Menu */}	
</div>

      </header>

    );
}

export default Header;