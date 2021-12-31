import type { NextPage } from 'next'
import Head from 'next/head'
import Image, { ImageLoader } from 'next/image';

import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from '../lib/RealmClient';

import { useState, useEffect } from 'react';

import axios from 'axios';
import NumberFormat from 'react-number-format';

interface IVehicle {
  _id: string
  year: number
  make: string
  model: string
  version: string
  battery: number
  WLTP: number
  realWorldRange: number
  chargingAC?: {
    method: string,
    powerRating: number
  }
  chargingDC?: {
    method: string,
    powerRating: number
  }
  pricing?: {
    OTR: number
  }
  images: Array<string>
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Array<IVehicle>>([]);
  const [compare, setCompare] = useState<Array<String>>([]);

  const logoColor = '#ffffff';

  const FIND_VEHICLES = `
  query {
    vehicles {
        _id
        battery
        make
        model
        version
        WLTP
        realWorldRange
        year
        pricing {
          OTR
        }
        images
    }
  }
  `;

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      try {
        const { data: response } = await axios.post(
          REALM_GRAPHQL_ENDPOINT,
          { query: FIND_VEHICLES },
          { headers: await generateAuthHeader() }
        )
        setVehicles(response.data.vehicles);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    fetchData();
  }, [setVehicles, FIND_VEHICLES]);

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
    <>
      <Head>
        <title>EVEE - The Electric Vehicle Comparison Site</title>
        <meta name="description" content="Helping you find your next Electric Vehicle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gradient-to-r from-purple-900 to-purple-500 border-gray-200 shadow-2xl mb-10 px-3 md:px-1">
        <nav className="container mx-auto text-white py-3 flex space-x-4 items-end">
          <div className="w-24 my-3 min-h-fit">
            <svg className="object-scale-down" version="1.1" id="electric_car" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
            y="0px" viewBox="0 0 621 326" enableBackground="new 0 0 621 326" xmlSpace="preserve">
              <g id="parts">
                
                  <path fill="none" stroke={logoColor} strokeWidth="16.5789" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M557.688,285.598l50.001-1.004c0,0,5.526-43.436-9.671-55.87c-29.891-13.652-96.613-22.273-96.613-22.273
                  s-40.147-49.191-98.188-50.95c0,0-107.595-10.609-244.784,29.844l-16.334,82.665l40.453,6.28"/>
                
                  <path fill="none" stroke={logoColor} strokeWidth="16.5789" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M534.466,277.079c0,19.075-15.464,34.539-34.539,34.539l0,0c-19.075,0-34.54-15.464-34.54-34.539l0,0
                  c0-19.075,15.465-34.539,34.54-34.539l0,0C519.002,242.54,534.466,258.004,534.466,277.079L534.466,277.079z"/>
                
                  <path fill="none" stroke={logoColor} strokeWidth="16.5789" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M277.111,277.961c0,19.074-15.464,34.539-34.539,34.539l0,0c-19.075,0-34.54-15.465-34.54-34.539l0,0
                  c0-19.075,15.464-34.54,34.54-34.54l0,0C261.647,243.421,277.111,258.886,277.111,277.961L277.111,277.961z"/>
                
                  <line fill="none" stroke={logoColor} strokeWidth="16.5789" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="443.282" y1="285.368" x2="303.743" y2="283.987"/>
                
                  <path fill="none" stroke={logoColor} strokeWidth="15.211" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                  M62.161,50.407c0,0,54.339,19.869,72.21-7.488c16.708-25.576-19.29-38.083-32.389-24.122c-20.672,22.033-9.072,48.568,1.33,57.779
                  c10.404,9.209,51.912,12.609,67.331-10.722c15.557-23.541-20.945-43.675-38.215-20.188c-13.209,17.964,0.71,51.149,12.434,58.717
                  c11.724,7.568,45.592,7.599,60.168-14.365c14.876-22.417-17.145-38.944-31.698-22.05c-23.634,27.434,14.729,52.402,10.256,70.486
                  C179,157,157,170,120,154c-44.766-19.358-80.033,19.935-60,60s69.665,23.704,92.46,0.218"/>
                <g>
                  
                    <path fill="none" stroke={logoColor} strokeWidth="15.211" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                    M31.573,29.086c0,0,29.723-2.794,30.395,20.724c0.69,24.178-16.579,22.796-30.395,24.178V29.086z"/>
                  
                    <line fill="none" stroke={logoColor} strokeWidth="15.211" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="30.191" y1="39.448" x2="11.54" y2="39.448"/>
                  
                    <line fill="none" stroke={logoColor} strokeWidth="15.211" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="30.191" y1="62.244" x2="11.54" y2="62.244"/>
                </g>
              </g>
            </svg>
          </div>

          <div>
            <h1 className="font-semibold">EVEE <small className="text-lg hidden md:inline">The Electric Vehicle Comparison Site</small></h1>
          </div>
        </nav>
      </header>
      <section className="my-6 p-3 z-10">
        <div className="container mx-auto space-y-3 content">
          <p><strong>Welcome to EVEE: The Electric Vehicle Comparison site.</strong> Finding an electric vehicle thatt&apos;s right for you can be a challenging task,
          and it&apos;s sometimes hard to know where to start. EVEE lets you select vehicles that interest you and easily compare them (with handy notes on what each feature means for you).</p>
          <p>Get started by selecting from the options below...</p>
        </div>
      </section>

      <main className="mt-6 p-3 z-10">
        <section className="container mx-auto">
          <div className="grid grid-flow-row-dense md:grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-3 mb-6">
            {loading && <div>Loading</div>}
            {!loading && (
              <>
                {vehicles.map(vehicle => (
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
                        {vehicle?.pricing?.OTR && (<NumberFormat value={vehicle.pricing.OTR} displayType={'text'} thousandSeparator={true} prefix={'From £'} className="text-gray-700 text-xl font-medium" />)}
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
                                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                </svg>
                                Remove
                              </>
                            : <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
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
        </section>
      </main>

      {compare.length > 1 &&
        <section className="sticky bottom-0 z-50 bg-gradient-to-r from-purple-900 to-purple-500 border-gray-200 shadow-2xl px-4 md:px-3 py-2 w-full">
          <nav className="container mx-auto flex flex-row space-x-3 items-center justify-between">
            <NumberFormat value={compare.length} displayType={'text'} suffix={' vehicles selected'} className="text-white font-semibold pr-3" />
            <button className="
              text-white
              ring-2
              ring-offset-current
              ring-purple-700
              hover:ring-purple-900
              focus:ring-4
              focus:ring-purple-300
              font-medium rounded-lg
              px-3 py-2.5
              text-center
              flex
              items-center
              tracking-wider
            ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              See Comparison
            </button>
          </nav>
        </section>
      }

      <footer className="footer mt-10 mb-5 p-3 md:p-0 z-10">
        <div className="container mx-auto">
            <a href="https://github.com/tomgiddings/evee" className="flex items-center underline decoration-1 decoration-dashed underline-offset-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="11.289mm" height="10.936mm">
                <image x="0px" y="0px" width="32px" height="31px"  xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAACxiD++AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABLFBMVEUAAAAXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRb///8V8QNzAAAAYnRSTlMAFGOk0vMxqfsPm/7eQvEzEd/WrZ5cB+jBNDIoAq41GPxfZ+MS4mL24dvc8hbQXp3RBFmPDfWrGZeKP8L6qmUDOWge93PJAbB+OCE8PsS5EHpGFW8fw3VgeAi3ZOrrDNrsdCp+JIEAAAABYktHRGNcvi2qAAAAB3RJTUUH5QwWAy4eyZFPxQAAAYtJREFUKM9tkmdfwjAQxs8yyh4VygZFHCigTFERVLTiQBy4cID5/h/C5FL667oX3PV5/jlySQC0WBEcThchLqdDWAFruEUP0cIjuk221+cnhvD7vIblAWKJgK5JMERsIhRc+mFbnxJh7kei9ENaNVChVYn+RiMIxJgSB1lI0BGTSTpqQpAhztQY81O4JM1GyWSZkM2wAdIop2iVwypvPpc8yjmAwhpW62ZgHeW1AhSx2CiZgdImGkUQMW9Zz34LDREk7OS1Al78bwm2WdqxuT3YYc42YKOyHbCLFgf27IA9DvBUsfoVdWkVc80K1NCowj7mg7rZrx+gsQ8Nfn1NM9DkegNabV51Cnr7sMPVdgugS8jR8QkhvdN+aoDNz85zPfVddOn3xZD4L+UrvDuFAcq19m6GF0wY0ermlt3NHe9/rwEjvt8xIQ8wER6fBhx4XvpjdbYCPdQX3Q4nqr+r7XtaJuT17f3j0wCUp7rXMUNpogdmhjekfH0bgZ++Yjq538v5QualvJj//S71f3smo3eTXXLyAAAAAElFTkSuQmCC" />
              </svg>
              View the code for this site on GitHub
            </a>
          </div>
      </footer>
    </>
  )
}

export default Home
