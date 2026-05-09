import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import FakeTerminal from "../components/FakeTerminal";
import CategorySelector from "../components/CategorySelector";
import ModeSelector from "../components/ModeSelector";
import TruthSlider from "../components/TruthSlider";
import ThreatMeter from "../components/ThreatMeter";

import ExcuseCard from "../cards/ExcuseCard";
import ProbabilityChart from "../charts/ProbabilityChart";

import "../styles/dashboard.css";

export default function Dashboard() {

    const [assignment, setAssignment] = useState("");
    const [deadline, setDeadline] = useState("");
    const [situation, setSituation] = useState("");

    const [category, setCategory] =
        useState("Tech Disaster");

    const [mode, setMode] =
        useState("Safe Mode");

    const [truthLevel, setTruthLevel] =
        useState(50);

    const [results, setResults] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const categories = [
        "Tech Disaster",
        "Family Chaos",
        "Medical Emergency",
        "Internet Collapse",
        "Existential Crisis",
        "Emotional Breakdown"
    ];

    const modes = [
        "Safe Mode",
        "Netflix Drama",
        "Corporate Employee",
        "Chaotic Neutral",
        "Indian Student Ranked"
    ];

    async function generateExcuse() {

        setLoading(true);

        try {

            const response =
                await axios.post(
      `${import.meta.env.VITE_API_URL}/generate`,
                    {
                        assignment,
                        deadline,
                        situation,
                        category,
                        mode,
                        truthLevel
                    }
                );

            setResults(
                response.data.result.excuses
            );

        } catch (error) {

            console.log(error);

        }

        setLoading(false);
    }

    return (

        <div className="min-h-screen p-8 scanlines">

            <Navbar />

            <div className="grid lg:grid-cols-2 gap-6">

                <div>

                    <FakeTerminal />

                    <div className="bg-gray-900 p-6 rounded-2xl glow">

                        <input
                            placeholder="Assignment"
                            className="w-full p-3 bg-black rounded mb-4"
                            value={assignment}
                            onChange={(e) =>
                                setAssignment(e.target.value)
                            }
                        />

                        <input
                            placeholder="Deadline"
                            className="w-full p-3 bg-black rounded mb-4"
                            value={deadline}
                            onChange={(e) =>
                                setDeadline(e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Situation"
                            className="w-full p-3 bg-black rounded mb-4"
                            value={situation}
                            onChange={(e) =>
                                setSituation(e.target.value)
                            }
                        />

                        <CategorySelector
                            categories={categories}
                            category={category}
                            setCategory={setCategory}
                        />

                        <ModeSelector
                            modes={modes}
                            mode={mode}
                            setMode={setMode}
                        />

                        <TruthSlider
                            truthLevel={truthLevel}
                            setTruthLevel={setTruthLevel}
                        />

                        <button
                            onClick={generateExcuse}
                            className="w-full bg-green-500 text-black font-bold p-4 rounded-xl"
                        >

                            {
                                loading
                                    ? "GENERATING..."
                                    : "GENERATE EXCUSE"
                            }

                        </button>

                    </div>

                </div>

                <div className="space-y-6">

                    {
                        results.length > 0 &&
                        <ProbabilityChart
                            results={results}
                        />
                    }

                    {
                        results.map((item, index) => (
                            <ExcuseCard
                                key={index}
                                item={item}
                                index={index}
                            />
                        ))
                    }

                    {
                        results.length > 0 &&
                        <ThreatMeter level={85} />
                    }

                </div>

            </div>

        </div>
    );
}