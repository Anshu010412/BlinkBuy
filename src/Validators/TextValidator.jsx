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

    case "question":
    case "answer":
    case "shortDescription":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 30 || value.length > 1000)
        return "field length must be 30-1000 character"
      else
        return ""

    case "icon":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 10 || value.length > 50)
        return "field length must be 10-30 character"
      else
        return ""

    default:
      return ""
  }
}