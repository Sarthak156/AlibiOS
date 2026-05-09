export default function ThreatMeter({ level }) {

    return (
        <div className="bg-gray-900 p-4 rounded-2xl">

            <h2 className="mb-3 text-lg">
                Emotional Damage Meter
            </h2>

            <div className="w-full bg-black rounded-full h-5">

                <div
                    className="bg-green-500 h-5 rounded-full"
                    style={{
                        width: `${level}%`
                    }}
                />

            </div>

        </div>
    );
}