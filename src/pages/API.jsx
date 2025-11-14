function API() {
  return (
    <div className="text-left mb-3">
      <h1 className="text-xl font-bold mb-3">Welcome!</h1>
      <p className="mb-3">
        Are you a developer who could use this data for your own purposes?
        You're in luck! Here's how you can query the API powering this web app.
      </p>
      <h2 className="font-bold text-lg mb-3">Getting all businesses</h2>
      <p>
        Every month, the API serves the latest data for the current month. You
        can access it by querying the index route,
        api.newbizla.com/api/businesses.
      </p>
    </div>
  )
}

export default API
