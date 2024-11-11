import React from 'react';
import { cn } from '../../../../lib/utils';

export function Container({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('py-2 ', className)} {...props}>
            {children}
        </div>
    );
}
