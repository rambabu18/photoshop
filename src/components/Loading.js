import React from 'react'
import loading from "../assets/images/lottie/loading.gif"

function Loading() {
    return (
        <div className='container-fluid' >
            <div className='row' >
                <div className='col loading_page' >
                    {/* <Lottie options={defaultOptions} height={400} width={400}  /> */}
                    <img className='loading_img' src={loading} alt='' />
                    {/* <h3 className='mb-2 success_text'> Please wait ! </h3> */}
                    {/* <p className='mb-5'> Content is loading..! </p> */}
                </div>
            </div>
        </div>
    )
}

export default Loading