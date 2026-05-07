'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function TemplatePage() {
  const supabase = createClient()
  const router = useRouter()

  const [specialization, setSpecialization] = useState('')
  const [workStyle, setWorkStyle] = useState('Remote')
  const [defaultSections, setDefaultSections] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { error } = await supabase.from('templates').upsert({
      user_id: user.id,
      specialization,
      work_style: workStyle,
      default_sections: defaultSections.split(',').map((s) => s.trim()),
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSave}
        className="w-full max-w-lg space-y-4 rounded-lg border p-8 shadow"
      >
        <h1 className="text-2xl font-bold">Create Your Template</h1>

        <input
          type="text"
          placeholder="Specialization"
          className="w-full rounded border p-3"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />

        <select
          className="w-full rounded border p-3"
          value={workStyle}
          onChange={(e) => setWorkStyle(e.target.value)}
        >
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>

        <input
          type="text"
          placeholder="Default Sections (Overview, Goals, Notes)"
          className="w-full rounded border p-3"
          value={defaultSections}
          onChange={(e) => setDefaultSections(e.target.value)}
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading ? 'Saving...' : 'Save Template'}
        </button>
      </form>
    </div>
  )
}