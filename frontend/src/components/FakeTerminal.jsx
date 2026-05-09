import { useEffect, useState } from "react";

export default function FakeTerminal() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        const fakeLogs = [
            "INITIALIZING ALIBI ENGINE...",
            "BYPASSING MORAL FILTERS...",
            "ANALYZING TEACHER EMPATHY...",
            "FABRICATING STORY MATRIX...",
            "CALCULATING SURVIVAL ODDS..."
        ];

        let i = 0;

        const interval = setInterval(() => {

            if (i < fakeLogs.length) {

                setLogs(prev => [
                    ...prev,
                    fakeLogs[i]
                ]);

                i++;

            }

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="bg-black text-green-400 p-4 rounded-xl h-48 overflow-auto mb-6">

            {logs.map((log, index) => (
                <p key={index}>
                    {">"} {log}
                </p>
            ))}

        </div>
    );
}