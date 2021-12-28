import React from 'react'
import udai from '../udai.jpg'
import shikhar from '../shikhar.jpg'
import shubham from '../shubham.jpg'
import somya from '../somya.jpeg'
function About() {
    return (
        <div class="flex flex-col items-center justify-center h-screen px-40 mt-7 mb-5 box-border">
            <div class="text-center">
                <p class="mt-10 text-sm leading-7 text-gray-500 font-regular uppercase">
                    MEET
                </p>
                <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Our  <span class="text-purple-600">Team</span>
                </h3>
            </div>
            <div className="flex flex-row flex-wrap justify-around">
                <figure class="relative max-w-xs cursor-pointer m-10">
                    <img class="rounded-lg shadow-xl hover:shadow-2xl" src={shubham} style={{height:'15rem',width:'30rem'}}/>
                    <figcaption class="absolute text-lg -mt-16 text-white px-4">
                        <div>
                            <h1>Shubham Khandelwal</h1>
                        </div>
                        <div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="relative max-w-xs cursor-pointer m-10">
                    <img class="rounded-lg shadow-xl hover:shadow-2xl" src={somya} style={{height:'15rem',width:'30rem'}}/>
                    <figcaption class="absolute text-lg -mt-16 text-white px-4">
                        <div>
                            <h1>Soumya Maheshwari</h1>
                        </div>
                        <div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="relative max-w-xs cursor-pointer m-10">
                    <img class="rounded-lg shadow-xl hover:shadow-2xl" src={udai} style={{height:'15rem',width:'30rem'}}/>
                    <figcaption class="absolute text-lg -mt-16 text-white px-4">
                        <div>
                            <h1>Udai Gupta</h1>
                        </div>
                        <div>
                        </div>
                    </figcaption>
                </figure>
                <figure class="relative max-w-xs cursor-pointer m-10">
                    <img class="rounded-lg shadow-xl hover:shadow-2xl" src={shikhar} style={{height:'15rem',width:'30rem'}}/>
                    <figcaption class="absolute text-lg -mt-16 text-white px-4">
                        <div>
                            <h1>Shikhar Sharma</h1>
                        </div>
                        <div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}

export default About
