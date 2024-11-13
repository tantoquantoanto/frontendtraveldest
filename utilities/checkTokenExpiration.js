export const isTokenExpired = (tokenExp, cb) => {
    const tokenExpirationDate = new Date(tokenExp * 1000)
    const todayDate = new Date()

    const isExpired = tokenExpirationDate <= todayDate

    if (isExpired) {
        cb();
    }

    return isExpired
}

