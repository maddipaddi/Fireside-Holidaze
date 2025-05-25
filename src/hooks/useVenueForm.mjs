import { useState, useEffect } from "react";
import { useApiRequest } from "./useApiRequest.mjs";
import { VENUES } from "../utils/constants.mjs";

export function useVenueForm({ venueId, onSubmit, onSuccess, onError }) {
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

  useEffect(() => {
    if (!venueId) return;
    (async () => {
      try {
        const { data } = await request(`${VENUES}/${venueId}`);
        setFormData({
          name: data.name || "",
          description: data.description || "",
          media: data.media.length ? data.media : [{ url: "", alt: "" }],
          price: data.price || 0,
          maxGuests: data.maxGuests || 0,
          rating: data.rating || 0,
          meta: {
            wifi: data.meta?.wifi || false,
            parking: data.meta?.parking || false,
            breakfast: data.meta?.breakfast || false,
            pets: data.meta?.pets || false,
          },
          location: {
            address: data.location?.address || "",
            city: data.location?.city || "",
            zip: data.location?.zip || "",
            country: data.location?.country || "",
            continent: data.location?.continent || "",
            lat: data.location?.lat || 0,
            lng: data.location?.lng || 0,
          },
        });
      } catch (err) {
        onError(err);
      }
    })();
  }, [venueId]);

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

  function cleanFormData() {
    return {
      ...formData,
      media: formData.media.filter((m) => m.url.trim()),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await onSubmit(cleanFormData());
      onSuccess(result);
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
