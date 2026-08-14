import PasswordValidator from "password-validator"

var schema = new PasswordValidator();
schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase(1)                              // Must haveat least 1 uppercase letters
  .has().lowercase(1)                              // Must haveat least 1 lowercase letters
  .has().digits(1)                                // Must have at least 1 digits
  .has().symbols(1)                                // Must have at least special character 1 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function TextValidator(e) {
  let { name, value } = e.target
  switch (name) {
    case "name":
    case "username":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 3 || value.length > 100)
        return name + "field length must be 3-40 character"
      else
        return ""

    case "email":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 13 || value.length > 100)
        return name + "field length must be 13-40 character"
      else
        return ""

    case "password":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (!schema.validate(value))
        return schema.validate(value, { details: true }).map(x => x.message?.replaceAll("string", "password")).join(", ")
      else
        return ""

    case "phone":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 10 || value.length > 10)
        return name + "field length must be 10"
      else if (!"6789".includes(value[0]))
        return name + "field start with 6,7,8 or 9 only"
      else
        return ""

    case "question":
    case "answer":
    case "shortDescription":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 30 || value.length > 1000)
        return name + "field length must be 30-1000 character"
      else
        return ""

    case "icon":
      if (!value || value.length === 0)
        return name + " field is mandatory"
      else if (value.length < 10 || value.length > 50)
        return name + "field length must be 10-30 character"
      else
        return ""

    default:
      return ""
  }
}