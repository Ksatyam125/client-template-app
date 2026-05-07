"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();
  const supabase = createClient();

  const [clientName, setClientName] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [goals, setGoals] = useState("");
  const [status, setStatus] = useState("Active");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("clients").insert([
      {
        user_id: user?.id,
        client_name: clientName,
        project_summary: projectSummary,
        goals,
        status,
      },
    ]);

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border rounded-xl p-8 space-y-4"
      >
        <h1 className="text-3xl font-bold">Add Client Project</h1>

        <input
          className="w-full border p-3 rounded"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Project Summary"
          value={projectSummary}
          onChange={(e) => setProjectSummary(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Goals"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>Paused</option>
          <option>Completed</option>
        </select>

        <button className="w-full bg-black text-white py-3 rounded">
          Save Client
        </button>
      </form>
    </main>
  );
}