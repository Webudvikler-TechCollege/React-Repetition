import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';
import { doFetch } from '../../Helpers/Fetching';
import Style from './RatingSystem.module.scss';

const RatingSystem = () => {
    const [stars, setStars] = useState([]);
    const [hasRated, setHasRated] = useState(false);
    const {loginData, selectedProduct } = useContext(AppContext);

    let dataArray = [
        { value: 1, selected: false },
        { value: 2, selected: false },
        { value: 3, selected: false },
        { value: 4, selected: false },
        { value: 5, selected: false }
    ];

    const getData = async () => {
        const url = `https://api.mediehuset.net/stringsonline/products/${selectedProduct.id}`;
        const key = loginData.access_token;
        const response = await doFetch(url, 'GET', null, key);

        setTimeout(() => {
            for (let i = 0; i <= response.rating - 1; i++) {
                dataArray[i].selected = true;
            }
            setStars(dataArray);
        }, [])
    }

    const handleMouseOver = (placement) => {
        if(!hasRated) {
            if(loginData.user_id) {
                for (let i = 0; i <= placement - 1; i++) {
                    dataArray[i].selected = true;
                }
        
                setStars(dataArray);
            }
        }
    }

    const handleMouseLeave = () => {
            if(!hasRated) {
                if(loginData.user_id) {
                    getData();
                }
            }
    }

    const crateRating = async (val) => {
        const url = `https://api.mediehuset.net/stringsonline/ratings`;
        const key = loginData.access_token;
        let formData = new FormData();
            formData.append('product_id', selectedProduct.id);
            formData.append('num_stars', val);
        const response = await doFetch(url, 'POST', formData, key);
        return response;
    }

    const handleClick = (placement) => {
        if(!hasRated) {
            if(loginData.user_id) {
                crateRating(placement);
                setHasRated(true);
                getData();
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={Style.ratingSystem}>
            <span id="starSpan" onMouseLeave={handleMouseLeave} >
                {stars.map((item) => {
                    return (
                        <svg className={Style.starIcon} key={item.value} viewBox="0 0 117.34 111.59">
                            <polygon 
                                className={item.selected ? `${Style.starIcon_star} ${Style.selected}` : Style.starIcon_star} 
                                data-placement={item.value} 
                                onMouseOver={(e) => { handleMouseOver(e.target.getAttribute('data-placement')) }} 
                                onClick={(e) => { handleClick(e.target.getAttribute('data-placement')) }} 
                                points="58.67 91.97 23.07 110.68 29.87 71.04 1.07 42.97 40.87 37.19 58.67 1.13 76.47 37.19 116.26 42.97 87.47 71.04 94.26 110.68 58.67 91.97"
                            />
                        </svg>
                    )
                })}
            </span>
        </div>
    )
}

export { RatingSystem };