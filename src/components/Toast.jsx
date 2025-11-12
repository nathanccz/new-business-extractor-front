function Toast({ isSaving }) {
  return (
    <div className="toast toast-start">
      <div className={`alert ${isSaving ? 'alert-success' : 'alert-neutral'}`}>
        <span>
          {isSaving
            ? 'Business was saved successfully!'
            : 'Business was removed from your saved list.'}
        </span>
      </div>
    </div>
  )
}

export default Toast
