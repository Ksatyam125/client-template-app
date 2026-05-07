import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function EditTemplatePage({
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
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (!template) {
    notFound();
  }

  async function updateTemplate(formData: FormData) {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("templates")
      .update({
        specialization: formData.get("specialization"),
        work_style: formData.get("work_style"),
        default_sections: formData.get("default_sections"),
      })
      .eq("id", id);

    redirect("/dashboard");
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-6">
      <div className="border rounded-xl p-8 shadow-sm bg-white">
        <h1 className="text-3xl font-bold mb-8">Edit Template</h1>

        <form action={updateTemplate} className="space-y-5">
          <input
            name="specialization"
            defaultValue={template.specialization}
            required
            className="w-full border p-3 rounded"
          />

          <select
            name="work_style"
            defaultValue={template.work_style}
            className="w-full border p-3 rounded"
          >
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>

          <input
            name="default_sections"
            defaultValue={template.default_sections}
            required
            className="w-full border p-3 rounded"
          />

          <button className="w-full bg-black text-white py-3 rounded font-medium">
            Update Template
          </button>
        </form>
      </div>
    </main>
  );
}