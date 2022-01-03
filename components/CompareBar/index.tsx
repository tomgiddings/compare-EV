import NumberFormat from 'react-number-format';

interface ICompareBar {
    compare: Array<string>
    showComparison: boolean
    setShowComparison: (value: boolean) => void
}

const CompareBar: React.FC<ICompareBar> = ({ compare, showComparison, setShowComparison }) => {

    if (compare.length > 1) {
        return (
            <section className="sticky bottom-0 z-50 bg-gradient-to-r from-purple-900 to-purple-600 border-gray-200 shadow-2xl px-5 md:px-3 pb-4 pt-3 md:py-3 w-full">
                <nav className="container mx-auto flex flex-row space-x-3 items-center justify-between">
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <NumberFormat value={compare.length} displayType={'text'} suffix={' vehicles selected'} className="text-white font-medium tracking-wide text-xs md:text-base pr-3" />
                </span>
                <button onClick={() => setShowComparison(!showComparison)} className="
                    text-white
                    ring-2
                    ring-offset-current
                    ring-purple-700
                    hover:ring-purple-900
                    focus:ring-4
                    focus:ring-purple-500
                    font-medium rounded-lg
                    px-3 py-2.5
                    text-center
                    flex
                    items-center
                    tracking-wider
                    text-sm
                    md:text-base
                ">
                    {showComparison &&
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Change selection
                        </>
                    }
                    {!showComparison &&
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            See comparison
                        </>
                    }
                </button>
                </nav>
            </section>
        );
    }
    return null;
}

export default CompareBar;
