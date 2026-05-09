export default function CategorySelector({
    categories,
    category,
    setCategory
}) {

    return (
        <select
            className="w-full bg-black p-3 rounded-lg mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            {categories.map((item) => (
                <option key={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}