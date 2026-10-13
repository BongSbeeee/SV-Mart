import { useState } from "react";

/* Shows a PNG if `src` exists, otherwise the emoji placeholder */
const Picture = ({ src, emoji, alt, className = "" }) => {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={`object-contain ${className}`}
      />
    );
  }
  return (
    <span className={className} role="img" aria-label={alt}>
      {emoji}
    </span>
  );
};

export default Picture;