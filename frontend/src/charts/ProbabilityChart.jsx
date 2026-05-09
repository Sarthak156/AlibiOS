import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

export default function ProbabilityChart({ results }) {

    const data = results.map((item, index) => ({
        name: `Excuse ${index + 1}`,
        probability: parseInt(item.success_probability)
    }));

    return (
        <div className="bg-gray-900 p-4 rounded-2xl">

            <h2 className="text-xl mb-4">
                Success Probability
            </h2>

            <BarChart
                width={400}
                height={250}
                data={data}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="probability" />
            </BarChart>

        </div>
    );
}