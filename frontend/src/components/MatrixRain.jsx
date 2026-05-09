export default function MatrixRain() {

    return (
        <div className="fixed inset-0 opacity-10 pointer-events-none">

            <div className="text-green-500 text-xs whitespace-pre-wrap">

                {
                    Array(500)
                        .fill("101010101010")
                        .join(" ")
                }

            </div>

        </div>
    );
}