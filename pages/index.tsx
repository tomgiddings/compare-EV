import type { NextPage } from 'next'
import Head from 'next/head'
import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';


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
                    no-underline"
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

                  <a href="https://github.com/tomgiddings/evee" className="flex basis-auto gap-x-3 items-center underline decoration-1 decoration-dashed underline-offset-2">
                  <figure>
                      <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="11.289mm" height="10.936mm">
                          <image x="0px" y="0px" width="32px" height="31px"  xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAACxiD++AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABLFBMVEUAAAAXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRYXFRb///8V8QNzAAAAYnRSTlMAFGOk0vMxqfsPm/7eQvEzEd/WrZ5cB+jBNDIoAq41GPxfZ+MS4mL24dvc8hbQXp3RBFmPDfWrGZeKP8L6qmUDOWge93PJAbB+OCE8PsS5EHpGFW8fw3VgeAi3ZOrrDNrsdCp+JIEAAAABYktHRGNcvi2qAAAAB3RJTUUH5QwWAy4eyZFPxQAAAYtJREFUKM9tkmdfwjAQxs8yyh4VygZFHCigTFERVLTiQBy4cID5/h/C5FL667oX3PV5/jlySQC0WBEcThchLqdDWAFruEUP0cIjuk221+cnhvD7vIblAWKJgK5JMERsIhRc+mFbnxJh7kei9ENaNVChVYn+RiMIxJgSB1lI0BGTSTpqQpAhztQY81O4JM1GyWSZkM2wAdIop2iVwypvPpc8yjmAwhpW62ZgHeW1AhSx2CiZgdImGkUQMW9Zz34LDREk7OS1Al78bwm2WdqxuT3YYc42YKOyHbCLFgf27IA9DvBUsfoVdWkVc80K1NCowj7mg7rZrx+gsQ8Nfn1NM9DkegNabV51Cnr7sMPVdgugS8jR8QkhvdN+aoDNz85zPfVddOn3xZD4L+UrvDuFAcq19m6GF0wY0ermlt3NHe9/rwEjvt8xIQ8wER6fBhx4XvpjdbYCPdQX3Q4nqr+r7XtaJuT17f3j0wCUp7rXMUNpogdmhjekfH0bgZ++Yjq538v5QualvJj//S71f3smo3eTXXLyAAAAAElFTkSuQmCC" />
                      </svg>
                  </figure>
                  View the code and contribute to Compare EV on GitHub!
                  </a>
                </article>
            </section>
      </main>
    </>
  )
}

export default Home
