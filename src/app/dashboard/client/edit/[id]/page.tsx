import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (!client) {
    notFound();
  }

  async function updateClient(formData: FormData) {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("clients")
      .update({
        client_name: formData.get("client_name"),
        project_summary: formData.get("project_summary"),
        goals: formData.get("goals"),
        status: formData.get("status"),
      })
      .eq("id", id);

    redirect("/dashboard");
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-6">
      <div className="border rounded-xl p-8 shadow-sm bg-white">
        <h1 className="text-3xl font-bold mb-8">Edit Client</h1>

        <form action={updateClient} className="space-y-5">
          <input
            name="client_name"
            defaultValue={client.client_name}
            placeholder="Client Name"
            required
            className="w-full border p-3 rounded"
          />

          <textarea
            name="project_summary"
            defaultValue={client.project_summary}
            placeholder="Project Summary"
            required
            className="w-full border p-3 rounded"
          />

          <textarea
            name="goals"
            defaultValue={client.goals}
            placeholder="Goals"
            required
            className="w-full border p-3 rounded"
          />

          <select
            name="status"
            defaultValue={client.status}
            className="w-full border p-3 rounded"
          >
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>

          <button className="w-full bg-black text-white py-3 rounded font-medium">
            Update Client
          </button>
        </form>
      </div>
    </main>
  );
}