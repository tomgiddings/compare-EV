import type { NextPage } from 'next'
import Head from 'next/head'

import { useState, useEffect } from 'react';
import axios from 'axios';

import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from '../lib/RealmClient';
import * as I from '../lib/Interface';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Vehicles from '../components/Vehicles';
import CompareBar from '../components/CompareBar';
import CompareTable from '../components/CompareTable';

const Compare: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Array<I.Vehicle>>([]);
  const [compare, setCompare] = useState<Array<string>>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false)

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
        chargingAC {
          method
          powerRating
        }
        chargingDC {
          method
          powerRating
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

  return (
    <>
      <Head>
        <title>CompareEV - Compare Vehicles</title>
        <meta name="description" content="Helping you find your next Electric Vehicle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header logoColor={logoColor} />

      <main className="mt-3 p-5 z-10">
        {!showComparison && 
          <>
            <section className="mb-6 z-10">
            <div className="container mx-auto space-y-3 content">
              <h1 className="text-2xl md:text-4xl">Pick &amp; Mix:&nbsp;<small className="text-purple-800">Add the vehicles that you would like to compare</small></h1>
            </div>
            </section>
            <section className="container mx-auto">
              <Vehicles vehicleData={vehicles} loading={loading} compare={compare} setCompare={setCompare} />              
            </section>
          </>
        }

        {showComparison && compare.length > 1 && 
          <section className="container mx-auto" id="comparison">
            <h1 className="text-2xl md:text-4xl">Your comparison</h1>
            <CompareTable compare={compare} vehicles={vehicles} />
          </section>
        }
      </main>

      <CompareBar compare={compare} showComparison={showComparison} setShowComparison={setShowComparison} />

      <Footer />
    </>
  )
}

export default Compare
