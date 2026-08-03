'use client'

import { useEffect } from 'react'
import { markSubmissionRead } from '../actions/submissions.actions'

export default function MarkSubmissionReadOnView({ id, isRead }: { id: string; isRead: boolean }) {
  useEffect(() => {
    if (!isRead) {
      markSubmissionRead(id)
    }
  }, [id, isRead])

  return null
}
