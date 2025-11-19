function Toast({ isSaving, text }) {
  return (
    <div className="toast toast-start bg-base-200">
      <div
        className={`alert ${
          isSaving || text ? 'alert-success' : 'alert-neutral'
        }`}
      >
        <span>
          {isSaving
            ? 'Business was saved successfully!'
            : !text
            ? 'Business was removed from your saved list.'
            : text}
        </span>
      </div>
    </div>
  )
}

export default Toast
