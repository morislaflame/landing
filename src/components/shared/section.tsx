
interface SectionProps {
    children: React.ReactNode
    className?: string
    id?: string
  }
  
  export function Section({ children, className, id }: SectionProps) {
    return (
      <section id={id} className={`${className}`}>
        {children}
      </section>
    )
  }