import * as React from "react";
import { cn } from "@/lib/utils";


interface ViewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface ViewCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface ViewCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface ViewCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}



// Componente ViewCard
const ViewCard = React.forwardRef<HTMLDivElement, ViewCardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("shadow-lg rounded border bg-card text-card-foreground ", className)}
      {...props}
    />
  )
);
ViewCard.displayName = "ViewCard";

// Componente ViewCardHeader
const ViewCardHeader = React.forwardRef<HTMLDivElement, ViewCardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />
  )
);
ViewCardHeader.displayName = "ViewCardHeader";

// Componente ViewCardBody
const ViewCardBody = React.forwardRef<HTMLDivElement, ViewCardBodyProps>(
  ({ className, ...props }, ref) => (
    <div 
    ref={ref} 
    className={cn("p-2 pt-0", className)}
     {...props} />
  )
);
ViewCardBody.displayName = "ViewCardBody";

// Componente ViewCardTitle
const ViewCardTitle = React.forwardRef<HTMLDivElement, ViewCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-2xl font-sans font-semibold  ", className)}
      {...props}
    />
  )
);
ViewCardTitle.displayName = "ViewCardTitle";

// Componente ViewCardFooter
const ViewCardFooter = React.forwardRef<HTMLDivElement, ViewCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-5 pt-0", className)} {...props} />
  )
);
ViewCardFooter.displayName = "ViewCardFooter";


export {
  ViewCard,
  ViewCardHeader,
  ViewCardBody,
  ViewCardTitle,
  ViewCardFooter,
};
