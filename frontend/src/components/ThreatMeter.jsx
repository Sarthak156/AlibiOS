export default function ThreatMeter({ level }) {

    return (

        <div className="bg-gray-900 p-5 rounded-2xl border border-green-500">

            <h2 className="text-2xl mb-6 text-green-400">
                Threat Analysis
            </h2>

            {/* Emotional Damage */}
            <div className="mb-5">

                <div className="flex justify-between mb-2">
                    <p>Emotional Damage</p>
                    <p>{level}%</p>
                </div>

                <div className="w-full bg-black h-4 rounded">

                    <div
                        className="bg-green-500 h-4 rounded transition-all duration-500"
                        style={{
                            width: `${level}%`
                        }}
                    />

                </div>

            </div>

            {/* Believability */}
            <div className="mb-5">

                <div className="flex justify-between mb-2">
                    <p>Believability</p>
                    <p>85%</p>
                </div>

                <div className="w-full bg-black h-4 rounded">

                    <div
                        className="bg-cyan-400 h-4 rounded transition-all duration-500"
                        style={{
                            width: "85%"
                        }}
                    />

                </div>

            </div>

            {/* Parent Call Risk */}
            <div className="mb-5">

                <div className="flex justify-between mb-2">
                    <p>Parent Call Risk</p>
                    <p>62%</p>
                </div>

                <div className="w-full bg-black h-4 rounded">

                    <div
                        className="bg-red-500 h-4 rounded transition-all duration-500"
                        style={{
                            width: "62%"
                        }}
                    />

                </div>

            </div>

            {/* Suspicion Index */}
            <div>

                <div className="flex justify-between mb-2">
                    <p>Suspicion Index</p>
                    <p>41%</p>
                </div>

                <div className="w-full bg-black h-4 rounded">

                    <div
                        className="bg-yellow-400 h-4 rounded transition-all duration-500"
                        style={{
                            width: "41%"
                        }}
                    />

                </div>

            </div>

        </div>
    );
}