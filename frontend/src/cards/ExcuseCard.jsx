import { motion } from "framer-motion";
import axios from "axios";

export default function ExcuseCard({ item, index }) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-green-500 p-5 rounded-2xl"
        >

            <h2 className="text-2xl mb-3 text-green-400">
                Excuse #{index + 1}
            </h2>

            <p className="mb-5 leading-7">
                {item.text}
            </p>

            <div className="space-y-2 text-sm">

                <p>
                    🎯 Success Probability:
                    {" "}
                    {item.success_probability}
                </p>

                <p>
                    🧠 Emotional Manipulation:
                    {" "}
                    {item.emotional_manipulation}
                </p>

                <p>
                    ☠️ Risk:
                    {" "}
                    {item.risk}
                </p>

                <p>
                    🕵️ Lie Detector:
                    {" "}
                    {item.lie_detector}
                </p>

            </div>

        </motion.div>
    );
}

async function downloadReport() {

    const response = await axios.post(
        "http://127.0.0.1:8000/report",
        {
            assignment: "Unknown",
            deadline: "Unknown",
            situation: item.text
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
        "report.pdf"
    );

    document.body.appendChild(link);

    link.click();
}

<button
    onClick={downloadReport}
    className="bg-red-500 px-4 py-2 rounded-lg mt-4"
>
    📄 Download FBI Report
</button>