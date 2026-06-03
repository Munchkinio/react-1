import type { ReactNode } from 'react'
import './Dialog.css'

type DialogProps = {
  title: ReactNode
  children: ReactNode
  onClose: () => void
  size?: 'default' | 'compact'
}

function Dialog({ title, children, onClose, size = 'default' }: DialogProps) {
  const titleId = 'dialog-title'
  const dialogClassName = size === 'compact' ? 'dialog dialog--compact' : 'dialog'

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className={dialogClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="dialog-header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog">
            ×
          </button>
        </header>
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  )
}

export default Dialog
