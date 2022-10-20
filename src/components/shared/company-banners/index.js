import { twMerge } from 'tailwind-merge'

const CompanyBanners = ({ companies, w, className }) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-around lg:justify-between flex-wrap gap-2 w-full',
        className,
      )}
    >
      {companies.map((company) => (
        <a
          href={company.url}
          key={company.name}
          className={twMerge('flex items-center justify-center', w)}
          target="_blank"
          rel="noreferrer"
        >
          <company.logo />
        </a>
      ))}
    </div>
  )
}

export default CompanyBanners
