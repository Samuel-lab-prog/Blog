import { NavLink } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'disabled' | 'anchor';
  iconSrc?: string;
  onClick?: () => void;
  to?: string;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({
  children,
  variant = 'primary',
  iconSrc,
  onClick,
  to,
  href,
  className = '',
  type = 'button',
}: ButtonProps) {
  const buttonVariants: Record<string, string> = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    disabled: 'btn btn-disabled',
    anchor: 'anchor',
  };

  const content = (
    <>
      {iconSrc && (
        <img src={iconSrc} alt="icon" className="inline-block mr-2" />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonVariants[variant]} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          isActive
            ? `${buttonVariants[variant]} active-anchor ${className}`
            : `${buttonVariants[variant]} ${className}`
        }
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      className={`${buttonVariants[variant]} ${className}`}
      onClick={onClick}
      disabled={variant === 'disabled'}
      type={type}

    >
      {content}
    </button>
  );
}
