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

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Array<I.Vehicle>>([]);
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
  
  return (
    <>
      <Head>
        <title>CompareEV - The Electric Vehicle Comparison Site</title>
        <meta name="description" content="Helping you find your next Electric Vehicle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header logoColor={logoColor} />
      
      <section className="my-6 p-3 z-10">
        <div className="container mx-auto space-y-3 content">
          <p><strong>Welcome to CompareEV: The Electric Vehicle Comparison site.</strong> Finding an electric vehicle thatt&apos;s right for you can be a challenging task,
          and it&apos;s sometimes hard to know where to start. CompareEV lets you select vehicles that interest you and easily compare them (with handy notes on what each feature means for you).</p>
          <p>Get started by selecting from the options below...</p>
        </div>
      </section>

      <main className="mt-6 p-3 z-10">
        <section className="container mx-auto">
          <Vehicles vehicleData={vehicles} loading={loading} compare={compare} setCompare={setCompare} />              
        </section>

        <section className="container mx-auto" id="comparison">
          <h2>Your Comparison</h2>
          <CompareTable compare={compare} vehicles={vehicles} />
        </section>
      </main>

      <CompareBar compare={compare} />

      <Footer />
    </>
  )
}

export default Home
