import { useState } from 'react'
import './InputForm.css'

export default function InputForm({ onGenerate, loading }) {
  const [task, setTask] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.trim() && !loading) onGenerate(task.trim())
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="e.g. I stared into the fridge for 5 minutes and ate cheese straight from the bag"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        rows={3}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Directing your episode...' : 'Make it cinematic'}
      </button>
    </form>
  )
}
