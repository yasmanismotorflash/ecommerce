import * as React from "react";
import { cn } from "../../../lib/utils";


interface MfViewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface MfViewCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface MfViewCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface MfViewCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}



// Componente MfViewCard
const MfViewCard = React.forwardRef<HTMLDivElement, MfViewCardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("shadow-lg rounded border bg-card text-card-foreground ", className)}
      {...props}
    />
  )
);
MfViewCard.displayName = "MfViewCard";

// Componente MfViewCardHeader
const MfViewCardHeader = React.forwardRef<HTMLDivElement, MfViewCardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />
  )
);
MfViewCardHeader.displayName = "MfViewCardHeader";

// Componente MfViewCardBody
const MfViewCardBody = React.forwardRef<HTMLDivElement, MfViewCardBodyProps>(
  ({ className, ...props }, ref) => (
    <div 
    ref={ref} 
    className={cn("p-2 pt-0", className)}
     {...props} />
  )
);
MfViewCardBody.displayName = "MfViewCardBody";

// Componente MfViewCardTitle
const MfViewCardTitle = React.forwardRef<HTMLDivElement, MfViewCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-2xl font-sans font-semibold  ", className)}
      {...props}
    />
  )
);
MfViewCardTitle.displayName = "MfViewCardTitle";

// Componente MfViewCardFooter
const MfViewCardFooter = React.forwardRef<HTMLDivElement, MfViewCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-5 pt-0", className)} {...props} />
  )
);
MfViewCardFooter.displayName = "MfViewCardFooter";


export {
  MfViewCard,
  MfViewCardHeader,
  MfViewCardBody,
  MfViewCardTitle,
  MfViewCardFooter,
};
