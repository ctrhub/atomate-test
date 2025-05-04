import React from 'react';
import classes from './Link.module.css';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  asChild?: boolean;
}

export function Link({ href, className, style, asChild = false, children, ...rest }: LinkProps) {
  const classNames = [classes.link, className].filter(Boolean).join(' ');

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: [classNames, child.props.className].filter(Boolean).join(' '),
      style,
      ...rest,
    });
  }

  return (
    <a
      href={href}
      className={classNames}
      style={style}
      {...rest}
    >
      {children}
    </a>
  );
}
