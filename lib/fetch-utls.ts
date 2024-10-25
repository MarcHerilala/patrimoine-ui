export const jsonFetcher=(url:string)=>fetch(url).then((res)=>res.json())
export const blobFetcher=(url:string)=>fetch(url).then((res)=>res.blob())