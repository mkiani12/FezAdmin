// Validation and Media Rules Mixin
export const useValidation = () => {
  // Common email regex for validating email addresses
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validationRules = {
    required: (v: string): boolean | string =>
      !!v || "Please complete this field",
    requiredArray: (v: string): boolean | string =>
      v.length > 0 || "Please complete this field",
    select: (v: string): boolean | string => !!v || "Please select an option",
    selectObj: (v: string): boolean | string =>
      Boolean(Object.keys(v || {})[0]) || "Please select an option",
    username: (v: string): boolean | string => {
      const pattern = /^[a-zA-Z0-9._]+$/;
      return pattern.test(v) || "Invalid username";
    },
    password: (v: string): boolean | string => {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*])/;
      return (
        pattern.test(v) || "Password does not meet complexity requirements"
      );
    },
    email: (v: string): boolean | string =>
      emailRegex.test(v) || "Invalid email address",
    // New function to validate an array of emails
    emails: (v: string[]): boolean | string => {
      if (!Array.isArray(v)) return "Expected an array of emails";
      for (const email of v) {
        if (!emailRegex.test(email)) {
          return "One or more email addresses are invalid";
        }
      }
      return true;
    },
    phone: (v: string): boolean | string => {
      const pattern = /^\d{10}$/;
      const pattern2 = /^\d{9}$/;
      return (
        (pattern.test(v) && v[0] !== "0") ||
        (pattern2.test(v) && v[0] !== "0") ||
        "Invalid mobile number"
      );
    },
    numeric: (v: string): boolean | string => {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v))) return true;
      return "Only numeric characters are allowed";
    },
    min: (v: string): boolean | string =>
      v.length >= 8 || "Must be at least 8 characters",
    min3: (v: string): boolean | string =>
      v.length >= 3 || "Must be at least 3 characters",
    min5: (v: string): boolean | string =>
      v.length >= 5 || "Must be at least 5 characters",
    min8: (v: string): boolean | string =>
      v.length >= 8 || "Must be at least 8 characters",
    max30: (v: string): boolean | string =>
      v.length <= 30 || "Must be at most 30 characters",
    max90: (v: string): boolean | string =>
      (v && v.length <= 90) || "Must be at most 90 characters",
    Nmin20: (v: string): boolean | string =>
      parseInt(v) >= 20 || "Minimum value is 20",
    Nmin1: (v: string): boolean | string =>
      parseInt(v) >= 1 || "Minimum value is 1",
    minMax: (v: string): boolean | string =>
      parseInt(v) >= 1 || "Value must be at least 1",
  };

  // Media Rules
  const mediaRules = {
    max2m: (value: File): boolean | string =>
      !value || value.size < 2000000 || "File size must be less than 2MB",
    required: (value: File[]): boolean | string =>
      value.length > 0 || "Please select at least one file",
  };
  return { validationRules, mediaRules };
};
