import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"
import { useGlobalContext } from "../../Context"

const CreatePostModal = ({ closeModal }) => {
  const [caption, setCaption] = useState("")
  const [src, setSrc] = useState("")
  const { User, isCreatingPost } = useGlobalContext()

  const handleFilePicker = (e) => {
    let file = e.target.files[0]
    let maxFileSize = 2 * 1024 * 1024

    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        alert("File must be less than 2mb")
        setSrc("")
        return
      }

      let reader = new FileReader()

      reader.onload = (e) => {
        setSrc(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please select an image")
      setSrc("")
    }
    // let url = URL.createObjectURL(file)
    // setSrc(url)
  }

  const handlePost = async () => {
    try {
      await User.createPost(src, caption)
      setCaption("")
      setSrc("")
      closeModal()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <section className="create-post-modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="header">
            <h2>Create Post</h2>
            <button onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          <div className="body">
            <form>
              <textarea
                name="caption"
                id="caption"
                placeholder="Enter a caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
            </form>
            <form>
              <label htmlFor="filePicker">Select From Device</label>
              <input
                type="file"
                name="filePicker"
                id="filePicker"
                onChange={handleFilePicker}
                hidden
              />
            </form>
            <div className="img-preview">
              {src ? (
                <img src={src} alt="image" />
              ) : (
                <p>Image will be shown here.</p>
              )}
            </div>
            <button onClick={handlePost} disabled={isCreatingPost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatePostModal
