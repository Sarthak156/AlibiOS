export default function SystemStats() {

    const stats = [
        "Teacher Empathy: 72%",
        "Suspicion Level: LOW",
        "Narrative Stability: HIGH",
        "Emotional Payload: CRITICAL"
    ];

    return (
        <div className="bg-gray-900 p-5 rounded-2xl">

            <h2 className="text-xl mb-4">
                SYSTEM ANALYTICS
            </h2>

            <div className="space-y-3">

                {
                    stats.map((item, index) => (
                        <p key={index}>
                            {item}
                        </p>
                    ))
                }

            </div>

        </div>
    );
}