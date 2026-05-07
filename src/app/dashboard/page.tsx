import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: templates } = await supabase
    .from("templates")
    .select("*")
    .eq("user_id", user?.id);

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user?.id);

  return (
  <main className="max-w-7xl mx-auto py-12 px-6 sm:px-6 lg:px-8">
    {/* Header */}
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Manage your templates and clients
        </p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
        <Link
          href="/dashboard/template"
          className="w-full sm:w-auto bg-black text-white px-5 py-3 rounded-lg font-medium hover:opacity-90"
        >
          + New Template
        </Link>

        <Link
          href="/dashboard/client"
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          + New Client
        </Link>

        <form action="/auth/logout" method="post" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-gray-200 px-5 py-3 rounded-lg font-medium hover:bg-gray-300">
            Logout
          </button>
        </form>
      </div>
    </header>

    {/* Templates Section */}
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">
        Your Templates
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates?.map((template) => (
          <div
            key={template.id}
            className="border rounded-2xl p-6 shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="text-2xl font-semibold">
              {template.specialization}
            </h3>

            <p className="text-gray-600 mt-3">
              Work Style: {template.work_style}
            </p>

            <p className="text-gray-500 mt-2">
              Sections: {template.default_sections}
            </p>

            <Link
              href={`/dashboard/template/edit/${template.id}`}
              className="block mt-5 text-green-600 font-medium hover:underline"
            >
              Edit Template
            </Link>
          </div>
        ))}
      </div>
    </section>

    {/* Clients Section */}
    <section>
      <h2 className="text-3xl font-bold mb-8">
        Your Clients
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {clients?.map((client) => (
          <div
            key={client.id}
            className="border rounded-2xl p-6 shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="text-2xl font-semibold">
              {client.client_name}
            </h3>

            <p className="text-gray-600 mt-3">
              {client.project_summary}
            </p>

            <p className="text-gray-500 mt-3">
              Goals: {client.goals}
            </p>

            <span
              className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${
                client.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : client.status === "Paused"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {client.status}
            </span>

            <div className="mt-6 space-y-2">
              <Link
                href={`/dashboard/summary/${client.id}`}
                className="block text-blue-600 font-medium hover:underline"
              >
                View Summary →
              </Link>

              <Link
                href={`/dashboard/client/edit/${client.id}`}
                className="block text-green-600 font-medium hover:underline"
              >
                Edit Client
              </Link>

              <form
                action={`/dashboard/client/delete/${client.id}`}
                method="post"
              >
                <button className="text-red-600 font-medium hover:underline">
                  Delete Client
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
)};