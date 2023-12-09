'use client';
import React from 'react'

interface Props{
    error: Error;
    reset:() => void;
}

/* burada bilinmesi gereken şey bu her sayfa için özel oluşturulabilir
fakat biz böyle yapmak yerine daha global şekilde bunu halledebiliriz o da global-error*/
const ErrorPage = ({error, reset}:Props) => {

    console.log('error', error);

    return (
        <>
        <div>
            Unexpected Error!
        </div>
        <button onClick={() => reset}>Retry</button>
        </>
    )
}

export default ErrorPage
