function Product(props) {
    return (
        <div className="product">
            <img src={props.image} alt={props.image} width={"100%"} height="192" />
            <div className="price">
                <span className='discount'>
                    <del className='actual-price'>
                        {props.price ? props.price : "169.000"}
                    </del>
                    -<span>50</span>%
                </span>
                <p>
                    {props.price ? props.price/2 : "84.999"}
                </p>
            </div>
            <div className="row">
                <div className="stars">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#ff6c02" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <span className="count">5.0</span>
                </div>
                <div className="sold-title">6 sold</div>
            </div>
            <p className='name'>
                {props.name ? props.name : "Best Grade AAA"}
            </p>
            <p className='description'>
                {props.description ? props.description.slice(0, 25) + " ..." : "Lorem ipsum dolor sit amet."}
            </p>
        </div>
    );
}

export default Product;