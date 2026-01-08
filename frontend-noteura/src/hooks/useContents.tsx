import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";

export interface CardType {
    _id: string;
    title: string;
    text: string;
    type: "youtube" | "twitter" | "notes";
    link: string;
}

export function useContents(token: string | null) {
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isFristLoad = useRef(true);

    const refreshCards = useCallback(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        if (isFristLoad.current) setLoading(true);
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setCards((res as any).data.Contents || []);
                if (isFristLoad.current) {
                    setLoading(false);
                    isFristLoad.current = false;
                }
            })
            .catch(() => {
                setError("Failed to fetch cards");
                if (isFristLoad.current) {
                    setLoading(false);
                    isFristLoad.current = false
                }
            });
    }, [token]);
    useEffect(() => {
        refreshCards();
        const interval = setInterval(refreshCards, 2000);
        return () => clearInterval(interval);
    }, [refreshCards]);



    const deleteCard = async (id: string) => {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { contentId: id }
            } as any);
            setCards(card => card.filter(card => card._id !== id));
        } catch {
            setError("Failed to delete card");
        }
    };

    return { cards, loading, error, deleteCard, refreshCards }

}
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";

// export interface CardType {
//   _id: string;
//   title: string;
//   text: string;
//   type: "youtube" | "twitter";
//   link: string;
// }

// export function useContents(token: string | null) {
//   const [cards, setCards] = useState<CardType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const refreshCards = useCallback(async () => {
//     if (!token) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCards(res.data.useContents);
//     } catch {
//       setError("Failed to fetch cards");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     refreshCards();
//   }, [refreshCards]);

//   const deleteCard = async (id: string) => {
//     try {
//       await axios.delete(`${BACKEND_URL}/api/v1/content`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: { contentId: id },
//       });
//       setCards((prev) => prev.filter((card) => card._id !== id));
//     } catch {
//       setError("Failed to delete card");
//     }
//   };

//   return { cards, loading, error, deleteCard, refreshCards };
// }
