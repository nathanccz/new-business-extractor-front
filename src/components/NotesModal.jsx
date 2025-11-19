import { useEffect, useState } from 'react'
import Toast from './Toast'

function NotesModal({
  businessToEdit,
  businesses,
  setToastActive,
  toastActive,
}) {
  const [note, setNote] = useState('')

  useEffect(() => {
    setNote(businessToEdit?.note || '')
  }, [businessToEdit])

  const handleTextInput = (e) => {
    setNote(e.target.value)
  }

  const handleClickSave = async () => {
    businessToEdit.note = note

    const updatedBusinesses = [...businesses].map((business) => {
      if (business.id === businessToEdit.id) {
        return businessToEdit
      } else {
        return business
      }
    })
    console.log(updatedBusinesses)

    localStorage.setItem('savedBusinesses', JSON.stringify(updatedBusinesses))

    setToastActive(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setToastActive(false)
  }

  return (
    <>
      <dialog id="notes_modal" className="modal">
        <div className="modal-box flex flex-col gap-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Notes</h3>
          <fieldset className="fieldset w-full">
            <textarea
              className="textarea h-24 w-full placeholder:opacity-65 p-4"
              placeholder="Add note..."
              onChange={handleTextInput}
              value={note}
            ></textarea>
          </fieldset>
          <div className="w-full flex justify-end gap-2">
            <button className="btn btn-neutral">Cancel</button>
            <button
              className="btn btn-accent"
              onClick={() => handleClickSave()}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
      {toastActive && <Toast text={'Note added!'} />}
    </>
  )
}

export default NotesModal
