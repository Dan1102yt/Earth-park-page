export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// public/images/Mariposas: 1-6 mariposas, 7-9 pajaros/colibries, 10 abeja
export const faunaImg = (n: number) => asset(`/images/Mariposas/${n}.png`)
