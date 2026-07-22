export default function TextValidator(e) {
  let { name, value } = e.target
  switch (name) {
    case "name":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 3 || value.length > 30)
        return "field length must be 3-30 character"
      else
        return ""

      default:
        return ""
  }
}