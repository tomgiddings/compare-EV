import Image, { ImageLoader } from 'next/image';

import NumberFormat from 'react-number-format';

import * as I from '../../lib/Interface';


interface IVehicles {
    vehicleData: Array<I.Vehicle>
    loading: boolean
    setCompare: (value: Array<string>) => void
    compare: Array<string>
}

const Vehicles: React.FC<IVehicles> = ({ vehicleData, loading, setCompare, compare }) => {

    const handleCompare = (_id: string) => {
        if (compare.includes(_id)) {
          setCompare(compare.filter((vehicleId) => vehicleId !== _id));
        } else {
          setCompare([...compare, _id])
        }
    }

    const loader: ImageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <div className="grid grid-flow-row-dense md:grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-3 mb-6">
            {loading && 
              <div className="flex flex-col space-y-3 items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
                <div className="text-l text-purple-800">Loading</div>
              </div>
            }
            {!loading && (
              <>
                {vehicleData.map(vehicle => (
                  <article key={vehicle._id} className={(compare.includes(vehicle._id) ? 'ring-2 ring-purple-700 ' : '') + 'flex flex-col justify-between bg-white max-w-sm rounded-xl shadow-md'}>
                   {vehicle.images.length && 
                    <figure className="h-60 relative mb-3"> 
                      <Image
                        loader={loader}
                        src={vehicle.images[0] as string}
                        alt={`${vehicle.make} ${vehicle.model} ${vehicle.version}`}
                        layout="fill"
                        objectFit="cover"
                        className="object-fill rounded-t-xl"
                        loading="lazy"
                      />
                    </figure>
                    
                    }
                    <div className="content px-5 pb-5">
                      <h2 className="text-gray-800 font-medium py-3 font-sans">{vehicle.year} {vehicle.make} {vehicle.model} <small className="text-purple-800 pl-1">{vehicle.version}</small></h2>
                      <p className="text-gray-700">{vehicle.battery} KWh battery with a WLTP range of {vehicle.WLTP} miles.</p>
                    </div>
                   
                    <div className="flex justify-between items-center p-5 bg-gray-100 rounded-b-xl">
                        {vehicle?.pricing?.OTR && (<NumberFormat value={vehicle.pricing.OTR} displayType={'text'} thousandSeparator={true} prefix={'From £'} className="text-gray-700 text-l xl:text-xl font-medium" />)}
                        <button onClick={() => handleCompare(vehicle._id)}
                          className="text-white
                          bg-gradient-to-r
                          from-purple-900
                          to-purple-700
                          hover:from-purple-900
                          hover:to-purple-800
                          focus:ring-4
                          focus:ring-blue-300
                          font-medium rounded-lg
                          text-sm
                          px-3 py-2.5
                          text-center
                          flex
                          items-center
                          tracking-wide"
                        >
                          {compare.includes(vehicle._id)
                            ? <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                Remove
                              </>
                            : <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Add
                          </>

                          }
                        </button>
                    </div>
                  </article>
                ))}
              </>
            )}
          </div>

    );

}

export default Vehicles;
