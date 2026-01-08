import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Card } from "../Card";

export function Share() {
    const { shareId } = useParams();
    const [contents, setContents] = useState([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchSharedContent() {
            setLoading(true);
            setError("");
            try {
                const apiUrl = `${BACKEND_URL}/api/v1/brain/${shareId}`;
                console.log("Fetching from:", apiUrl);
                const response = await axios.get(apiUrl);
                console.log("Response data:", response.data);

                const data = response.data;
                setContents(data.contents || []);
                setUsername(data.username || "");
            } catch (err: any) {
                console.error("Share fetch error:", err.response || err);
                setError(err.response?.data?.message || "Invalid or expired share link.");
            }
            setLoading(false);
        }
        if (shareId) fetchSharedContent();
    }, [shareId]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            <span className="ml-2">Loading shared content...</span>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Oops!</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
                onClick={() => window.location.href = '/'}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
                Back to Noteura
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        {username ? <span className="text-purple-600">{username}'s</span> : "A"} collection
                    </h2>
                    <div className="h-1 w-20 bg-purple-600 rounded-full"></div>
                </header>

                <div className="flex gap-6 flex-wrap justify-center md:justify-start">
                    {contents.length === 0 ? (
                        <div className="w-full text-center py-20 text-gray-500 italic">
                            No content found in this collection.
                        </div>
                    ) : (
                        contents.map(({ _id, title, type, link, text }: any, idx: number) => (
                            <Card
                                key={_id || idx}
                                id={_id}
                                title={title}
                                type={type}
                                link={link}
                                text={text}
                                onDelete={() => { }} // No-op for read-only view
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );

}