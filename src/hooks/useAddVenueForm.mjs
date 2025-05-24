import { useState } from "react";
import { useApiRequest } from "./useApiRequest.mjs";
import { VENUES } from "../utils/constants.mjs";

export function useAddVenueForm(onSuccess, onError) {
  const INITIAL_FORM_DATA = {
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { request, isLoading } = useApiRequest();

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => {
      if (name in prev) {
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };
      }
      return prev;
    });
  }

  function handleNestedChange(event, section) {
    const { name, type, value, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: val,
      },
    }));
  }

  function handleMediaChange(event, index, field) {
    const { value } = event.target;
    setFormData((prev) => {
      const updatedMedia = [...prev.media];
      updatedMedia[index][field] = value;
      return { ...prev, media: updatedMedia };
    });
  }

  function addImageField() {
    setFormData((prev) => {
      if (prev.media.length >= 4) return prev;
      return {
        ...prev,
        media: [...prev.media, { url: "", alt: "" }],
      };
    });
  }

  function removeImage(index) {
    setFormData((prev) => {
      const media = [...prev.media];
      media.splice(index, 1);
      return { ...prev, media };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedFormData = {
      ...formData,
      media: formData.media.filter((item) => item.url.trim() !== ""),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),
    };
    try {
      await request(VENUES, {
        method: "POST",
        body: JSON.stringify(cleanedFormData),
      });
      onSuccess();
      setFormData(INITIAL_FORM_DATA);
    } catch (err) {
      onError(err);
    }
  }

  return {
    formData,
    isLoading,
    handleChange,
    handleNestedChange,
    handleMediaChange,
    addImageField,
    removeImage,
    handleSubmit,
  };
}
