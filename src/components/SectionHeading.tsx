interface Props {
  id: string;
  number: string;
  children: React.ReactNode;
}

/** Section title with its number and a node on the page hairline. */
export function SectionHeading({ id, number, children }: Props) {
  return (
    <h2 id={`${id}-title`} className="section-heading">
      <span className="section-heading__node" aria-hidden="true" />
      <span className="section-heading__no" aria-hidden="true">
        {number}
      </span>
      {children}
    </h2>
  );
}
