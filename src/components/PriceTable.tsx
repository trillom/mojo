interface IPriceTableProps {
    symbol: string;
    quotes: number[][];
}

function PriceTable(props: IPriceTableProps) {
    const { symbol, quotes } = props;

    return (
        <span>
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>{symbol}</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th/>
                        <th>Time</th>
                        <th>Bid</th>
                        <th>Ask</th>
                    </tr>
                </thead>
                <tbody>
                    { quotes && quotes.map((quote, index) => {
                        return (
                            <tr key={'priceRow-' + index}>
                                <td>{index + 1}</td>
                                <td>{(new Date(quote[0]).toISOString())}</td>
                                <td>{quote[1]}</td>
                                <td>{quote[2]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </span>
    )
}

export default PriceTable;