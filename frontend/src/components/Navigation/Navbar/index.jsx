import './style.scss'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <header>

            <nav className='main-top-navigation'>
                <div className="logo-wrapper">
                    <a href='#'>AliExpress</a>
                </div>

                <div className="catalog-wrapper nav-box">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width='25' height='25' className="RedHeaderNavigationItem_RedHeaderNavigationItem__icon__lqhjb"><path d="M21.739 3.352v15.065h-6.027a3.013 3.013 0 0 1-3.013-3.013V6.365a3.013 3.013 0 0 1 3.014-3.013h6.026Zm-13.057 0H2.656v15.065h6.026a3.013 3.013 0 0 0 3.013-3.013V6.365a3.013 3.013 0 0 0-3.013-3.013Zm.484 15.065a3.014 3.014 0 0 0 6.026 0H9.166Z" fill="white" data-spm-anchor-id="a2g2w.home.category.i0.75df5586jikm3E"></path></svg>
                    Catalog
                </div>

                <div className="searchbar-wrapper">
                    <input type="text" placeholder='Pico 4' />
                    <button className='find'>Find</button>
                </div>

                <div className="orders-wrapper nav-box">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width='25' height='25' className="RedHeaderNavigationItem_RedHeaderNavigationItem__icon__lqhjb"><path d="M3.998 5.5 2 7.5v7h7V7.293L10.791 5.5H3.998Zm9.795-3H7l-2.002 2h6.793l2.002-2ZM10 7.707V14.5h6.793L19 12.287V5.5h-6.795L10 7.707ZM15.207 2.5l-2.002 2h6.801v6.787L22 9.293V2.5h-6.793ZM2 22.5h7v-7H2v7Zm18.006-3.006L22 17.5v-6.793l-1.994 1.994v6.793ZM10 15.5v7h7l2-2.006v-6.793L17.207 15.5H10Z" fill="white" data-spm-anchor-id="a2g2w.home.orders.i0.75df5586jikm3E"></path></svg>
                    Orders
                </div>

                <div className="cart-wrapper nav-box">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width='25' height='25' className="RedHeaderNavigationItem_RedHeaderNavigationItem__icon__lqhjb"><path d="m8.785 14.947-.882-.164 2.658-10.032h12.81l-2.666 9.95-.867-.233-11.053.479Z" fill="currentColor"></path><path d="M18.448 16.828H7.658a2.244 2.244 0 0 1-2.166-2.826L8.51 2.785a2.242 2.242 0 1 1 4.332 1.165l-2.26 8.391h7.865a2.243 2.243 0 1 1 0 4.487Z" fill="currentColor"></path><path d="M2.292 10.056a2.245 2.245 0 0 1-.542-4.11L9.536 1.41a2.243 2.243 0 1 1 2.243 3.885L3.993 9.832a2.24 2.24 0 0 1-1.7.224ZM8.523 23.109a2.692 2.692 0 1 0 0-5.383 2.692 2.692 0 0 0 0 5.383ZM15.25 23.109a2.692 2.692 0 1 0 0-5.384 2.692 2.692 0 0 0 0 5.384Z" fill="white"></path></svg>
                    Cart
                </div>

                <Link to='/login'>
                    <div className="auth-wrapper nav-box">
                        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width='25' height='25' className="RedHeaderProfileItem_RedHeaderProfileItem__icon__1ruq2"><path d="M4.74 7.232c-2.287 3.991-4.426 8.702-.777 12.67 1.639 1.782 4.287 2.969 7.029 3.071 6.843.256 11.434-4.79 11.89-9.985.221-2.528.224-5.286-1.555-7.477-1.248-1.537-3.137-2.074-5.059-2.819-2.345-.91-8.14-1.195-9.902.86-1.648 1.924-4.832 4.844-3.577 7.419m5.68-2.754.14.273m0 0c.11.217.216.415.317.59m-.318-.59c.54-1.241 1.892-2.583 2.213-1.575.056.176.088.387.098.61m-2.31.965c-.275.631-.338 1.237.053 1.493m.264-.904c.58 1.001 1.032 1.24 1.744-.152.184-.36.27-.91.249-1.401M8.926 9.079c.26-.762.723-1.621 1.913-1.572a.208.208 0 0 1 .08.019M8.926 9.079c-.078.23-.138.452-.193.636a5.118 5.118 0 0 0-.07.268m2.256-2.457c.541.25.04 2.879-1.941 2.57a.789.789 0 0 1-.316-.113m0 0c-.138.583-.31 1.67.485.837m6.835-4.251-.03.14m0 0c-.074.356-.129.626-.168.825m.168-.826c.031-.028.064-.055.097-.08.768-.594.518 2.989.472 3.163-.41 1.532-2.096 1.992-1.685.03.182-.872.183-1.772.674-2.564.05-.08.092-.138.127-.176m.315-.373c-.12.11-.225.235-.315.373m.147.453c-.163.837-.05.425 0 0Zm0 0c.038-.322.038-.653-.147-.453m0 0c-.542.833-.565 2.116-.565 2.915m-9.423 2.951c.774 2.516 3.792 7.465 7.308 6.175 1.002-.367 5.542-5.249 4.355-5.848" stroke="#FFB800" strokeLinecap="round" strokeWidth="1.825"></path></svg>
                        Sign in
                    </div>
                </Link>
            </nav>
            <div className="nav-bottom">
                <div className="flash-deals active">Flash deals 🔥</div>
                <div className="currency active">UZS</div>
                <div className="lang">EN</div>
                <div className="location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>_  Samarkand</div>
            </div>

        </header>
    );
}

export default Navbar;