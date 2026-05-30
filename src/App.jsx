import React, { useState, useEffect } from 'react'

const App = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes")
        return savedNotes ? JSON.parse(savedNotes) : []
    })

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const addNote = () => {
        if (!title || !desc) return

        const newNote = {
            id: Date.now(),
            title,
            desc
        }

        setNotes([...notes, newNote])
        setTitle("")
        setDesc("")
    }

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id))
    }

    return (
        <div className='min-h-screen bg-gray-900 py-10 flex flex-col justify-center items-center'>

            <div className='bg-pink-300 w-125 flex flex-col rounded-2xl text-center gap-2 px-10 py-10'>

                <h1 className='text-5xl mb-10 text-gray-800'>Notes</h1>

                <input
                    type="text"
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='p-3 w-full border border-black bg-white rounded-xl'
                />

                <br />

                <textarea
                    placeholder='Enter description'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className='resize-none w-full rounded-xl p-5 h-50 overflow-hidden bg-white'
                />

                <br />

                <button
                    onClick={addNote}
                    className='bg-blue-600 hover:bg-blue-700 p-5 rounded-2xl text-white'
                >
                    Add Note
                </button>

                <br />
                <hr />
                <br />

                <h2 className='text-3xl'>Your Saved Notes</h2>

                {notes.length === 0 ? (
                    <p className='text-gray-700 mt-4'>No notes available</p>
                ) : (
                    notes.map((detail) => (
                        <div
                            key={detail.id}
                            className='border border-black w-full bg-green-400 rounded-xl flex flex-col gap-3 mt-5 items-start px-5 py-5'
                        >
                            <h2 className='text-3xl font-bold'>
                                {detail.title}
                            </h2>

                            <p className='text-xl text-left'>
                                {detail.desc}
                            </p>

                            <button
                                className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl'
                                onClick={() => deleteNote(detail.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}

            </div>

        </div>
    )
}

export default App