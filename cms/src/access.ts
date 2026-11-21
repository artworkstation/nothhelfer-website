import type { Access, FieldAccess } from 'payload'

type U = { rolle?: string } | null | undefined

export const isAdmin = ({ req }: { req: { user?: unknown } }): boolean =>
  (req.user as U)?.rolle === 'admin'

export const loggedIn: Access = ({ req }) => Boolean(req.user)
export const adminOnly: Access = ({ req }) => isAdmin({ req })
export const adminField: FieldAccess = ({ req }) => isAdmin({ req })
export const anyone: Access = () => true

/** Öffentlich lesbar: nur veröffentlichte Dokumente, angemeldete sehen alles */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
