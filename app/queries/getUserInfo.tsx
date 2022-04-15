import db from "db"

export default async function getUserInfo(props) {
  const { userId } = props
  return await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      handle: true,
      displayName: true,
      icon: true,
    },
  })
}
