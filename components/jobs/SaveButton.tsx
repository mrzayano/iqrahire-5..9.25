// components/SaveButton.tsx
import { toggleSaveJob } from "@/actions/save_action";
import { useState } from "react";

interface SaveButtonProps {
  jobId: string;
  initialSaved: boolean;
}

export default function SaveButton({ jobId, initialSaved }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const success = await toggleSaveJob(jobId, isSaved);
    if (success) {
      setIsSaved(!isSaved);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 rounded ${isSaved ? 'bg-red-500' : 'bg-green-500'} text-white`}
    >
      {loading ? "Saving..." : isSaved ? "Unsave" : "Save"}
    </button>
  );
}
