import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

export default function ExcuseCard({
    item,
    index,
    assignment,
    deadline,
    situation
}) {

    async function downloadReport() {

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/report`,
                {
                    assignment,
                    deadline,
                    situation
                },
                {
                    responseType: "blob"
                }
            );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "alibi-report.pdf"
            );

            document.body.appendChild(link);

            link.click();

        } catch (error) {

            console.log(error);

            alert("Failed to generate report.");
        }
    }

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                bg-gray-900
                border
                border-green-500
                p-6
                rounded-2xl
                glow
            "
        >

            {/* Title */}
            <h2 className="
                text-3xl
                mb-5
                text-green-400
                font-bold
            ">
                Excuse #{index + 1}
            </h2>

            {/* Excuse Text */}
            <div className="
                bg-black
                p-4
                rounded-xl
                mb-6
                leading-8
                text-green-200
            ">

                <TypeAnimation
                    sequence={[
                        item.text,
                        1000
                    ]}
                    wrapper="p"
                    speed={70}
                    repeat={0}
                />

            </div>

            {/* Metrics */}
            <div className="
                grid
                md:grid-cols-2
                gap-4
                text-sm
            ">

                <div className="
                    bg-black
                    p-3
                    rounded-lg
                ">
                    🎯 Success Probability:
                    {" "}
                    {item.success_probability}
                </div>

                <div className="
                    bg-black
                    p-3
                    rounded-lg
                ">
                    🧠 Emotional Manipulation:
                    {" "}
                    {item.emotional_manipulation}
                </div>

                <div className="
                    bg-black
                    p-3
                    rounded-lg
                ">
                    ☠️ Risk:
                    {" "}
                    {item.risk}
                </div>

                <div className="
                    bg-black
                    p-3
                    rounded-lg
                ">
                    🕵️ Lie Detector:
                    {" "}
                    {item.lie_detector}
                </div>

                <div className="
                    bg-black
                    p-3
                    rounded-lg
                ">
                    🎭 Acting Difficulty:
                    {" "}
                    {item.acting_difficulty || "MEDIUM"}
                </div>

                <div className="
                    bg-black
                    p-3
                    rounded-lg
                ">
                    💥 Guilt Damage:
                    {" "}
                    {item.guilt_damage || "HIGH"}
                </div>

            </div>

            {/* Cross Questions */}
            <div className="mt-8">

                <h3 className="
                    text-2xl
                    text-green-400
                    mb-4
                    font-bold
                ">
                    Teacher Cross-Questions
                </h3>

                {
                    item.cross_questions?.map(
                        (q, index) => (

                            <div
                                key={index}
                                className="
                                    mb-4
                                    bg-black
                                    p-4
                                    rounded-xl
                                    border
                                    border-gray-700
                                "
                            >

                                <p className="
                                    text-red-400
                                    mb-3
                                    font-semibold
                                ">
                                    ❓ Q:
                                    {" "}
                                    {q.question}
                                </p>

                                <p className="
                                    text-green-300
                                    leading-7
                                ">
                                    ✅ A:
                                    {" "}
                                    {q.answer}
                                </p>

                            </div>
                        )
                    )
                }

            </div>

            {/* Download Button */}
            <button
                onClick={downloadReport}
                className="
                    mt-6
                    bg-red-500
                    hover:bg-red-600
                    transition-all
                    px-6
                    py-3
                    rounded-xl
                    font-bold
                "
            >
                📄 Download FBI Report
            </button>

        </motion.div>
    );
}