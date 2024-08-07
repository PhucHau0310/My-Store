import useProducts from '@/hooks/useProducts';
import { PieChart } from '@mui/x-charts/PieChart';

const PieCharts = ({
    topSellingProducts,
}: {
    topSellingProducts: {
        productId: string;
        quantity: number;
    }[];
}) => {
    const { products } = useProducts();

    // Create a mapping of product IDs to product names
    const productMap = new Map(
        products.map((product) => [product.id, product.name])
    );

    // Transform topSellingProducts to the format required by PieChart
    const pieChartData = topSellingProducts.map((product) => ({
        id: product.productId,
        value: product.quantity,
        label: productMap.get(product.productId) || 'Unknown Product',
    }));

    return (
        <div className="mt-10 w-2/3 bg-white border border-[#f1f1f1] rounded-xl py-4 px-14">
            <h1 className="text-black text-center text-lg font-bold mb-4">
                Top 5 Selling Products
            </h1>
            <PieChart
                series={[
                    {
                        data: pieChartData,
                        highlightScope: {
                            faded: 'global',
                            highlighted: 'item',
                        },
                        faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: 'gray',
                        },
                    },
                ]}
                width={700}
                height={250}
            />
        </div>
    );
};

export default PieCharts;
