export default function imageValidator(e) {
  if (e.target.files.length === 1) {
    let image = e.target.files[0]
    if (!["image/jpg", "image/jpeg", "image/gif", "image/png", "image/webp", "image/avif"].includes(image.type))
      return "Invalid images Format ,Please Upload an image of type are .jpg, .jpeg, .png, .webp, .gif, .avif "
    else if (image.size > 1024 * 1024)
      return "Image is too large. Please upload an image smaller than 1 MB.";
    else
      return ""
  }
  else {
    return ""
  }
}