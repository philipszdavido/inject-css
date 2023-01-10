import { useEffect, useState } from "react";

export const Alert = ({ msg, open }) => {
  return open && <div className="alert">{msg}</div>;
};
