import { useEffect, useRef, useState } from 'react'
import './SortControl.css'

type SortControlProps = {
  sortOptions: { name: string; id: string }[]
  currentSelection: string
  onSelection: (option: string) => void
}

function SortControl({ sortOptions, currentSelection, onSelection }: SortControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption =
    sortOptions.find((option) => option.id === currentSelection) ?? sortOptions[0]

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (optionId: string) => {
    onSelection(optionId)
    setIsOpen(false)
  }

  return (
    <div className="sort-control">
      <p className="sort-control__label">Sort by</p>
      <div className="sort-control__dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="sort-control__trigger"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedOption?.name}
        </button>
        {isOpen && (
          <ul className="sort-control__menu" role="listbox">
            {sortOptions.map((option) => (
              <li key={option.id} role="option" aria-selected={option.id === currentSelection}>
                <button
                  type="button"
                  className="sort-control__menu-item"
                  onClick={() => handleSelect(option.id)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SortControl
