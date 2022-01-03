import * as I from '../../lib/Interface';
import Image, { ImageLoader } from 'next/image';
import NumberFormat from 'react-number-format';

interface ICompareTable {
    compare: Array<string>
    vehicles: Array<I.Vehicle>
}

const CompareTable: React.FC<ICompareTable> = ({ compare, vehicles }) => {

    const loader: ImageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const compareVehicles = vehicles.filter((dataVehicle => compare.includes(dataVehicle._id)));

    const dataToInclude: Array<I.Specification> = [
        { 
            key: 'pricing',
            subKey: 'OTR',
            displayName: 'Price',
            displayType: 'number',
            prefix: 'From £',
            tooltip: 'On the road price'
        },
        { 
            key: 'WLTP',
            displayName: 'WLTP',
            displayType: 'number',
            suffix: ' miles',
            tooltip: 'How far you can travel on a full charge in ideal conditions'
        }
    ];

    const generateDisplayType = (specification: I.Specification, vehicle: I.Vehicle) => {
        const { key, subKey, displayType }: I.Specification = specification;

        let value: string;
        const parent = vehicle[key] as string | keyof I.Vehicle;
        if (parent && subKey) {
            value = parent[subKey as keyof I.VehicleSubKey];
        } else {
            value = parent as string;
        }


        switch (displayType) {
            case 'number':
                return (<NumberFormat value={value} displayType={'text'} thousandSeparator={true} suffix={specification?.suffix} prefix={specification?.prefix} />);
            default:
                return value;
        }
    }
    return (
        <div className="overflow-hidden overflow-x-auto snap-x snap-mandatory mt-3">
            <table className="w-max md:w-content table-auto border-separate text-left shadow-lg">
                <thead className="tracking-wide">
                    <tr className="align-text-bottom">
                        <th className="w-24 md:w-64 min-w-full text-sm font-semibold bg-white z-40 sticky left-0 pr-1 pl-3 align-bottom text-gray-900"></th>
                        {compareVehicles.map(vehicle => (
                            <th key={vehicle._id} className="w-48 md:w-64 text-lg font-bold antialiased snap-always snap-start scroll-ml-24 md:scroll-ml-64 pl-3 pb-3">
                                {vehicle.images.length && 
                                    <figure className="h-24 md:h-60 relative mb-3"> 
                                    <Image
                                        loader={loader}
                                        src={vehicle.images[0] as string}
                                        alt={`${vehicle.make} ${vehicle.model} ${vehicle.version}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                    </figure>                            
                                }
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                    <div className="text-purple-800 text-sm">{vehicle.version}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="tracking-wide text-sm md:text-base">
                    {
                        dataToInclude.map(specification => {
                            const { displayName, key } = specification;
                            return (
                                <tr key={key} className="border relative">
                                    <td className="p-3 bg-gray-100 sticky left-0">
                                        {displayName}
                                    </td>
                                    { compareVehicles.map(vehicle => (
                                        <td key={[vehicle._id, key].join('-')} className="pl-3">
                                            { generateDisplayType(specification, vehicle) }
                                        </td>
                                    )) }
                                </tr>
                            )
                        })
                    }
                    <tr>
                    
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CompareTable;
