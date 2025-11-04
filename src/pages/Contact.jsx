import { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Handler for input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
  }

  const URL = import.meta.env.VITE_EMAIL_ADDRESS
  const API_KEY = import.meta.env.VITE_WEB3FORMS_KEY

  const onFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target)
    formData.append('access_key', API_KEY)

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)
    console.log(json)
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })

    const web3Response = await response.json()

    if (web3Response.success) {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } else {
      alert('Oops! Something went wrong. Please try again.')
    }
  }
  return (
    <div className="text-left my-10 p-5">
      <h1 className="font-bold text-2xl mb-3">Contact</h1>
      <p className="mb-8">
        Have questions, or need a cool site like this one? Feel free to reach
        out at any time. I'm currently accepting freelance work!
      </p>
      <div>
        <form action="" onSubmit={onFormSubmit}>
          <input
            type="hidden"
            name="from_name"
            value={`${formData.name} from NewBizLA`}
          />
          <input type="hidden" name="replyto" value={formData.email} />
          <div className="flex flex-col gap-3 md:flex-row w-full">
            <label className="input input-bordered flex items-center gap-2 w-full">
              Name
              <input
                type="text"
                name="name"
                id="name"
                className="grow placeholder:opacity-65"
                placeholder="Required"
                onChange={handleInputChange}
                value={formData.name}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              Email
              <input
                name="email"
                id="email"
                type="email"
                className="grow placeholder:opacity-65"
                placeholder="Required"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </label>
          </div>
          <textarea
            name="message"
            id="message"
            className="textarea textarea-bordered p-5 w-full mt-5 h-56 md:textarea-md placeholder:opacity-75"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="btn btn-outline btn-primary mt-5 w-full md:w-1/2 lg:w-1/4">
            <div className="flex justify-around gap-3 items-center">
              {loading && (
                <>
                  <span>Sending Message</span>
                  <span className="loading loading-spinner loading-sm"></span>
                </>
              )}
              {success && (
                <>
                  <span>Thanks for your message!</span>
                </>
              )}
              {!loading && !success && (
                <>
                  <span>Send Message</span>
                  <Icon
                    icon="ri:mail-send-line"
                    className="cursor-pointer text-lg"
                  />
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
