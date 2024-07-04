import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import PusherClient from 'pusher-js'
import PusherServer from 'pusher'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const extractUUIDFromString = (url: string) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  )
}


//WIP: Uncomment the pusher server
export const pusherServer = {}
//   new PusherServer({
//   appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
//   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET as string,
//   cluster: 'mt1',
//   useTLS: true,
// })

//WIP: Uncomment the pusher client
export const pusherClient = {}
//   new PusherClient(
//   process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   {
//     cluster: 'mt1',
//   }
// )


// export const getMonthName = (month: number): string => {
//   const monthNames = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
  
//   // Adjust for 0-based index, since months in the array are 0-based (Jan is 0, Feb is 1, etc.)
//   return month >= 1 && month <= 12 ? monthNames[month] : '';
// }

export const getMonthName = (month: number) => {
  return month == 0
    ? 'Jan'
    : month == 1
    ? 'Feb'
    : month == 2
    ? 'Mar'
    : month == 3
    ? 'Apr'
    : month == 4
    ? 'May'
    : month == 5
    ? 'Jun'
    : month == 6
    ? 'Jul'
    : month == 7
    ? 'Aug'
    : month == 8
    ? 'Sep'
    : month == 9
    ? 'Oct'
    : month == 10
    ? 'Nov'
    : month == 11 && 'Dec'
}
