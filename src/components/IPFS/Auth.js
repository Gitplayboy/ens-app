export function loggedIn() {
  const token = getToken()
  const expire = getExpire()
  return !!token && isTokenExpired(expire)
}

function isTokenExpired(expire) {
  try {
    if (new Date(expire) > new Date()) {
      return true
    } else {
      console.log('WTF')
      return false
    }
  } catch (err) {
    console.log('WTF Error')
    return false
  }
}

export function getToken() {
  return localStorage.getItem('ipfstoken')
}

function getExpire() {
  return localStorage.getItem('ipfsexpire')
}

export function logout() {
  localStorage.removeItem('ipfstoken')
  localStorage.removeItem('ipfsexpire')
}
