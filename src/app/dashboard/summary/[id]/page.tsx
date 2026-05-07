import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ClientSummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: template } = await supabase
    .from("templates")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (!client || !template) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-6 space-y-8">
      <div className="border rounded-xl p-8 shadow-sm bg-white">
        <h1 className="text-4xl font-bold">{client.client_name}</h1>

        <p className="mt-4 text-lg text-gray-700">
          Specialization: {template.specialization}
        </p>

        <p className="text-gray-600">
          Work Style: {template.work_style}
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p>{client.project_summary}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Goals</h2>
          <p>{client.goals}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Status</h2>
          <p>{client.status}</p>
        </div>
      </div>
    </main>
  );
}