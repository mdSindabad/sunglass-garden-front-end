import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import Slider from "react-slick";
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // local state
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsloading] = useState(true);


    useEffect(() => {
        axios.get('https://whispering-gorge-61124.herokuapp.com/reviews')
            .then(res => {
                setIsloading(false);
                setReviews(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Container>
            <h2> Our Reviews </h2>
            {
                isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box> :
                    <Slider {...settings}>
                        {
                            reviews.map(review => (
                                <ReviewCard review={review} />
                            ))

                        }
                    </Slider>
            }
        </Container>
    );
}
export default ReviewSlider;