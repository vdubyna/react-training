import { useState, useEffect } from 'react';

const EstimateDeliveryTimer = function ({ deliveryTime }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deliveryTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(deliveryTime));
        }, 60000); // update every minute

        return () => {
            clearInterval(timer); // clear interval on component unmount
        }
    }, [deliveryTime]);

    return <>Only {timeLeft} minutes left 😍</>;
}

const calculateTimeLeft = function (deliveryTime) {
    const delivery = new Date(deliveryTime);
    const now = new Date();

    const diffInMs = Math.max((delivery.getTime() - now.getTime()), 0);
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);

    return diffInMinutes;
}

export default EstimateDeliveryTimer;