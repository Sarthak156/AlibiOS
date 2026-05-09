import { ClipLoader } from "react-spinners";

export default function Loader() {

    return (
        <div className="flex justify-center py-6">

            <ClipLoader color="#00ff99" />
            new Audio("/boot.mp3").play()

        </div>
    );
}