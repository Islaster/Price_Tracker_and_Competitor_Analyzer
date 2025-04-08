// components/BackButton.tsx
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded shadow"
    >
      ← Back
    </button>
  );
}
