export default function imageValidator(e) {
  if (e.target.files.length === 1) {
    let image = e.target.files[0]
    if (!["image/jpg", "image/jpeg", "image/gif", "image/png", "image/webp", "image/avif"].includes(image.type))
      return "Invalid images Format ,Please Upload an image of type are .jpg, .jpeg, .png, .webp, .gif, .avif "
    else if (image.size > 1024 * 1024)
      return "Image Size is too large. Please upload an image smaller than 1 MB.";
    else
      return ""
  }
  else {
    let errorMessage = []
    Array.from(e.target.files).forEach((image, index) => {
      if (!["image/jpg", "image/jpeg", "image/gif", "image/png", "image/webp", "image/avif"].includes(image.type))
        errorMessage.push(`Invalid images${index + 1} Format ,Please Upload an image of type are .jpg, .jpeg, .png, .webp, .gif, .avif `)
      else if (image.size > 1024 * 1024)
        errorMessage.push("Image Size is too large. Please upload an image smaller than 1 MB.");
    })
    return errorMessage.length ? errorMessage.join("|") : ""
  }
}