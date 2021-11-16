import React from 'react'
import transparentImage from 'public/markus-spiske-JO_CBLe4qA4-unsplash.jpg'
import diverseImage from 'public/clay-banks-LjqARJaJotc-unsplash.jpg'
import accountableImage from 'public/christina-wocintechchat-com-c6wbSBaYxkY-unsplash.jpg'

import Image from 'next/image';

const visions = [
  {
    name: 'Tranparent',
    description:
      'Traditional reviews are usualy not available publicly. Here, you can make your opinions open for everyone.',
    image: transparentImage,
  },
  {
    name: 'Diverse',
    description:
      'Acadmia lacks diversity. We want to amplify voices of members of underrepresented communities and identities in academic spaces.',
    image: diverseImage,
  },
  {
    name: 'Accountable',
    description:
      'Poor writing hinders translation of findings. Together, we can look out for each other to be better writers.',
    image: accountableImage,
  },
]

export const Visions = () => {
  return (
    <div className="flex flex-col justify-evenly">
      <h1 className="text-2xl self-center m-6">
        Together, we can make science more:
      </h1>
      <div className="flex flex-row mx-20">
        {visions.map((vision) => (
          <div key={vision.name}
            className="flex-1 mx-6"
          >
            <h2 className="text-xl">
              {vision.name}
            </h2>
            <div className="text-gray-600">
              {vision.description}
            </div>
            <div className="text-center">
              <Image
                src={vision.image}
                alt={vision.name}
                layout="responsive"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
