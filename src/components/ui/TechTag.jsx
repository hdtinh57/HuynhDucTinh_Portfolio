export function TechTag({ children, tone = 'default' }) {
  return <span className={`tech-tag tech-tag-${tone}`}>{children}</span>;
}
