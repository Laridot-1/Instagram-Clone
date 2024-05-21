import { useEffect, useState } from "react"
import SuggestedUser from "./SuggestedUser"
import SuggestedUserSkeleton from "./SuggestedUserSkeleton"
import { useGlobalContext } from "../../Context"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { db } from "../../firebase"

const SuggestedUsers = () => {
  const { user } = useGlobalContext()
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true)
      try {
        let q = query(
          collection(db, "users"),
          where("uid", "not-in", [user?.uid, ...user?.following]),
          orderBy("uid"),
          limit(5)
        )
        let querySnapshot = await getDocs(q)
        let users = []

        querySnapshot.forEach((docs) => {
          users.push(docs.data())
        })

        setSuggestedUsers(users)

        setIsLoading(false)
      } catch (err) {
        alert(err.message)
        setIsLoading(false)
      }
    }

    if (user?.username) getSuggestedUsers()
  }, [user])

  if (!suggestedUsers.length && isLoading) {
    return (
      <section className="suggested-users">
        <p>Suggested for you</p>
        {Array(5)
          .fill(" ")
          .map((_, i) => {
            return <SuggestedUserSkeleton key={i} />
          })}
      </section>
    )
  }

  return (
    <section className="suggested-users">
      <p>Suggested for you</p>
      {suggestedUsers.length > 0 ? (
        suggestedUsers.map((user) => {
          return <SuggestedUser key={user.uid} user={user} />
        })
      ) : (
        <p>No users to show</p>
      )}
    </section>
  )
}

export default SuggestedUsers
