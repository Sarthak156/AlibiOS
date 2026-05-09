export default function TruthSlider({
    truthLevel,
    setTruthLevel
}) {

    return (
        <div className="mb-6">

            <div className="mb-2">
                Truth Level:
                {" "}
                {truthLevel}%
            </div>

            <input
                type="range"
                min="0"
                max="100"
                value={truthLevel}
                onChange={(e) =>
                    setTruthLevel(e.target.value)
                }
                className="w-full"
            />

        </div>
    );
}