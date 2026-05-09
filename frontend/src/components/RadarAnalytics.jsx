import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export default function RadarAnalytics(){

  const data = [
    {
      subject:"Believability",
      A:90
    },
    {
      subject:"Risk",
      A:70
    },
    {
      subject:"Manipulation",
      A:95
    },
    {
      subject:"Suspicion",
      A:40
    }
  ];

  return(

    <div className="bg-gray-900 p-5 rounded-2xl">

      <h2 className="text-2xl mb-4">
        Threat Analysis
      </h2>

      <RadarChart
        outerRadius={90}
        width={400}
        height={300}
        data={data}
      >

        <PolarGrid />

        <PolarAngleAxis
          dataKey="subject"
        />

        <PolarRadiusAxis />

        <Radar
          dataKey="A"
        />

      </RadarChart>

    </div>
  )
}