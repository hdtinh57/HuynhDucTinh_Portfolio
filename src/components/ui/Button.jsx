export function Button({ as: Component = 'button', className = '', children, ...props }) {
  return (
    <Component className={`btn ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
