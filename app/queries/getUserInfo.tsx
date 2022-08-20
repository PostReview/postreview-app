import db from "db"

export default async function getUserInfo(props) {
  const { userId, userHandle } = props

  return await db.user.findFirst({
    where: userId ? { id: userId } : { handle: userHandle },
    select: {
      id: true,
      handle: true,
      displayName: true,
      pronoun: true,
      icon: true,
      aboutMe: true,
      website: true,
    },
  })
}
