export default function ModeSelector({
    modes,
    mode,
    setMode
}) {

    return (
        <select
            className="w-full bg-black p-3 rounded-lg mb-4"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
        >
            {modes.map((item) => (
                <option key={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}