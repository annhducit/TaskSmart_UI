import { useParams } from "react-router-dom";

export default function ViewDoc() {
    const { projectId } = useParams();
    
    return (
        <div>
            <h1>ViewDoc</h1>
        </div>
    )
}