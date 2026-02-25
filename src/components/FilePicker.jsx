/* eslint-disable react-hooks/immutability */
import React, { useRef, useState, useEffect } from "react";

export default function FilePicker({ name, label, register, validation, errors, accept = "image/*", onPreview }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const reg = register(name, validation || {});
  const { ref: originalRef, onChange: originalOnChange, ...rest } = reg;

  useEffect(() => {
    if (!originalRef) return;
    if (typeof originalRef === "function") {
      originalRef(inputRef.current);
      return () => originalRef(null);
    }
    // originalRef is object
    originalRef.current = inputRef.current;
    return () => {
      originalRef.current = null;
    };
  }, [originalRef]);

  const handleChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    if (file && typeof onPreview === 'function') onPreview(file);
    if (originalOnChange) originalOnChange(e);
  };

  const openCamera = () => {
    inputRef.current?.setAttribute("capture", "environment");
    inputRef.current?.click();
  };

  const openGallery = () => {
    inputRef.current?.removeAttribute("capture");
    inputRef.current?.click();
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="vin">
        <button type="button" onClick={openCamera}><img src="/photo.svg" /></button>
        <button type="button" onClick={openGallery}><img src="/gallery.svg" /></button>
        <div className="preview">
          {preview ? <img src={preview} alt={`${name} preview`} /> : <></>}
        </div>
        <input
          type="file"
          accept={accept}
          hidden
          {...rest}
          ref={inputRef}
          onChange={handleChange}
        />
      </div>
      {errors && errors[name] && <span className="error">{errors[name].message}</span>}
    </div>
  );
}
