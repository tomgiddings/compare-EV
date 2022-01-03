import type { NextPage } from 'next'
import Head from 'next/head'
import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

import Footer from '../components/Footer';
import Header from '../components/Header';

const Home: NextPage = () => {
  const logoColor = '#ffffff';

  const loader: ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>
      <Head>
        <title>CompareEV - The Electric Vehicle Comparison Site</title>
        <meta name="description" content="Helping you find your next Electric Vehicle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header logoColor={logoColor} />

      <main className="mt-3 p-5 z-10">
            <section className="mb-6 z-10">
                <article className="container mx-auto space-y-3 prose md:prose-l">
                  <figure className="h-60 relative mb-3"> 
                      <Image
                        loader={loader}
                        src={'https://evee.s3.eu-west-1.amazonaws.com/charger.jpg'}
                        alt={`EV connected to charger`}
                        layout="fill"
                        objectFit="cover"
                        className="object-fill rounded"
                        loading="lazy"
                      />
                  </figure>

                  <h1 className="tracking-wider">Welcome to CompareEV: <small className="text-purple-800">The Electric Vehicle Comparison site</small></h1>
                  <p>Finding an electric vehicle that&apos;s right for you can be a challenging task,
                  and it&apos;s sometimes hard to know where to start. CompareEV lets you select vehicles that interest you and easily compare them (with handy notes on what each feature means for you).</p>
                  <Link href="/compare">
                    <a className="text-white
                    w-full md:w-1/3
                    bg-gradient-to-r
                    from-purple-900
                    to-purple-700
                    hover:from-purple-900
                    hover:to-purple-800
                    focus:ring-4
                    focus:ring-blue-300
                    font-medium rounded-lg
                    text-l
                    px-3 py-3
                    text-center
                    flex
                    items-center
                    tracking-wide
                    no-underline
                    decoration-transparent"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Get Started</a>
                  </Link>
                </article>
                <article className="container mx-auto prose mt-7">
                  <h2>Open Source</h2>
                  <p>CompareEV is an Open Source project licensed under <a href="https://github.com/tomgiddings/compare-EV/blob/main/LICENSE">GNU General Public License v3.0</a> and contributions are always welcome, from coding new features and fixing bugs, to helping to maintain our data.</p>
                  <Footer />
                </article>
            </section>
      </main>
    </>
  )
}

export default Home
