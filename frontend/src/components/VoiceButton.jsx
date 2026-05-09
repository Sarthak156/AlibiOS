export default function VoiceButton({ text }) {

    function speak() {

        const utterance =
            new SpeechSynthesisUtterance(text);

        speechSynthesis.speak(utterance);
    }

    return (
        <button
            onClick={speak}
            className="bg-green-500 text-black px-4 py-2 rounded-lg mt-4"
        >
            🎙 Narrate Excuse
        </button>
    );
}