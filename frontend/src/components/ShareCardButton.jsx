import html2canvas from "html2canvas";

export default function ShareCardButton() {

    async function capture() {

        const card =
            document.body;

        const canvas =
            await html2canvas(card);

        const image =
            canvas.toDataURL("image/png");

        const link =
            document.createElement("a");

        link.download = "alibi-card.png";

        link.href = image;

        link.click();
    }

    return (
        <button
            onClick={capture}
            className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
        >
            📸 Export Share Card
        </button>
    );
}