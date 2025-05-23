async function newAccessToken() {
  const response = await fetch("http://localhost:9000/admin/refresh", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const newAccessToken = await response.json()
  return newAccessToken.accessToken
}

export default newAccessToken
