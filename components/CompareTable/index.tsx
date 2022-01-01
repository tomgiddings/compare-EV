import * as I from '../../lib/Interface';
import Image, { ImageLoader } from 'next/image';
import NumberFormat from 'react-number-format';

interface ICompareTable {
    compare: Array<String>
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
        <div className="w-full">
            <table className="table-fixed border-collapse w-full text-left shadow-lg">
                <thead className="tracking-wide">
                    <tr className="align-text-bottom">
                        <th className="text-sm font-semibold px-2">Specification</th>
                        {compareVehicles.map(vehicle => (
                            <th key={vehicle._id} className="text-lg font-bold antialiased px-3">
                                {vehicle.images.length && 
                                    <figure className="h-60 relative mb-3"> 
                                    <Image
                                        loader={loader}
                                        src={vehicle.images[0] as string}
                                        alt={`${vehicle.make} ${vehicle.model} ${vehicle.version}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="object-fill rounded-l"
                                        loading="lazy"
                                    />
                                    </figure>                            
                                }
                                    {vehicle.year} {vehicle.make} {vehicle.model}<small className="text-purple-800 pl-2">{vehicle.version}</small>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="tracking-wide">
                    {
                        dataToInclude.map(specification => {
                            const { displayName, key } = specification;
                            return (
                                <tr key={key} className="border">
                                    <td className="p-3 bg-gray-100">
                                        {displayName}
                                    </td>

                                    { compareVehicles.map(vehicle => (
                                        <td key={[vehicle._id, key].join('-')} className="px-3">
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
