import React, { useState } from 'react'

const Gallery = ({place}) => {
    const [showPhotos, setShowPhotos] = useState(false);


    if(showPhotos){
        return (
            <div className='absolute inset-0 bg-white  min-h-screen'>
                <div className='p-8 grid gap-4'>

                    <div>
                        <h2 className='text-3xl'>Photos of: {place.title}</h2>
                        <button onClick={() => setShowPhotos(false)} className="fixed cursor-pointer rounded-2xl bg-white p-2 mx-2 my-6 w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                                <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>


                {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                    <div key={index}>
                        <img src={`http://localhost:4000/uploads/${photo}`} alt="" />
                    </div>
                ))}
                </div>
            </div>
        )
    }

  return (
    <div className='relative'>
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div>
                {place.photos?.[0] && (
                    <div>
                        <img onClick={() => setShowPhotos(!showPhotos)} className='aspect-square object-cover cursor-pointer' src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="alt" />
                    </div>
                )}
            </div>
            <div className='grid'>
                {place.photos?.[1] && (
                    <img onClick={() => setShowPhotos(!showPhotos)}  className='aspect-square object-cover cursor-pointer' src={`http://localhost:4000/uploads/${place.photos[1]}`} alt="alt" />
                )}
                <div className='overflow-hidden'>
                {place.photos?.[2] && (
                    <img onClick={() => setShowPhotos(!showPhotos)} className='aspect-square object-cover cursor-pointer relative top-2' src={`http://localhost:4000/uploads/${place.photos[2]}`} alt="alt" />
                )}
                </div>
            </div>
        </div>

        <button onClick={e => setShowPhotos(!showPhotos)}  
        className='flex gap-2 absolute bottom-2 right-2 bg-primary text-white rounded-2xl shadow-md shadow-gray-500 py-2 px-4'>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
        </svg>

            Show more photos
        </button>
    </div>
  )
}

export default Gallery