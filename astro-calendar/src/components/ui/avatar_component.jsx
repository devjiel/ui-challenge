import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const AvatarComponent = ({ src, alt, fallbackText }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};