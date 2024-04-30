interface ListWrapperProps {
  children: React.ReactNode
}

export const ListWrapper = ({ children }: ListWrapperProps) => {
  return (
    <li className='shrink-0 w-[272px] h-full select-none' >
      {children}
    </li>
  )
}