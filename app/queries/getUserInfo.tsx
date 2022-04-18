import db from "db"

export default async function getUserInfo(props) {
  const { userId, userHandle } = props

  if (userId)
    return await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        handle: true,
        displayName: true,
        icon: true,
      },
    })
  if (userHandle)
    return await db.user.findFirst({
      where: {
        handle: userHandle,
      },
      select: {
        id: true,
        handle: true,
        displayName: true,
        icon: true,
      },
    })
}
