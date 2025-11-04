function Toast({ isSaving }) {
  return (
    <div className="toast toast-start">
      <div className="alert alert-success">
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
