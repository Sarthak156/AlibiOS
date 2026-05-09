import html2canvas from "html2canvas";

export default function ShareCardButton(){

  async function exportCard(){

    const canvas =
      await html2canvas(document.body);

    const image =
      canvas.toDataURL("image/png");

    const link =
      document.createElement("a");

    link.download =
      "alibi-report.png";

    link.href = image;

    link.click();
  }

  return(

    <button
      onClick={exportCard}
      className="bg-blue-500 px-4 py-2 rounded-lg"
    >
      📸 Export Share Card
    </button>
  )
}